class UnweightedGraph {
  constructor() {
    /* An adjacency list is a list (or Map) of lists.
     * Each list corresponds to a vertex u and contains
     * a list of edges (u, v) that originate from u.
     * Thus, an adjacency list takes up Θ(V + E) space. */
    this.adjacencyList = new Map();
  }

  /**
   * Determines whether or not a vertex exists in the adjacency list.
   * Time Complexity: O(1) since JavaScript's implementation of Map.prototype.has() is constant.
   * @param {*} u The vertex being checked in the graph G
   * @returns {boolean} True if the graph contains the vertex u, false otherwise.
   */
  contains(u) {
    return this.adjacencyList.has(u);
  }

  /**
   * Adds a new vertex to the graph and initializes
   * it with an empty set. Returns if the vertex already exists
   * @param {*} u The vertex to insert into the graph
   * @returns {UnweightedGraph} The instance of the current graph.
   */
  addVertex(u) {
    if (this.contains(u)) return;
    this.adjacencyList.set(u, new Set());

    return this;
  }

  /**
   * Creates an undirected connection or edge between two nodes.
   * If either node doesn't exist, it is created.
   * @param {*} u The first vertex that connects to v
   * @param {*} v The second vertex that connects to u
   * @returns {UnweightedGraph} The instance of the current graph.
   */
  addEdge(u, v) {
    if (!this.contains(u)) this.addVertex(u);
    if (!this.contains(v)) this.addVertex(v);

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
   * @returns {UnweightedGraph} The instance of the current graph.
   */
  removeEdge(u, v) {
    if (!this.contains(u) || !this.contains(v)) return this;
    this.adjacencyList.get(u).delete(v);
    // Comment out the line below if the graph is directed,
    // in which case it would delete the *directed* edge u -> v
    this.adjacencyList.get(v).delete(u);

    return this;
  }

  /**
   * Removes a vertex and all associated edges from the graph.
   * @param {*} u The vertex to be deleted
   * @returns {UnweightedGraph} The instance of the current graph.
   */
  removeVertex(u) {
    if (!this.contains(u)) return this;

    const neighbors = this.getNeighbors(u);

    neighbors.forEach((neighbor) => this.removeEdge(u, neighbor));
    this.adjacencyList.delete(u);

    return this;
  }

  /**
   * Retrieves the neighbors (a Set) of a given node in the graph.
   * @param {*} u The vertex who's neighbors are being retrieved
   * @returns {Array} The neighbors of a provided node. Empty set if the vertex doesn't exist.
   */
  getNeighbors(u) {
    if (this.contains(u)) {
      return [...this.adjacencyList.get(u)];
    }

    return [];
  }

  /**
   * Performs an *iterative* depth first traversal and returns a
   * list of vertices in the order they were visited.
   * @param {*} u The vertex to start the traversal at
   * @returns {Array} The list of nodes in the order of visitation
   */
  dfsIterative(u) {
    // If the vertex doesn't exist, then return an empty array.
    if (!this.contains(u)) return [];

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

  /**
   * Performs an *recursive* depth first traversal and returns a
   * list of vertices in the order they were visited.
   * @param {*} u The vertex to start the traversal at
   * @returns {Array} The list of nodes in the order of visitation
   */
  dfsRecursive(u) {
    // If the vertex doesn't exist, then return an empty array.
    if (!this.contains(u)) return [];

    let visited = new Set();

    const dfs = (vertex) => {
      visited.add(vertex);
      let neighbors = this.getNeighbors(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) dfs(neighbor);
      }
    };

    dfs(u);

    return [...visited];
  }

  /**
   * Performs a breadth first traversal and returns a
   * list of vertices in the order they were visited.
   * @param {*} u The vertex to start the traversal at
   * @returns {Array} The list of nodes in the order of visitation
   */
  bfs(u) {
    if (!this.contains(u)) return [];

    let queue = [u],
      visited = new Set(),
      vertex;

    while (queue.length > 0) {
      vertex = queue.shift();

      if (!visited.has(vertex)) {
        visited.add(vertex);

        let neighbors = this.getNeighbors(vertex);
        for (let neighbor of neighbors) {
          queue.push(neighbor);
        }
      }
    }

    return [...visited];
  }

  printGraph() {
    console.log(this.adjacencyList);
  }
}

module.exports = UnweightedGraph;
