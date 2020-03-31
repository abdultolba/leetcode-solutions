# [399. Evaluate Divison](https://leetcode.com/problems/evaluate-division/)

Equations are given in the format ```A / B = k```, where ```A``` and ```B``` are variables represented as strings, and ```k``` is a real number (floating point number). Given some queries, return the answers. If the answer does not exist, return ```-1.0```.

**Example:**

Given ```a / b = 2.0, b / c = 3.0```
- queries are: ```a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?```
- return ```[6.0, 0.5, -1.0, 1.0, -1.0 ]```

The input is: ```vector<pair<string, string>> equations, vector<double>& values, vector<pair<string, string>> queries``` , where ```equations.size() == values.size()```, and the values are positive. This represents the equations. Return ```vector<double>```.

According to the example above:
```
equations = [ ["a", "b"], ["b", "c"] ],
values = [2.0, 3.0],
queries = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ].
```

The input is always valid. You may assume that evaluating the queries will result in no division by zero and there is no contradiction.

## Solution:

The problem provides us with a set of equations. In order to get the value of a query, we need to form the equation for it by traversing the graph and converting the value as we go along. 
For example, to get the equation ```["a","c"]```, we have to go from ```["a","b"]``` to ```["b","c"]```. 
In other words, we would do something like ```a -> b -> c```. Clearly, this is a graph problem, and more specifically, a [DFS](https://medium.com/basecs/deep-dive-through-a-graph-dfs-traversal-8177df5d0f13) (depth first search) problem.
The reason we utilise the depth first traversal is that we need a path from the start point to the end point.

Given the input ```equations```, ```values```, & ```queries```, I can create an adjacency using a function called ```buildGraph(edges, weight)```, which will build the graph for us.
Once we have the adjacency list, we can iterate over each query, perform a depth first traversal to find the value (-1 if there is no path), and add it to our results array.

Code:

```javascript
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    const result = [ ]
    
    // 1. Build the adjacency list using the buildGraph function
    let adjacencyList = buildGraph(equations, values)
    
    for(let i = 0; i < queries.length; i++){
        const [from, to] = queries[i];
        // 2. Traverse the graph to find a path from the query start to end point
        let value = dfs(adjacencyList, from, to, 1, new Set());
        
        // 3. If the traversal was successful, push the value 
        // returned, otherwise push -1 to indicate failure
        result.push(value ? value : -1.0)
        
        // 4. If a path was found, we can add it to
        // the adjacency list to prevent duplicate work
        if(value){
            adjacencyList.get(from).set(to, value)
            adjacencyList.get(to).set(from, 1 / value)
        }
    }
    
    return result;
};

const dfs = (adjList, from, to, product, visited) => {
    if(!adjList.has(from)) return null;
    
    visited.add(from)
    const neighbors = [...adjList.get(from).keys()]
    
    for(let i = 0; i < neighbors.length; i++){
        const vertex = neighbors[i]
        const currentProduct = product * adjList.get(from).get(vertex)
        
        if(to === vertex) return currentProduct;
        
        if(!visited.has(vertex)){
            const value = dfs(adjList, vertex, to, currentProduct, visited)
            if(value) return value;
        }
    }
    
    return null;
};

const buildGraph = (equations, values) => {
    // Initialize the adjacency list, i.e:
    // {
    //    A: {B: 2.0},
    //    B: {A: 0.5, C: 3.0},
    //    C: {B: 0.333}
    // }
    let list = new Map()
    
    for(let i = 0; i < equations.length; i++){
        const [from, to] = equations[i]
        const val = values[i]
        
        if(!list.has(from)) list.set(from, new Map())
        if(!list.has(to)) list.set(to, new Map())
        
        list.get(from).set(to, val)
        list.get(to).set(from, 1 / val)
    }
    
    return list
};
```
