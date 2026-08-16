# ChromaDB persistent storage

This folder is intentionally created as the persistent vector-store location.

Run from `backend/`:

```powershell
python -m app.ingest
```

The script will populate this directory with the ChromaDB collection `solar_knowledge`.
Do not manually edit the generated database files.
