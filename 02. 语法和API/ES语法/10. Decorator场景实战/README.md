用于修饰类方法，获取值的方式为：

```javaScript
const method = descriptor.value;
```

但是如果修饰的是类的实例属性，因为 Babel 的缘故，通过 value 属性并不能获取值，可以写成：

```javaScript
const value = descriptor.initializer && descriptor.initializer();
```


[装饰器](https://es6.ruanyifeng.com/#docs/decorator)

[ES6 系列之我们来聊聊装饰器](https://github.com/mqyqingfeng/Blog/issues/109)

[JS 装饰器（Decorator）场景实战](https://juejin.cn/post/6844903506562777101)
