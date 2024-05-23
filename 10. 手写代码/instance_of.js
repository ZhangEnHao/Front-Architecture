/**
 * L 表示左边表达式
 * R 表示右边表达式
 * */ 
function instance_of(L, R) {
  const O = R.prototype; // 取 R 的显式原型
  L = Object.getPrototypeOf(L); // 取 L 的隐式原型 L = L.__proto__
  while (true) {
    // Object.prototype.__proto__ === null
    if (L === null) {
      return false;
    }
    if (L === O) {
      // 当 L 严格等于 O 时，返回 true
      return true;
    }
    L = Object.getPrototypeOf(L); // 没找到继续向上一层原型链查找 L = L.__proto__
  }
}
