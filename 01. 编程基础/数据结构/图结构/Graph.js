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

  // 初始化状态颜色
  initializeColor() {
    let colors = [];
    for (let i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = "white";
    }
    return colors;
  }

  // 广度优先搜索
  bfs(initV, handler) {
    // 1.初始化颜色
    let colors = this.initializeColor();

    // 2.创建队列
    let queue = new Queue();

    // 3.将传入的顶点放入队列中
    queue.enqueue(initV);

    // 4.从队列中依次取出和放入数据
    while (!queue.isEmpty()) {
      // 4.1.从队列中取出数据
      let qv = queue.dequeue();

      // 4.2.获取qv相邻的所有顶点
      let vList = this.adjList.get(qv);

      // 4.3.将qv的颜色设置成灰色
      colors[qv] = "gray";

      // 4.4.将qAdj的所有顶点依次压入队列中
      vList.forEach((v) => {
        if (colors[v] === "white") {
          colors[v] = "gray";
          queue.enqueue(v);
        }
      });

      // 4.5.因为qv已经探测完毕, 将qv设置成黑色
      colors[qv] = "black";

      // 4.6.处理qv
      if (handler) {
        handler(qv);
      }
    }
  }

  // 深度优先搜索
  dfs(handler) {
    // 1.初始化颜色
    let colors = this.initializeColor();

    // 2.遍历所有的顶点, 开始访问
    for (let i = 0; i < this.vertexes.length; i++) {
      if (colors[this.vertexes[i]] === "white") {
        this.dfsVisit(this.vertexes[i], colors, handler);
      }
    }
  }

  // dfs的递归调用方法
  dfsVisit(u, colors, handler) {
    // 1.将u的颜色设置为灰色
    colors[u] = "gray";

    // 2.处理u顶点
    if (handler) {
      handler(u);
    }

    // 3.u的所有邻接顶点的访问
    let uAdj = this.adjList.get(u);
    for (let i = 0; i < uAdj.length; i++) {
      let w = uAdj[i];
      if (colors[w] === "white") {
        this.dfsVisit(w, colors, handler);
      }
    }

    // 4.将u设置为黑色
    colors[u] = "black";
  }
}
