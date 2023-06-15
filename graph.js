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

    let result = [start.value];
    let toVisit = [start];
    let seen = new Set();

    while (toVisit.length > 0) {
      console.log("toVisit= ", toVisit);
      let current = toVisit.pop();
      if (!seen.has(current)) {
        seen.add(current);
        result.push(current.value);
        for (let adjacentNode of current.adjacent) {
          toVisit.push(adjacentNode);
        }
      }
    }
    return result;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {}

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {}
}

module.exports = { Graph, Node };
