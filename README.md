# Solar AI Pakistan Backend

FastAPI backend plus the **Person 2 — ChromaDB + Embeddings** RAG ingestion pipeline.

## Person 2 deliverables

- `app/ingest.py` — complete ingestion + retrieval implementation
- `chroma_db/` — persistent ChromaDB location created automatically by the ingest script
- `requirements.txt` — includes `chromadb` and `sentence-transformers`
- Six Markdown files are read automatically from `../Person 1/`

### What `app/ingest.py` does

1. Finds all `.md` files in `Person 1/`.
2. Parses Markdown headings and keeps section titles as metadata.
3. Groups sections into semantic chunks targeting about **550 words**, with a hard maximum of **700 words**.
4. Keeps short source files intact instead of adding artificial text just to reach 400 words.
5. Generates embeddings with `sentence-transformers/all-MiniLM-L6-v2`.
6. Stores vectors and metadata in persistent ChromaDB.
7. Provides `retrieve_relevant_chunks()` for the next RAG/LLM layer.
8. Supports a command-line retrieval test.

Metadata stored for every chunk:

- `filename`
- `section_title`
- `section_titles`
- `chunk_id`
- `chunk_index`
- `word_count`
- `source`

## Setup on Windows

Open PowerShell in the project folder:

```powershell
cd backend

python -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
pip install -r requirements.txt
```

If PowerShell blocks activation, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate the environment again.

## Build the vector database

Run exactly the command from the project task:

```powershell
python -m app.ingest
```

The first run downloads the `all-MiniLM-L6-v2` model, so internet access is required unless the model is already cached.

Expected terminal flow:

```text
[1/4] Reading Markdown files from: .../Person 1
      Created 8 chunks.
[2/4] Loading embedding model: all-MiniLM-L6-v2
[3/4] Generating embeddings...
[4/4] Persisting vectors in: .../chroma_db

Ingestion complete.
  files: 6
  chunks: 8
  stored_vectors: 8
  collection: solar_knowledge
```

The exact chunk count can change if the Markdown files are edited later.

## Test RAG retrieval

After ingestion:

```powershell
python -m app.ingest --query "How much does a 5 kW solar system cost?" --top-k 5
```

Another test:

```powershell
python -m app.ingest --query "Which battery is better for backup, LiFePO4 or lead acid?" --top-k 3
```

> Note: the command above rebuilds the database first because ingestion is the main command. For application code, import `retrieve_relevant_chunks()` directly instead.

## Use the retrieval function in another Python file

```python
from app.ingest import retrieve_relevant_chunks

results = retrieve_relevant_chunks(
    "Which inverter is suitable for a hybrid solar system?",
    top_k=5,
)

for result in results:
    print(result["metadata"]["filename"])
    print(result["metadata"]["section_title"])
    print(result["text"])
```

The returned object contains:

```text
{
    "id": "...",
    "text": "...",
    "metadata": {
        "filename": "...",
        "section_title": "...",
        "section_titles": "...",
        "chunk_id": "...",
        "chunk_index": 1,
        "word_count": 550,
        "source": "Person 1/..."
    },
    "distance": 0.1234
}
```

Lower cosine distance means the retrieved chunk is more similar to the query.

## Start the FastAPI backend

```powershell
uvicorn main:app --reload --port 8000
```

Existing endpoints remain available:

- `GET /health`
- `POST /chat`
- `GET /knowledge`
- `POST /recommend`

## Important hand-off to Person 3 / RAG + LLM

Person 2's job ends at retrieval. The next layer can call:

```python
results = retrieve_relevant_chunks(user_query, top_k=5)
```

Then use the returned `text` values as context for the LLM prompt. The LLM should answer from those retrieved chunks and preserve the metadata/source information for citations.

## Troubleshooting

### `ModuleNotFoundError: chromadb`

Activate the virtual environment and run:

```powershell
pip install -r requirements.txt
```

### `ModuleNotFoundError: sentence_transformers`

Run:

```powershell
pip install sentence-transformers
```

### Model download error

Make sure the computer has internet access on the first run. After the model is cached, it can normally be reused locally.

### Chroma database looks stale

Rebuild it:

```powershell
python -m app.ingest
```

The default run resets and recreates the `solar_knowledge` collection before inserting the current Markdown files.

### `No Markdown files found`

Check that this structure exists:

```text
Solar-Pakistan-Project-main/
├── Person 1/
│   ├── faq.md
│   ├── installation.md
│   ├── pricing.md
│   ├── products.md
│   ├── solar_basics.md
│   └── sources.md
└── backend/
    └── app/
        └── ingest.py
```
