// A graph is a collection of nodes (vertices) and edges that connect these nodes. Graphs can be directed (edges have a direction) or undirected.


// Undirected Graph:
// {
//   "A": ["B", "C"],
//   "B": ["A", "D"],
//   "C": ["A", "D"],
//   "D": ["B", "C"]
// }

// A -- B
// |    |
// C -- D


// Directed Graph:
// {
//   "A": ["B", "C"],
//   "B": ["D"],
//   "C": ["D"],
//   "D": []
// }

// A -> B
// |    |
// v    v
// C -> D


// Graph Operations:
// 1. addVertex(vertex): Add a new vertex to the graph.
// 2. addEdge(vertex1, vertex2): Add an edge between two vertices.
// 3. removeEdge(vertex1, vertex2): Remove an edge between two vertices.
// 4. removeVertex(vertex): Remove a vertex from the graph.
// 5. hasEdge(vertex1, vertex2): Check if an edge exists between two vertices.
// 6. print(): Print the graph.
// 7. bfs(start): Perform Breadth First Search starting from the given vertex.
// 8. dfs(start): Perform Depth First Search starting from the given vertex.


// Graph Class Implementation in JavaScript using Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Add a new vertex to the graph
  // Time Complexity: O(1)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  // Add an edge between two vertices
  // Time Complexity: O(1)
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  // Remove an edge between two vertices
  // Time Complexity: O(1)
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].delete(vertex2);
    this.adjacencyList[vertex2].delete(vertex1);
  }

  // Remove a vertex from the graph
  // Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return;
    }
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  // Check if an edge exists between two vertices
  // Time Complexity: O(1)
  hasEdge(vertex1, vertex2) {
    return (
      this.adjacencyList[vertex1].has(vertex2) &&
      this.adjacencyList[vertex2].has(vertex1)
    );
  }

  // Print the graph
  // Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
  print() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " -> " + [...this.adjacencyList[vertex]]);
    }
  }

  // Perform Breadth First Search starting from the given vertex
  // Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
  bfs(start) {
    const queue = [start];
    const visited = {};
    visited[start] = true;
    while (queue.length) {
      let vertex = queue.shift();
      console.log(vertex);
      for (let adjacentVertex of this.adjacencyList[vertex]) {
        if (!visited[adjacentVertex]) {
          visited[adjacentVertex] = true;
          queue.push(adjacentVertex);
        }
      }
    }
  }

  // Perform Depth First Search starting from the given vertex
  // Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
  dfs(start) {
    const stack = [start];
    const visited = {};
    visited[start] = true;
    while (stack.length) {
      let vertex = stack.pop();
      console.log(vertex);
      for (let adjacentVertex of this.adjacencyList[vertex]) {
        if (!visited[adjacentVertex]) {
          visited[adjacentVertex] = true;
          stack.push(adjacentVertex);
        }
      }
    }
  }
}

// Example
console.log("Graph");
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "C");
graph.print(); // A -> B, C; B -> A, C; C -> A, B
graph.bfs("A"); // A, B, C
graph.dfs("A"); // A, C, B
graph.removeEdge("A", "B");
graph.print(); // A -> C; B -> C; C -> A, B
graph.removeVertex("A");
graph.print(); // B -> C; C -> B


module.exports = Graph;
