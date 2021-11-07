[前端该如何准备数据结构和算法？](https://juejin.cn/post/6844903919722692621)

## 算法

算法是如何解决一类问题的明确规范。算法是一组精确定义操作序列的规则。

算法（Algorithm）是指解题方案的准确而完整的描述，是一系列解决问题的清晰指令，算法代表着用系统的方法描述解决问题的策略机制。也就是说，能够对一定规范的输入，在有限时间内获得所要求的输出。

如果一个算法有缺陷，或不适合于某个问题，执行这个算法将不会解决这个问题。不同的算法可能用不同的时间、空间或效率来完成同样的任务。一个算法的优劣可以用空间复杂度与时间复杂度来衡量。

### 算法设计的要求

1. 正确性 ———— 算法应当满足具体问题的需求,能够通过特定的问题测试

2. 可读性 ———— 算法主要是为了人的阅读与交流，其次才是机器的执行

3. 健壮性 ———— 当输入非法的数据时，算法也能够适当做出反应或进行处理，而不会产生莫名奇妙的输出结果

4. 效率与低存储量需求

- 效率 ———— 算法运行的时间，执行时间短效率高

- 低存储量需求 ———— 算法执行过程中所需的最大存储空间

二者都与问题的规模相关，同时也要根据实际需求决择，要效率，还是要节省空间，或者折中。一般情况二者不可得兼，要么用空间换时间，要么用时间换空间。

### 算法主题

- **数学**
  - `B` [Bit 操控](src/algorithms/math/bits) - set/get/update/clear 位、乘以/除以二进制位 、变负等
  - `B` [阶乘](src/algorithms/math/factorial/README.zh-CN.md)
  - `B` [斐波那契数](src/algorithms/math/fibonacci) - `经典` 和 `闭式` 版本
  - `B` [素数检测](src/algorithms/math/primality-test) (排除法)
  - `B` [欧几里得算法](src/algorithms/math/euclidean-algorithm) - 计算最大公约数 (GCD)
  - `B` [最小公倍数](src/algorithms/math/least-common-multiple) (LCM)
  - `B` [素数筛](src/algorithms/math/sieve-of-eratosthenes) - 查找任意给定范围内的所有素数
  - `B` [判断 2 次方数](src/algorithms/math/is-power-of-two) - 检查数字是否为 2 的幂 (原生和按位算法)
  - `B` [杨辉三角形](src/algorithms/math/pascal-triangle)
  - `B` [复数](src/algorithms/math/complex-number) - 复数及其基本运算
  - `B` [弧度和角](src/algorithms/math/radian) - 弧度与角的相互转换
  - `B` [快速算次方](src/algorithms/math/fast-powering)
  - `A` [整数拆分](src/algorithms/math/integer-partition)
  - `A` [割圆术](src/algorithms/math/liu-hui) - 基于 N-gons 的近似 π 计算
  - `A` [离散傅里叶变换](src/algorithms/math/fourier-transform) - 把时间信号解析成构成它的频率
- **集合**
  - `B` [笛卡尔积](src/algorithms/sets/cartesian-product) - 多集合结果
  - `A` [洗牌算法](src/algorithms/sets/fisher-yates) - 随机置换有限序列
  - `A` [幂集](src/algorithms/sets/power-set) - 该集合的所有子集
  - `A` [排列](src/algorithms/sets/permutations) (有/无重复)
  - `A` [组合](src/algorithms/sets/combinations) (有/无重复)
  - `A` [最长公共子序列](src/algorithms/sets/longest-common-subsequence) (LCS)
  - `A` [最长递增子序列](src/algorithms/sets/longest-increasing-subsequence)
  - `A` [最短公共父序列](src/algorithms/sets/shortest-common-supersequence) (SCS)
  - `A` [背包问题](src/algorithms/sets/knapsack-problem) - `0/1` 和 `无边界` 问题
  - `A` [最大子数列问题](src/algorithms/sets/maximum-subarray) - `BF 算法` 和 `动态规划`
  - `A` [组合求和](src/algorithms/sets/combination-sum) - 查找形成特定总和的所有组合
- **字符串**
  - `B` [汉明距离](src/algorithms/string/hamming-distance) - 符号不同的位置数
  - `A` [莱温斯坦距离](src/algorithms/string/levenshtein-distance) - 两个序列之间的最小编辑距离
  - `A` [Knuth–Morris–Pratt 算法](src/algorithms/string/knuth-morris-pratt) KMP 算法 - 子串搜索 (模式匹配)
  - `A` [字符串快速查找](src/algorithms/string/rabin-karp) - 子串搜索 (模式匹配)
  - `A` [Rabin Karp 算法](src/algorithms/string/rabin-karp) - 子串搜索
  - `A` [最长公共子串](src/algorithms/string/longest-common-substring)
  - `A` [正则表达式匹配](src/algorithms/string/regular-expression-matching)
- **搜索**
  - `B` [线性搜索](src/algorithms/search/linear-search)
  - `B` [跳转搜索/块搜索](src/algorithms/search/jump-search) - 搜索有序数组
  - `B` [二分查找](src/algorithms/search/binary-search) - 搜索有序数组
  - `B` [插值搜索](src/algorithms/search/interpolation-search) - 搜索均匀分布的有序数组
- **排序**
  - `B` [冒泡排序](src/algorithms/sorting/bubble-sort)
  - `B` [选择排序](src/algorithms/sorting/selection-sort)
  - `B` [插入排序](src/algorithms/sorting/insertion-sort)
  - `B` [堆排序](src/algorithms/sorting/heap-sort)
  - `B` [归并排序](src/algorithms/sorting/merge-sort)
  - `B` [快速排序](src/algorithms/sorting/quick-sort) - in-place (原地) 和 non-in-place 版本
  - `B` [希尔排序](src/algorithms/sorting/shell-sort)
  - `B` [计数排序](src/algorithms/sorting/counting-sort)
  - `B` [基数排序](src/algorithms/sorting/radix-sort)
- **链表**
  - `B` [正向遍历](src/algorithms/linked-list/traversal)
  - `B` [反向遍历](src/algorithms/linked-list/reverse-traversal)
- **树**
  - `B` [深度优先搜索](src/algorithms/tree/depth-first-search) (DFS)
  - `B` [广度优先搜索](src/algorithms/tree/breadth-first-search) (BFS)
- **图**
  - `B` [深度优先搜索](src/algorithms/graph/depth-first-search) (DFS)
  - `B` [广度优先搜索](src/algorithms/graph/breadth-first-search) (BFS)
  - `B` [克鲁斯克尔演算法](src/algorithms/graph/kruskal) - 寻找加权无向图的最小生成树 (MST)
  - `A` [戴克斯特拉算法](src/algorithms/graph/dijkstra) - 找到图中所有顶点的最短路径
  - `A` [贝尔曼-福特算法](src/algorithms/graph/bellman-ford) - 找到图中所有顶点的最短路径
  - `A` [弗洛伊德算法](src/algorithms/graph/floyd-warshall) - 找到所有顶点对 之间的最短路径
  - `A` [判圈算法](src/algorithms/graph/detect-cycle) - 对于有向图和无向图 (基于 DFS 和不相交集的版本)
  - `A` [普林演算法](src/algorithms/graph/prim) - 寻找加权无向图的最小生成树 (MST)
  - `A` [拓扑排序](src/algorithms/graph/topological-sorting) - DFS 方法
  - `A` [关节点](src/algorithms/graph/articulation-points) - Tarjan 算法 (基于 DFS)
  - `A` [桥](src/algorithms/graph/bridges) - 基于 DFS 的算法
  - `A` [欧拉回径与一笔画问题](src/algorithms/graph/eulerian-path) - Fleury 的算法 - 一次访问每个边
  - `A` [哈密顿图](src/algorithms/graph/hamiltonian-cycle) - 恰好访问每个顶点一次
  - `A` [强连通分量](src/algorithms/graph/strongly-connected-components) - Kosaraju 算法
  - `A` [旅行推销员问题](src/algorithms/graph/travelling-salesman) - 尽可能以最短的路线访问每个城市并返回原始城市
- **加密**
  - `B` [多项式 hash](src/algorithms/cryptography/polynomial-hash) - 基于多项式的 rolling hash 函数
- **未分类**
  - `B` [汉诺塔](src/algorithms/uncategorized/hanoi-tower)
  - `B` [旋转矩阵](src/algorithms/uncategorized/square-matrix-rotation) - 原地算法
  - `B` [跳跃游戏](src/algorithms/uncategorized/jump-game) - 回溯,、动态编程 (自上而下+自下而上) 和贪婪的例子
  - `B` [独特(唯一) 路径](src/algorithms/uncategorized/unique-paths) - 回溯、动态编程和基于 Pascal 三角形的例子
  - `B` [雨水收集](src/algorithms/uncategorized/rain-terraces) - 诱捕雨水问题 (动态编程和暴力版本)
  - `B` [递归楼梯](src/algorithms/uncategorized/recursive-staircase) - 计算有共有多少种方法可以到达顶层 (4 种解题方案)
  - `A` [八皇后问题](src/algorithms/uncategorized/n-queens)
  - `A` [骑士巡逻](src/algorithms/uncategorized/knight-tour)

### 算法范式

算法范式是一种通用方法，基于一类算法的设计。这是比算法更高的抽象，就像算法是比计算机程序更高的抽象。

- **BF 算法** - `查找/搜索` 所有可能性并选择最佳解决方案
  - `B` [线性搜索](src/algorithms/search/linear-search)
  - `B` [雨水收集](src/algorithms/uncategorized/rain-terraces) - 诱导雨水问题
  - `B` [递归楼梯](src/algorithms/uncategorized/recursive-staircase) - 计算有共有多少种方法可以到达顶层 (4 种解题方案)
  - `A` [最大子数列](src/algorithms/sets/maximum-subarray)
  - `A` [旅行推销员问题](src/algorithms/graph/travelling-salesman) - 尽可能以最短的路线访问每个城市并返回原始城市
  - `A` [离散傅里叶变换](src/algorithms/math/fourier-transform) - 把时间信号解析成构成它的频率
- **贪心法** - 在当前选择最佳选项，不考虑以后情况
  - `B` [跳跃游戏](src/algorithms/uncategorized/jump-game)
  - `A` [背包问题](src/algorithms/sets/knapsack-problem)
  - `A` [戴克斯特拉算法](src/algorithms/graph/dijkstra) - 找到所有图顶点的最短路径
  - `A` [普里姆算法](src/algorithms/graph/prim) - 寻找加权无向图的最小生成树 (MST)
  - `A` [克鲁斯卡尔算法](src/algorithms/graph/kruskal) - 寻找加权无向图的最小生成树 (MST)
- **分治法** - 将问题分成较小的部分，然后解决这些部分
  - `B` [二分查找](src/algorithms/search/binary-search)
  - `B` [汉诺塔](src/algorithms/uncategorized/hanoi-tower)
  - `B` [杨辉三角形](src/algorithms/math/pascal-triangle)
  - `B` [欧几里得算法](src/algorithms/math/euclidean-algorithm) - 计算最大公约数 (GCD)
  - `B` [归并排序](src/algorithms/sorting/merge-sort)
  - `B` [快速排序](src/algorithms/sorting/quick-sort)
  - `B` [树深度优先搜索](src/algorithms/tree/depth-first-search) (DFS)
  - `B` [图深度优先搜索](src/algorithms/graph/depth-first-search) (DFS)
  - `B` [跳跃游戏](src/algorithms/uncategorized/jump-game)
  - `B` [快速算次方](src/algorithms/math/fast-powering)
  - `A` [排列](src/algorithms/sets/permutations) (有/无重复)
  - `A` [组合](src/algorithms/sets/combinations) (有/无重复)
- **动态编程** - 使用以前找到的子解决方案构建解决方案
  - `B` [斐波那契数](src/algorithms/math/fibonacci)
  - `B` [跳跃游戏](src/algorithms/uncategorized/jump-game)
  - `B` [独特路径](src/algorithms/uncategorized/unique-paths)
  - `B` [雨水收集](src/algorithms/uncategorized/rain-terraces) - 疏导雨水问题
  - `B` [递归楼梯](src/algorithms/uncategorized/recursive-staircase) - 计算有共有多少种方法可以到达顶层 (4 种解题方案)
  - `A` [莱温斯坦距离](src/algorithms/string/levenshtein-distance) - 两个序列之间的最小编辑距离
  - `A` [最长公共子序列](src/algorithms/sets/longest-common-subsequence) (LCS)
  - `A` [最长公共子串](src/algorithms/string/longest-common-substring)
  - `A` [最长递增子序列](src/algorithms/sets/longest-increasing-subsequence)
  - `A` [最短公共子序列](src/algorithms/sets/shortest-common-supersequence)
  - `A` [0-1 背包问题](src/algorithms/sets/knapsack-problem)
  - `A` [整数拆分](src/algorithms/math/integer-partition)
  - `A` [最大子数列](src/algorithms/sets/maximum-subarray)
  - `A` [贝尔曼-福特算法](src/algorithms/graph/bellman-ford) - 找到所有图顶点的最短路径
  - `A` [弗洛伊德算法](src/algorithms/graph/floyd-warshall) - 找到所有顶点对之间的最短路径
  - `A` [正则表达式匹配](src/algorithms/string/regular-expression-matching)
- **回溯法** - 类似于 `BF 算法` 试图产生所有可能的解决方案，但每次生成解决方案测试如果它满足所有条件，那么只有继续生成后续解决方案。否则回溯并继续寻找不同路径的解决方案。
  - `B` [跳跃游戏](src/algorithms/uncategorized/jump-game)
  - `B` [独特路径](src/algorithms/uncategorized/unique-paths)
  - `A` [幂集](src/algorithms/sets/power-set) - 该集合的所有子集
  - `A` [哈密顿图](src/algorithms/graph/hamiltonian-cycle) - 恰好访问每个顶点一次
  - `A` [八皇后问题](src/algorithms/uncategorized/n-queens)
  - `A` [骑士巡逻](src/algorithms/uncategorized/knight-tour)
  - `A` [组合求和](src/algorithms/sets/combination-sum) - 从规定的总和中找出所有的组合
- **Branch & Bound** - 记住在回溯搜索的每个阶段找到的成本最低的解决方案，并使用到目前为止找到的成本最小值作为下限。以便丢弃成本大于最小值的解决方案。通常，使用 BFS 遍历以及状态空间树的 DFS 遍历。

## 算法评定标准

### 1. 时间复杂度 T(n)

一般情况下，算法中基本操作重复执行的次数是问题规模 n 的某个函数 f(n),算法的时间度量记作 T(n)=O(f(n)) ，他表示随问题规模 n 的增大，算法执行时间的增长率和 f(n)的增长相同，称作算法的渐进时间复杂度(asymptotic time complexity),简称时间复杂度。

分析算法的时间复杂度，并不是基于算法执行的确切时间，而是基于算法「执行步骤数量」。而这个执行步骤数量因不同的情况，也分「最好情况、最坏情况 和 平均情况」

- **最优情况**: 没有什么大的价值，因为它没有提供什么有用信息，反应的只是最乐观最理想的情况，没有参考价值。

- **平均情况**: 是对算法的一个全面评价，因为它完整全面的反映了这个算法的性质，但从另一方面来说，这种衡量并没有什么保证，并不是每个运算都能在这种情况内完成。

- **最坏情况**: 它提供了一种保证，这个保证运行时间将不会再坏了，所以一般我们所算的时间复杂度是最坏情况下的时间复杂度，做事要考虑到最坏的情况是一个道理。

因此，分析算法的时间复杂度的好坏，通常是根据「最坏情况」去分析的。

### 2. 空间复杂度 S(n)

空间复杂度(Space Complexity)是对一个算法在运行过程中临时占用存储空间大小的量度，记做 S(n)=O(f(n))。

### 稳定性

在待排序的记录序列中，存在多个具有相同的关键字的记录，若经过排序，这些记录的相对次序保持不变，即在原序列中，`r[i]=r[j]`，且`r[i]`在`r[j]`之前，而在排序后的序列中，`r[i]`仍在`r[j]`之前，则称这种排序算法是稳定的；否则称为不稳定的。

## 大 O 表示法

推导大 O 表示法通常我们会使用如下规则:

- 用常量 1 取代运行时间中的所有加法常量

- 在修改后的运行次数函数中, 只保留最高阶项

- 如果最高阶项存在并且不是 1, 则去除与这个项相乘的常数.

![大O符号中指定的算法的增长顺序](../images/big-o-graph.png)

以下是一些最常用的 大 O 标记法 列表以及它们与不同大小输入数据的性能比较。

| 大 O 标记法 | 计算 10 个元素 | 计算 100 个元素 | 计算 1000 个元素 |
| ----------- | -------------- | --------------- | ---------------- |
| O(1)        | 1              | 1               | 1                |
| O(log N)    | 3              | 6               | 9                |
| O(N)        | 10             | 100             | 1000             |
| O(N log N)  | 30             | 600             | 9000             |
| O(N^2)      | 100            | 10000           | 1000000          |
| O(2^N)      | 1024           | 1.26e+29        | 1.07e+301        |
| O(N!)       | 3628800        | 9.3e+157        | 4.02e+2567       |

## 数据结构操作的复杂性

| 数据结构   | 连接   | 查找   | 插入   | 删除   | 备注                                 |
| ---------- | ------ | ------ | ------ | ------ | ------------------------------------ |
| 数组       | 1      | n      | n      | n      |                                      |
| 栈         | n      | n      | 1      | 1      |                                      |
| 队列       | n      | n      | 1      | 1      |                                      |
| 链表       | n      | n      | 1      | 1      |                                      |
| 哈希表     | -      | n      | n      | n      | 在完全哈希函数情况下，复杂度是 O(1)  |
| 二分查找树 | n      | n      | n      | n      | 在平衡树情况下，复杂度是 O(log(n))   |
| B 树       | log(n) | log(n) | log(n) | log(n) |                                      |
| 红黑树     | log(n) | log(n) | log(n) | log(n) |                                      |
| AVL 树     | log(n) | log(n) | log(n) | log(n) |                                      |
| 布隆过滤器 | -      | 1      | 1      | -      | 存在一定概率的判断错误（误判成存在） |

## 数组排序算法的复杂性

| 名称     | 最优     | 平均           | 最坏         | 内存   | 稳定 | 备注                                           |
| -------- | -------- | -------------- | ------------ | ------ | ---- | ---------------------------------------------- |
| 冒泡排序 | n        | n^2            | n^2          | 1      | Yes  |                                                |
| 插入排序 | n        | n^2            | n^2          | 1      | Yes  |                                                |
| 选择排序 | n        | n^2            | n^2          | 1      | No   |                                                |
| 堆排序   | n log(n) | n log(n)       | n log(n)     | 1      | No   |                                                |
| 归并排序 | n log(n) | n log(n)       | n log(n)     | n      | Yes  |                                                |
| 快速排序 | n log(n) | n log(n)       | n^2          | log(n) | No   | 在 in-place 版本下，内存复杂度通常是 O(log(n)) |
| 希尔排序 | n log(n) | 取决于差距序列 | n (log(n))^2 | 1      | No   |                                                |
| 计数排序 | n + r    | n + r          | n + r        | n + r  | Yes  | r - 数组里最大的数                             |
| 基数排序 | n \_ k   | n \_ k         | n \* k       | n + k  | Yes  | k - 最长 key 的升序                            |
