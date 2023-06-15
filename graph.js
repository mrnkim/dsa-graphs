/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let adjacentVertex of vertex.adjacent) {
      adjacentVertex.adjacent.delete(vertex);
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    // result array
    // put start node -> stack (LIFO) (current=start node)
    // if there's something in stack
    // - pop out the last element from stack (current=last element)
    // - if this element is not in seen set
    //   - add this element to seen set
    //   - add this element to the result array
    //   - add node's adjacent nodes to stack
    // - if seen
    //   - X

    let result = [];
    let toVisit = [start];
    let seen = new Set();

    function _depthFirstSearch() {
      if (toVisit.length === 0) {
        return result;
      }

      let current = toVisit.pop(); //progression

      if (!seen.has(current)) {
        seen.add(current);
        result.push(current.value);
        for (let adjacentNode of current.adjacent) {
          if (!seen.has(adjacentNode)) {
            toVisit.push(adjacentNode);
          }
        }
      }
      return _depthFirstSearch();
    }
    return _depthFirstSearch();

    // let result = [start.value];
    // let toVisit = [start];
    // let seen = new Set();

    // while (toVisit.length > 0) {
    //   // console.log("toVisit= ", toVisit);
    //   let current = toVisit.pop();
    //   if (!seen.has(current)) {
    //     seen.add(current);
    //     result.push(current.value);
    //     for (let adjacentNode of current.adjacent) {
    //       toVisit.push(adjacentNode);
    //     }
    //   }
    // }

    // return result;
  }

  //results [S,P,U,Q,X,V,R,Y,W,T,]

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start, results = [start], index = 0) {
    if (this.nodes.size === results.length) {
      return results.map((node) => node.value);
    }

    for (let adjacentNode of start.adjacent) {
      if (!results.includes(adjacentNode)) {
        results.push(adjacentNode);
      }
    }
    return this.breadthFirstSearch(results[index + 1], results, index + 1);
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end, visited = new Set()) {
    // console.log("start: ", start, "end: ", end, "visited: ", visited);
    if (!this.nodes.has(start) || !this.nodes.has(end)) return;
    if (start === end) return 0;

    if (!visited.has(start)) {
      visited.add(start);
      let adjacents = Array.from(start.adjacent); // [I, T, H] -> [1,]
      let paths = adjacents.map((node) =>
        this.distanceOfShortestPath(node, end, new Set([...visited.values()]))
      );
      let shortestPath = 1 + Math.min(...paths);
      return shortestPath;
    }
    return Infinity;
  }
}

module.exports = { Graph, Node };

let graph = new Graph();
let S = new Node("S");
let P = new Node("P");
let U = new Node("U");
let X = new Node("X");
let Q = new Node("Q");
let Y = new Node("Y");
let V = new Node("V");
let R = new Node("R");
let W = new Node("W");
let T = new Node("T");

graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

let result = graph.depthFirstSearch(T);
