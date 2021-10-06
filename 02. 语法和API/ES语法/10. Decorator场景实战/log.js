// 为一个方法添加 log 函数，检查输入的参数
let log = (type) => {
  return (target, name, descriptor) => {
    const method = descriptor.value;
    descriptor.value =  (...args) => {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
      let ret;
      try {
        ret = method.apply(target, args);
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
      }
      return ret;
    }
  }
};
