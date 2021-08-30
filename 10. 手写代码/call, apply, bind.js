//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  // [判断函数的上下文对象](https://juejin.cn/post/6844903906279964686#heading-14)
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = globalThis;
  } else {
    context = Object(context); // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }

  args = args ? args : [];

  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol();
  context[key] = this;
  //通过隐式绑定的方式调用函数
  const result = context[key](...args);
  //删除添加的属性
  delete context[key];
  //返回函数调用的返回值
  return result;
};

Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  // JavaScript权威指南判断是否为类数组对象
  function isArrayLike(o) {
    if (
      o && // o不是null、undefined等
      typeof o === "object" && // o是对象
      isFinite(o.length) && // o.length是有限数值 该全局 isFinite() 函数用来判断被传入的参数值是否为一个有限数值
      o.length >= 0 && // o.length为非负值
      o.length === Math.floor(o.length) && // o.length是整数
      o.length < 4294967296 // o.length < 2^32
    ) {
      return true;
    } else {
      return false;
    }
  }

  // 是否传递第二个参数
  if (!Array.isArray(args) && !isArrayLike(args)) {
    throw new TypeError("myApply 第二个参数不为数组并且不为类数组对象抛出错误");
  }

  // [判断函数的上下文对象](https://juejin.cn/post/6844903906279964686#heading-14)
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = globalThis;
  } else {
    context = Object(context); // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }

  args = args ? args : [];
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol();
  context[key] = this;
  //通过隐式绑定的方式调用函数
  const result = context[key](...args);
  //删除添加的属性
  delete context[key];
  //返回函数调用的返回值
  return result;
};

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  args = args ? args : [];
  const fn = this;
  return function newFn(...newFnArgs) {
    // bind实现需要考虑实例化后对原型链的影响
    // this指向new出来的实例，实例的__proto__指向newFn的prototype
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs);
    }
    return fn.apply(context, [...args, ...newFnArgs]);
  };
};

//实现bind方法完美版
Function.prototype.perfectBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = globalThis;
  } else {
    context = Object(context); // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }

  args = args ? args : [];

  let fToBind = this;
  class fNOP {
    constructor() {}
  }
  class fBound {
    constructor() {
      // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
      return fToBind.apply(
        this instanceof fBound ? this : context,
        // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
        args.concat([...arguments])
      );
    }
  }
  // 维护原型关系
  if (this.prototype) {
    // 当执行Function.prototype.bind()时, this为Function.prototype
    // this.prototype(即Function.prototype.prototype)为null
    fNOP.prototype = Object.create(this.prototype);
  }
  // 下行的代码使fBound.prototype是fNOP的实例,因此返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
  fBound.prototype = new fNOP();
  return fBound;
};
