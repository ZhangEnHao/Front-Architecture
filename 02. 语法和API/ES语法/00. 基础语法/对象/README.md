## Object.is和===的区别？

Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。 源码如下：

```javaScript
function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }
 


```



[JS 项目中究竟应该使用 Object 还是 Map？| 项目复盘](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247488278&idx=2&sn=8e9691b8cb4bc6f0eea8831736046975&chksm=fa2bf3ffcd5c7ae996d94ec83fa4e7022c1347588b4b69bb0712d5c1f5e6090bc083a3df57c4&scene=126&&sessionid=1664519637#rd)

