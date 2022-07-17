function newInstance() {
  // 第一个参数是构造函数，后面的才是函数实际的参数
  let [constructor, ...args] = [...arguments];
  // 构造函数类型合法判断
  if (typeof constructor !== "function") {
    throw new Error("newOperator function the first param must be a function");
  }

  // ES6 new.target 是指向构造函数
  newInstance.target = constructor;

  // 1、创建一个空对象实例
  // let target = new Object();

  // 2、原型链连接
  // 不建议使用 __proto__直接用 Object.create 实现
  // target.__proto__ = constructor.prototype;
  // MDN：Object.setPrototypeOf 不建议用，因为性能太差。最好用Objecr.create新建对象
  // Object.setPrototypeOf(target, constructor.prototype)
  let target = Object.create(constructor.prototype);

  // 3、this指向实例对象， 将构造函数的属性和方法添加到这个新的空对象上。
  let result = constructor.apply(target, args);

  // 如果构造函数返回的结果有返回值且为对象类型，那么就返回结果，否则就返回 target
  return Object.prototype.toString.call(result) === "[object Object]"
    ? result
    : target;
}
