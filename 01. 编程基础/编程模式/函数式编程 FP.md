## 函数式编程

- 实现最小粒度的函数封装、组合、复用（积木逻辑）

- 更换思维方式：用表达式（映射）来描述程序（而非用过程组织计算）

## 纯函数

1. 定义

- 函数的返回结果只依赖于它的参数，相同的输入始终得到相同的输出

- 函数的执行过程里面没有副作用（一个函数执行过程对产生了外部可观察变化就可以说产生了副作用）

2. 优点

- 可缓存：相同的输入，可产生相同的输出

- 可测试

## 柯里化

## 组合

## Pointfree

`Pointfree`：把数据处理的过程定义成一种与参数无关的合成运算

## 函子

如果一个容器里面有 `of` 方法，就称为有指向的容器

函数式编程，使用的时候尽可能不要 `new` 对象，写一个类似静态工厂方法的 `of` 方法，用来返回生产想要的实例。

```JavaScript
class PointedContainer {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new PointedContainer(value);
  }
}

let p = PointedContainer.of(1);
```

如果



