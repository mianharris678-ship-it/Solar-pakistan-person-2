# Person 2 — ChromaDB + Embeddings: Completed

This project contains the complete Person 2 ingestion/retrieval implementation.

python -m venv .venvpython -c "from app.ingest import retrieve_relevant_chunks; print(retrieve_relevant_chunks('Which solar panel brand is best?'))"## Included
- `backend/app/ingest.py`
- Updated `backend/requirements.txt`
- Updated `backend/README.md`
- `chroma_db/` persistent database location
- All six source Markdown files under `Person 1/`

## One command
From the `backend` directory:

```powershell
python -m app.ingest
```

This reads all six Markdown files, creates heading-aware chunks, generates
`all-MiniLM-L6-v2` embeddings, and persists them into `chroma_db/`.

## Retrieval
The same `ingest.py` exposes:

```python
from app.ingest import retrieve_relevant_chunks
```

Use that function in the next RAG/LLM stage to retrieve the top relevant
chunks and their metadata.
