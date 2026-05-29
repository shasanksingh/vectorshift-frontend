from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelinePayload(BaseModel):
    nodes: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []


def is_directed_acyclic_graph(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> bool:
    node_ids = {node.get("id") for node in nodes}
    graph = {node_id: [] for node_id in node_ids}
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")

        if source not in node_ids or target not in node_ids:
            return False

        graph[source].append(target)
        indegree[target] += 1

    queue = [node_id for node_id, count in indegree.items() if count == 0]
    visited_count = 0

    while queue:
        node_id = queue.pop()
        visited_count += 1

        for neighbor in graph[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    return {
        'num_nodes': len(payload.nodes),
        'num_edges': len(payload.edges),
        'is_dag': is_directed_acyclic_graph(payload.nodes, payload.edges),
    }
