# Solar AI Pakistan

A clean frontend for a Pakistan-focused solar energy knowledge and guidance platform.

## What is included

- React 19 + TanStack Start frontend.
- Pages for home, about, products, calculator, installation, knowledge, contact, privacy, and terms.
- Static solar data in `src/data/solar.ts`.
- A Solar AI chat widget backed by the platform knowledge data.
- A solar calculator using client-side estimation formulas.

## What is not included yet

- FastAPI backend.
- ChromaDB vector store.
- RAG pipeline.
- LLM/Ollama/OpenAI integration.
- Persistent database.
- Persistent form submission handling.

Those pieces will be added next as a separate backend layer.

## Project structure

```text
src/
  assets/          Images used by the website
  components/site/ Website-specific components
  components/ui/   Small reusable UI primitives used by the app
  data/            Static solar knowledge, products, pricing, and FAQ data
  lib/             Shared helpers
  routes/          TanStack route pages
```

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Next milestone

Create a `backend/` service with FastAPI, ChromaDB, document ingestion, embeddings, and a `/chat` API. The current `SolarChat` component can then call that API instead of using knowledge API.
