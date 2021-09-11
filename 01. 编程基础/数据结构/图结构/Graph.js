class Graph {
  constructor() {
    this.vertexes = []; // 存储顶点
    this.adjList = new Map(); // 存储边
  }

  // 添加顶点
  addVertex(v) {
    this.vertexes.push(v);
    this.adjList.set(v, []);
  }

  // 添加边
  // 因为实现的是无向图, 所以边是可以双向的
  addEdge(v, w) {
    this.adjList.get(v).push(w); // 有向图只添加此项
    this.adjList.get(w).push(v);
  }

  toString() {
    let resultStr = "";
    for (let i = 0; i < this.vertexes.length; i++) {
      resultStr += `${this.vertexes[i]}->`;
      let adj = this.adjList.get(this.vertexes[i]);
      for (let j = 0; j < adj.length; j++) {
        resultStr += `${adj[j]}  `;
      }
      resultStr += "\n";
    }
    return resultStr;
  }

  
}
