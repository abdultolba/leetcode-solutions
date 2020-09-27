class UnweightedGraph {
  constructor() {
    /* An adjacency list is a list (or Map) of lists.
     * Each list corresponds to a vertex u and contains
     * a list of edges (u, v) that originate from u.
     * Thus, an adjacency list takes up Θ(V + E) space. */
    this.adjacencyList = new Map();
  }

  /**
   * Adds a new vertex to the graph and initializes
   * it with an empty set. Returns if the vertex already exists
   * @param {*} u The vertex to insert into the graph
   * @returns The instance of the current graph.
   */
  addVertex(u) {
    if (this.adjacencyList.has(u)) return;
    this.adjacencyList.set(u, new Set());

    return this;
  }

  /**
   * Creates an undirected connection or edge between two nodes.
   * If either node doesn't exist, it is created.
   * @param {*} u The first vertex that connects to v
   * @param {*} v The second vertex that connects to u
   * @returns The instance of the current graph.
   */
  addEdge(u, v) {
    if (!this.adjacencyList.has(u)) this.addVertex(u);
    if (!this.adjacencyList.has(v)) this.addVertex(v);

    this.adjacencyList.get(u).add(v);
    // Comment out the line below to make the graph directed,
    // in which case it would add the *directed* edge u -> v
    this.adjacencyList.get(v).add(u);

    return this;
  }

  /**
   * Removes an undirected connection or edge between two nodes.
   * @param {*} u The first vertex that connects to v
   * @param {*} v The second vertex that connects to u
   * @returns The instance of the current graph.
   */
  removeEdge(u, v) {
    if (!this.adjacencyList.has(u) || !this.adjacencyList.has(v)) return this;
    this.adjacencyList.get(u).delete(v);
    // Comment out the line below if the graph is directed,
    // in which case it would delete the *directed* edge u -> v
    this.adjacencyList.get(v).delete(u);

    return this;
  }

  removeVertex(u) {
    if (!this.adjacencyList.has(u)) return this;

    const neighbors = this.getNeighbors(u);

    neighbors.forEach((neighbor) => this.removeEdge(u, neighbor));
    this.adjacencyList.delete(u);

    return this;
  }

  /**
   * Retrieves the neighbors (a Set) of a given node in the graph.
   * @param {*} u The vertex who's neighbors are being retrieved
   * @returns The neighbors of a provided node. Empty set if the vertex doesn't exist.
   */
  getNeighbors(u) {
    if (this.adjacencyList.has(u)) {
      return [...this.adjacencyList.get(u)];
    }

    return [];
  }

  dfs(u) {
    // If the vertex doesn't exist, then return an empty array.
    if (!this.adjacencyList.has(u)) return [];

    // 1. Create stack and push the starting vertex to it.
    // 2. Create a hash set for us to mark to the vertices visited
    let stack = [u],
      visited = new Set(),
      vertex;

    // 3. Loop over the stack while it contains 1 or more elements
    //    Once we have visited all nodes, the stack will be empty.
    while (stack.length > 0) {
      // 4. Pop a vertex off the stack
      vertex = stack.pop();

      // 5. If it hasn't yet been visited...
      if (!visited.has(vertex)) {
        // 6. Mark it as visited in the hash set
        visited.add(vertex);
        // 7. Iterate over the vertice's neighbors
        //    and push them onto the stack
        let neighbors = this.getNeighbors(vertex);
        for (let i = neighbors.length - 1; i >= 0; i--) {
          stack.push(neighbors[i]);
        }
      }
    }

    // Return the keys of the visited hash set
    // (should be in the order they were visited)
    return [...visited];
  }

  dfsRecursive(u) {}

  bfs(vertex) {}

  printGraph() {
    console.log(this.adjacencyList);
  }
}

let graph = new UnweightedGraph();

graph.addEdge("San Francisco", "Detroit");
graph.addEdge("San Francisco", "Los Angeles");
graph.addEdge("Detroit", "New York");
graph.addEdge("San Francisco", "New York");
graph.addEdge("Detroit", "Cleveland");
graph.addEdge("Cleveland", "Portland");

// graph.removeVertex('Detroit')
// graph.removeEdge("San Francisco", "Los Angeles")

graph.printGraph();

console.log(graph.dfs('Detroit'));

module.exports = {
  UnweightedGraph,
};
