"""
Solar AI Pakistan - ChromaDB ingestion + retrieval pipeline.

Responsibilities
----------------
1. Read all Markdown knowledge-base files from Person 1/.
2. Split Markdown into heading-aware chunks (target ~550 words, max 700).
3. Generate embeddings with sentence-transformers/all-MiniLM-L6-v2.
4. Store embeddings + metadata in a persistent ChromaDB collection.
5. Expose retrieve_relevant_chunks() for the RAG layer.
6. Run as a module:

    python -m app.ingest

Optional examples:

    python -m app.ingest --reset
    python -m app.ingest --query "How much does a 5 kW system cost?"
    python -m app.ingest --query "Which inverter is suitable for a hybrid system?" --top-k 5

The script is intentionally self-contained so Person 2 can hand one file
to the next team member without requiring another ingestion module.
"""

from __future__ import annotations

import argparse
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

import chromadb
from sentence_transformers import SentenceTransformer


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DATA_DIR = PROJECT_ROOT / "Person 1"
DEFAULT_DB_DIR = PROJECT_ROOT / "chroma_db"
DEFAULT_COLLECTION = "solar_knowledge"
DEFAULT_MODEL = "all-MiniLM-L6-v2"

TARGET_WORDS = 550
MAX_WORDS = 700
MIN_WORDS = 300
OVERLAP_WORDS = 60

HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)
WORD_RE = re.compile(r"\b[\w’'-]+\b", re.UNICODE)


@dataclass
class Chunk:
    """A searchable knowledge-base chunk."""

    id: str
    text: str
    filename: str
    section_title: str
    section_titles: str
    chunk_index: int
    word_count: int


# ---------------------------------------------------------------------------
# Text helpers
# ---------------------------------------------------------------------------

def word_count(text: str) -> int:
    return len(WORD_RE.findall(text))


def _split_sentences(text: str) -> list[str]:
    """Split text without destroying Markdown tables/code-like lines."""
    # Keep Markdown table rows and short lines intact. For normal prose,
    # sentence boundaries are enough for the chunker.
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9#*`])", text.strip())
    return [p.strip() for p in parts if p.strip()]


def _split_long_section(text: str, max_words: int = MAX_WORDS) -> list[str]:
    """Split an oversized section by paragraphs/sentences/words."""
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    pieces: list[str] = []
    current: list[str] = []
    current_words = 0

    def flush() -> None:
        nonlocal current, current_words
        if current:
            pieces.append("\n\n".join(current).strip())
            current = []
            current_words = 0

    for paragraph in paragraphs:
        p_words = word_count(paragraph)
        if p_words <= max_words:
            if current and current_words + p_words > max_words:
                flush()
            current.append(paragraph)
            current_words += p_words
            continue

        # A single huge paragraph: fall back to sentence packing.
        for sentence in _split_sentences(paragraph):
            s_words = word_count(sentence)
            if s_words > max_words:
                # Last resort for an unusually long line.
                raw_words = sentence.split()
                for start in range(0, len(raw_words), max_words):
                    block = " ".join(raw_words[start:start + max_words])
                    if current and current_words + word_count(block) > max_words:
                        flush()
                    current.append(block)
                    current_words += word_count(block)
                    if current_words >= max_words:
                        flush()
            else:
                if current and current_words + s_words > max_words:
                    flush()
                current.append(sentence)
                current_words += s_words
                if current_words >= max_words:
                    flush()

    flush()
    return pieces


def parse_markdown_sections(text: str) -> list[tuple[str, str]]:
    """
    Return (section_title, section_text) pairs.

    A top-level document title is treated as a normal section so it remains
    searchable. Heading text is retained inside the chunk for semantic context.
    """
    matches = list(HEADING_RE.finditer(text))
    if not matches:
        return [("Document", text.strip())]

    sections: list[tuple[str, str]] = []

    if matches[0].start() > 0:
        preamble = text[:matches[0].start()].strip()
        if preamble:
            sections.append(("Document", preamble))

    for i, match in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        section = text[match.start():end].strip()
        title = match.group(2).strip()
        sections.append((title, section))

    return sections


def _pack_sections(
    sections: Iterable[tuple[str, str]],
    target_words: int = TARGET_WORDS,
    max_words: int = MAX_WORDS,
) -> list[tuple[list[str], str]]:
    """
    Pack adjacent sections into chunks.

    Returns:
        [(section_titles, chunk_text), ...]
    """
    normalized: list[tuple[str, str]] = []

    for title, section in sections:
        if not section.strip():
            continue

        pieces = _split_long_section(section, max_words=max_words)
        if len(pieces) == 1:
            normalized.append((title, pieces[0]))
        else:
            for n, piece in enumerate(pieces, start=1):
                normalized.append((f"{title} (part {n})", piece))

    chunks: list[tuple[list[str], str]] = []
    current_titles: list[str] = []
    current_text: list[str] = []
    current_words = 0

    for title, text in normalized:
        size = word_count(text)

        if current_text and current_words + size > max_words:
            chunks.append((current_titles, "\n\n".join(current_text).strip()))
            current_titles = []
            current_text = []
            current_words = 0

        current_titles.append(title)
        current_text.append(text)
        current_words += size

        if current_words >= target_words:
            chunks.append((current_titles, "\n\n".join(current_text).strip()))
            current_titles = []
            current_text = []
            current_words = 0

    if current_text:
        chunks.append((current_titles, "\n\n".join(current_text).strip()))

    return chunks


# ---------------------------------------------------------------------------
# Loading + chunk creation
# ---------------------------------------------------------------------------

def load_markdown_files(data_dir: Path) -> list[tuple[str, str]]:
    """Load every .md file in the knowledge-base directory."""
    if not data_dir.exists():
        raise FileNotFoundError(f"Knowledge-base directory not found: {data_dir}")

    files = sorted(data_dir.glob("*.md"))
    if not files:
        raise FileNotFoundError(f"No Markdown files found in: {data_dir}")

    return [(path.name, path.read_text(encoding="utf-8-sig")) for path in files]


def build_chunks(data_dir: Path) -> list[Chunk]:
    """Create deterministic, heading-aware chunks for all Markdown files."""
    chunks: list[Chunk] = []

    for filename, text in load_markdown_files(data_dir):
        sections = parse_markdown_sections(text)
        packed = _pack_sections(sections)

        for local_index, (titles, chunk_text) in enumerate(packed, start=1):
            # A deterministic ID makes re-ingestion safe and easy to debug.
            stem = Path(filename).stem
            chunk_id = f"{stem}_{local_index:03d}"

            chunks.append(
                Chunk(
                    id=chunk_id,
                    text=chunk_text,
                    filename=filename,
                    section_title=titles[0] if titles else "Document",
                    section_titles=" | ".join(titles),
                    chunk_index=local_index,
                    word_count=word_count(chunk_text),
                )
            )

    return chunks


# ---------------------------------------------------------------------------
# ChromaDB + embeddings
# ---------------------------------------------------------------------------

def get_chroma_collection(
    db_dir: Path = DEFAULT_DB_DIR,
    collection_name: str = DEFAULT_COLLECTION,
):
    """Open/create the persistent ChromaDB collection."""
    db_dir.mkdir(parents=True, exist_ok=True)

    client = chromadb.PersistentClient(path=str(db_dir))
    collection = client.get_or_create_collection(
        name=collection_name,
        metadata={
            "description": "Solar AI Pakistan Markdown knowledge base",
            "hnsw:space": "cosine",
        },
    )
    return client, collection


def _reset_collection(client: Any, collection_name: str):
    """Delete and recreate the target collection."""
    try:
        client.delete_collection(name=collection_name)
    except Exception:
        # Collection may not exist on first run.
        pass

    return client.create_collection(
        name=collection_name,
        metadata={
            "description": "Solar AI Pakistan Markdown knowledge base",
            "hnsw:space": "cosine",
        },
    )


def ingest_documents(
    data_dir: Path = DEFAULT_DATA_DIR,
    db_dir: Path = DEFAULT_DB_DIR,
    collection_name: str = DEFAULT_COLLECTION,
    model_name: str = DEFAULT_MODEL,
    reset: bool = True,
) -> dict[str, Any]:
    """
    Build embeddings and persist them in ChromaDB.

    Returns a small ingestion report useful for terminal output/tests.
    """
    data_dir = Path(data_dir)
    db_dir = Path(db_dir)

    print(f"[1/4] Reading Markdown files from: {data_dir}")
    chunks = build_chunks(data_dir)
    if not chunks:
        raise RuntimeError("No chunks were created from the Markdown files.")

    print(f"      Created {len(chunks)} chunks.")
    print(
        "      Word counts: "
        f"min={min(c.word_count for c in chunks)}, "
        f"max={max(c.word_count for c in chunks)}, "
        f"avg={sum(c.word_count for c in chunks) / len(chunks):.1f}"
    )

    print(f"[2/4] Loading embedding model: {model_name}")
    model = SentenceTransformer(model_name)

    print("[3/4] Generating embeddings...")
    texts = [chunk.text for chunk in chunks]
    embeddings = model.encode(
        texts,
        batch_size=32,
        show_progress_bar=True,
        normalize_embeddings=True,
    )

    print(f"[4/4] Persisting vectors in: {db_dir}")
    client, collection = get_chroma_collection(db_dir, collection_name)

    if reset:
        collection = _reset_collection(client, collection_name)

    collection.add(
        ids=[chunk.id for chunk in chunks],
        documents=texts,
        embeddings=embeddings.tolist(),
        metadatas=[
            {
                "filename": chunk.filename,
                "section_title": chunk.section_title,
                "section_titles": chunk.section_titles,
                "chunk_id": chunk.id,
                "chunk_index": chunk.chunk_index,
                "word_count": chunk.word_count,
                "source": f"Person 1/{chunk.filename}",
            }
            for chunk in chunks
        ],
    )

    # PersistentClient writes the database to db_dir. A quick count confirms
    # that the collection contains the expected vectors.
    count = collection.count()

    report = {
        "files": len(load_markdown_files(data_dir)),
        "chunks": len(chunks),
        "stored_vectors": count,
        "collection": collection_name,
        "database": str(db_dir),
        "embedding_model": model_name,
    }

    print("\nIngestion complete.")
    for key, value in report.items():
        print(f"  {key}: {value}")

    return report


def retrieve_relevant_chunks(
    query: str,
    top_k: int = 5,
    db_dir: Path = DEFAULT_DB_DIR,
    collection_name: str = DEFAULT_COLLECTION,
    model_name: str = DEFAULT_MODEL,
) -> list[dict[str, Any]]:
    """
    Retrieve the most relevant chunks for a user query.

    This is the RAG retrieval function the next teammate can import:

        from app.ingest import retrieve_relevant_chunks

        results = retrieve_relevant_chunks("Which battery is best?", top_k=5)

    Each result contains:
        id, text, metadata, distance
    """
    query = query.strip()
    if not query:
        raise ValueError("Query must not be empty.")

    db_dir = Path(db_dir)
    if not db_dir.exists():
        raise FileNotFoundError(
            f"ChromaDB directory does not exist: {db_dir}. "
            "Run `python -m app.ingest` first."
        )

    _, collection = get_chroma_collection(db_dir, collection_name)

    if collection.count() == 0:
        raise RuntimeError(
            "ChromaDB collection is empty. Run `python -m app.ingest` first."
        )

    model = SentenceTransformer(model_name)
    query_embedding = model.encode(
        [query],
        normalize_embeddings=True,
    )[0]

    result = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )

    ids = result.get("ids", [[]])[0]
    documents = result.get("documents", [[]])[0]
    metadatas = result.get("metadatas", [[]])[0]
    distances = result.get("distances", [[]])[0]

    return [
        {
            "id": ids[i],
            "text": documents[i],
            "metadata": metadatas[i],
            "distance": distances[i],
        }
        for i in range(len(ids))
    ]


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Ingest Solar AI Pakistan Markdown files into ChromaDB."
    )
    parser.add_argument(
        "--data-dir",
        type=Path,
        default=DEFAULT_DATA_DIR,
        help="Directory containing the six Markdown knowledge files.",
    )
    parser.add_argument(
        "--db-dir",
        type=Path,
        default=DEFAULT_DB_DIR,
        help="Persistent ChromaDB directory.",
    )
    parser.add_argument(
        "--collection",
        default=DEFAULT_COLLECTION,
        help="ChromaDB collection name.",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        help="Sentence-transformers model name.",
    )
    parser.add_argument(
        "--no-reset",
        action="store_true",
        help="Do not recreate the collection before ingestion.",
    )
    parser.add_argument(
        "--query",
        default="",
        help="After ingestion, retrieve relevant chunks for this query.",
    )
    parser.add_argument(
        "--top-k",
        type=int,
        default=5,
        help="Number of chunks to retrieve for --query.",
    )
    return parser


def main() -> None:
    args = _build_parser().parse_args()

    ingest_documents(
        data_dir=args.data_dir,
        db_dir=args.db_dir,
        collection_name=args.collection,
        model_name=args.model,
        reset=not args.no_reset,
    )

    if args.query.strip():
        print("\nRetrieval test")
        print("=" * 72)
        results = retrieve_relevant_chunks(
            query=args.query,
            top_k=args.top_k,
            db_dir=args.db_dir,
            collection_name=args.collection,
            model_name=args.model,
        )

        for rank, item in enumerate(results, start=1):
            meta = item["metadata"]
            print(
                f"\n#{rank} | distance={item['distance']:.4f} | "
                f"{meta['filename']} | {meta['section_title']} | {meta['chunk_id']}"
            )
            print(item["text"][:900])
            if len(item["text"]) > 900:
                print("...")

if __name__ == "__main__":
    main()
