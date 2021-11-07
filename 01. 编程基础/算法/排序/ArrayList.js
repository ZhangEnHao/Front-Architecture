class ArrayList extends Array {
  constructor() {
    super();
  }

  // 交换元素
  swap(m, n) {
    let temp = this.array[m];
    this.array[m] = this.array[n];
    this.array[n] = temp;
  }

  // 简单排序
  // 冒泡排序
  bubbleSort() {
    // 1.获取数组的长度
    const length = this.array.length;

    // 2.反向循环, 因此次数越来越少
    for (let i = length - 1; i >= 0; i--) {
      // 3.根据i的次数, 比较循环到i位置
      for (let j = 0; j < i; j++) {
        // 4.如果j位置比j+1位置的数据大, 那么就交换
        if (this.array[j] > this.array[j + 1]) {
          // 交换
          this.swap(j, j + 1);
        }
      }
    }
  }

  // 选择排序
  selectionSort = function () {
    // 1.获取数组的长度
    const length = this.array.length;

    // 2.外层循环: 从0位置开始取出数据, 直到length-2位置
    for (let i = 0; i < length - 1; i++) {
      // 3.内层循环: 从i+1位置开始, 和后面的内容比较
      let min = i;
      for (let j = min + 1; j < length; j++) {
        // 4.如果i位置的数据大于j位置的数据, 那么记录最小的位置
        if (this.array[min] > this.array[j]) {
          min = j;
        }
      }
      // 5.交换min和i位置的数据
      this.swap(min, i);
    }
  };

  // 插入排序
  insertionSort() {
    // 1.获取数组的长度
    const length = this.array.length;

    // 2.外层循环: 外层循环是从1位置开始, 依次遍历到最后
    for (let i = 1; i < length; i++) {
      // 3.记录选出的元素, 放在变量temp中
      let j = i;
      let temp = this.array[i];

      // 4.内层循环: 内层循环不确定循环的次数, 最好使用while循环
      while (j > 0 && this.array[j - 1] > temp) {
        this.array[j] = this.array[j - 1];
        j--;
      }

      // 5.将选出的j位置, 放入temp元素
      this.array[j] = temp;
    }
  }

  // 高级排序
  // 希尔排序
  shellSort() {
    // 1.获取数组的长度
    const length = this.array.length;

    // 2.根据长度计算增量
    let gap = Math.floor(length / 2);

    // 3.增量不断变量小, 大于0就继续排序
    while (gap >= 1) {
      // 4.实现插入排序
      for (let i = gap; i < length; i++) {
        // 4.1.保存临时变量
        let j = i;
        let temp = this.array[i];

        // 4.2.插入排序的内层循环
        while (j > gap - 1 && this.array[j - gap] > temp) {
          this.array[j] = this.array[j - gap];
          j -= gap;
        }

        // 4.3.将选出的j位置设置为temp
        this.array[j] = temp;
      }

      // 5.重新计算新的间隔
      gap = Math.floor(gap / 2);
    }
  }

  // 快速排序
  // 选择枢纽
  median(left, right) {
    // 1.求出中间的位置
    let center = Math.floor((left + right) / 2);

    // 2.判断并且进行交换
    if (this.array[left] > this.array[center]) {
      this.swap(left, center);
    }
    if (this.array[center] > this.array[right]) {
      this.swap(center, right);
    }
    if (this.array[left] > this.array[right]) {
      this.swap(left, right);
    }

    // 3.巧妙的操作: 将center移动到right - 1的位置.
    this.swap(center, right - 1);

    // 4.返回pivot
    return this.array[right - 1];
  }

  // 快速排序实现
  quickSort() {
    this.quickSortRec(0, this.array.length - 1);
  }

  quickSortRec(left, right) {
    // 0.递归结束条件
    if (left >= right) return;

    // 1.获取枢纽
    let pivot = this.median(left, right);

    // 2.开始进行交换
    // 2.1.记录左边开始位置和右边开始位置
    let i = left;
    let j = right - 1;
    // 2.2.循环查找位置
    while (true) {
      while (this.array[++i] < pivot) {}
      while (this.array[--j] > pivot) {}
      if (i < j) {
        // 2.3.交换两个数值
        this.swap(i, j);
      } else {
        // 2.4.当i<j的时候(一定不会=, 看下面解释中的序号3), 停止循环因为两边已经找到了相同的位置
        break;
      }
    }

    // 3.将枢纽放在正确的位置
    this.swap(i, right - 1);

    // 4.分而治之: 递归调用左边 / 右边
    this.quickSortRec(left, i - 1);
    this.quickSortRec(i + 1, right);
  }
}
