# Pipeline Builder

This project is a full-stack pipeline builder created for the VectorShift frontend technical assessment. It includes a React Flow based visual editor and a FastAPI backend that parses submitted pipelines.

## What Was Built

- A modern pipeline editor with drag-and-drop nodes.
- A left tools sidebar for adding nodes to the canvas.
- Node types for Input, LLM, Output, Text, Filter, Transform, API Request, Condition, and Note.
- Dynamic text node handles generated from variables like `{{input}}`.
- Smooth animated connections between nodes.
- Click-to-remove behavior for nodes, edges, and handle connections.
- Clear and Submit actions in the top navigation.
- Validation popup when submitting an empty or incomplete pipeline.
- Submission result popup showing node count, edge count, and DAG status.
- Polished UI with a side nav, glass canvas, SVG icons, subtle 3D grid, and responsive layout.

## Backend

The backend is a FastAPI app in `backend/main.py`.

It exposes:

- `GET /` for a basic health response.
- `POST /pipelines/parse` to receive nodes and edges.

The parse endpoint returns:

- `num_nodes`
- `num_edges`
- `is_dag`

The DAG check uses topological sorting to detect directed cycles.

## Frontend

The frontend is a Create React App project in `frontend/`.

Key files:

- `frontend/src/App.js` sets up the main layout.
- `frontend/src/toolbar.js` renders the top bar and side tools nav.
- `frontend/src/ui.js` renders the React Flow canvas.
- `frontend/src/store.js` manages nodes, edges, clear, delete, and connect behavior.
- `frontend/src/submit.js` handles validation, backend submission, and result popups.
- `frontend/src/nodes/` contains reusable node components.
- `frontend/src/index.css` contains the full visual design.

## Running The Project

Start the backend:

```bash
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Start the frontend:

```bash
cd frontend
npm start
```

Then open:

```text
http://localhost:3000
```

## Build Check

The frontend build was verified with:

```bash
npm run build
```
