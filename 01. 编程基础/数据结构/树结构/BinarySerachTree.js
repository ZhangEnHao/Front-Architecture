// 创建节点构造函数
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// 创建BinarySearchTree
class BinarySerachTree {
  constructor() {
    // 保存根的属性
    this.root = null;
  }

  // 二叉搜索树相关的操作方法
  // 向树中插入数据
  insert(key) {
    // 1.根据key创建对应的node
    let newNode = new Node(key);

    // 2.判断根节点是否有值
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      // 1.准备向左子树插入数据
      if (node.left === null) {
        // 1.1.node的左子树上没有内容
        node.left = newNode;
      } else {
        // 1.2.node的左子树上已经有了内容
        this.insertNode(node.left, newNode);
      }
    } else {
      // 2.准备向右子树插入数据
      if (node.right === null) {
        // 2.1.node的右子树上没有内容
        node.right = newNode;
      } else {
        // 2.2.node的右子树上有内容
        this.insertNode(node.right, newNode);
      }
    }
  }

    // 遍历方法
  // 先序遍历
  preOrderTraversal(handler) {
    this.preOrderTraversalNode(this.root, handler);
  }

  preOrderTraversalNode(node, handler) {
    if (node !== null) {
      handler(node.key);
      this.preOrderTraversalNode(node.left, handler);
      this.preOrderTraversalNode(node.right, handler);
    }
  }

  // 中序遍历
  inOrderTraversal(handler) {
    this.inOrderTraversalNode(this.root, handler);
  }

  inOrderTraversalNode(node, handler) {
    if (node !== null) {
      this.inOrderTraversalNode(node.left, handler);
      handler(node.key);
      this.inOrderTraversalNode(node.right, handler);
    }
  }

  // 后续遍历
  postOrderTraversal(handler) {
    this.postOrderTraversalNode(this.root, handler);
  }

  postOrderTraversalNode(node, handler) {
    if (node !== null) {
      this.postOrderTraversalNode(node.left, handler);
      this.postOrderTraversalNode(node.right, handler);
      handler(node.key);
    }
  }

  // 获取最大值和最小值
  min() {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  max() {
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  // 搜索特定的值
  /*
  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    // 1.如果传入的node为null那么, 那么就退出递归
    if (node === null) {
      return false
    }

    // 2.判断node节点的值和传入的key大小
    if (node.key > key) { // 2.1.传入的key较小, 向左边继续查找
      return this.searchNode(node.left, key)
    } else if (node.key < key) { // 2.2.传入的key较大, 向右边继续查找
      return this.searchNode(node.right, key)
    } else { // 2.3.相同, 说明找到了key
      return true
    }
  }
  */
  search(key) {
    let node = this.root;
    while (node !== null) {
      if (node.key > key) {
        node = node.left;
      } else if (node.key < key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  }

  removeNode(node, key) {
    // 1.如果传入的node为null, 直接退出递归.
    if (node === null) return null;

    // 2.判断key和对应node.key的大小
    if (node.key > key) {
      node.left = this.removeNode(node.left, key);
    }
  }

  // 删除节点
  remove(key) {
    // 1.定义临时保存的变量
    let current = this.root; // 用于一会儿找到的要删除的节点对应的node.
    let parent = this.root; // 用于保存current节点的父节点
    let isLeftChild = true; // boolean类型,用来记录current是在父节点的左侧还是右侧, 以便到时候设置parent的left或者right

    // 2.开始查找节点
    while (current.key !== key) {
      parent = current;
      if (key < current.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }

      // 如果发现current已经指向null, 那么说明没有找到要删除的数据
      if (current === null) return false;
    }

    // 3.删除的节点是叶节点
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root === null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // 4.删除有一个子节点的节点
    else if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }

    // 5.删除有两个节点的节点
    else {
      // 1.获取后继节点
      let successor = this.getSuccessor(current);

      // 2.判断是否是根节点
      if (current == this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }

      // 3.将删除节点的左子树赋值给successor
      successor.left = current.left;
    }

    return true;
  }

  // 找后继的方法
  getSuccessor(delNode) {
    // 1.使用变量保存临时的节点
    let successorParent = delNode;
    let successor = delNode;
    let current = delNode.right; // 要从右子树开始找

    // 2.寻找节点
    while (current !== null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    // 3.如果是删除图中15的情况, 还需要如下代码
    if (successor !== delNode.right) {
      successorParent.left = successor.right;
      successor.right = delNode.right;
    }
    
    return successor
  }
}
