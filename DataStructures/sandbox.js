const UnweightedGraph = require('./UnweightedGraph');

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

console.log(graph.dfsIterative("Detroit"));
console.log(graph.dfsRecursive("Detroit"));
console.log(graph.bfs("Detroit"));