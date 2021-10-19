## 内存机制

`JS` 内存空间分为栈(stack)、堆(heap)、池(一般也会归类为栈中)。 其中栈存放变量，堆存放复杂对象，池存放常量，所以也叫常量池。

1. 变量的存放

- 基本类型：--> 栈内存（不包含闭包中的变量），因为这些类型在内存中分别占有固定大小的空间，通过按值来访问。基本类型一共有 6 种：`Undefined`、`Null`、`Boolean`、`Number` 、`String` 和 `Symbol`。

- 引用类型：--> 堆内存，因为这种值的大小不固定，因此不能把它们保存到栈内存中，但内存地址大小的固定的，因此保存在堆内存中，在栈内存中存放的只是该对象的访问地址。当查询引用类型的变量时， 先从栈中读取内存地址， 然后再通过地址找到堆中的值。对于这种把它叫做按引用访问。

在计算机的数据结构中，栈比堆的运算速度快，`Object` 是一个复杂的结构且可以扩展：数组可扩充，对象可添加属性，都可以增删改查。将他们放在堆中是为了不影响栈的效率。而是通过引用的方式查找到堆中的实际对象再进行操作。所以查找引用类型值的时候先去栈查找再去堆查找。

闭包中的变量并不保存中栈内存中，而是保存在堆内存中，这也就解释了函数之后之后为什么闭包还能引用到函数内的变量。

## 内存生命周期

不管什么程序语言，内存生命周期基本是一致的：

1。 分配你所需要的内存

2。 使用分配到的内存（读，写）

3。 不需要时将其释放/归还

在 `C` 语言中，有专门的内存管理接口，像 `malloc()` 和 `free()`。而在 `JS` 中，没有专门的内存管理接口，所有的内存管理都是"自动"的。`JS` 在创建变量时，自动分配内存，并在不使用的时候，自动释放。

**思考题**

```javaScript
var a = {n: 1};
var b = a;
a。x = a = {n: 2};

a。x 	// --> undefined
b。x 	// --> {n: 2}
```

解答：

- 1。  **优先级**: `。` 的优先级高于 `=` ，所以先执行 `a。x`，堆内存中的 `{n: 1}` 就会变成 `{n: 1, x: undefined}`，改变之后相应的 `b.x` 也变化了，因为指向的是同一个对象。

- 2。  **赋值操作是从右到左**，所以先执行 `a = {n: 2}`，`a` 的引用就被改变了，然后这个返回值又赋值给了 `a.x`，需要注意的是这时候 `a。x`是第一步中的 `{n: 1, x: undefined}` 那个对象，其实就是 `b.x`，相当于 `b.x = {n: 2}`

## `JS` 中的内存回收

`JavaScript` 的自动垃圾收集机制，最常用的是通过**标记清除**的算法来找到哪些对象是不再继续使用的值，使用 `a = null` 其实仅仅只是做了一个释放引用的操作，让 `a` 原本对应的值失去引用，脱离执行环境，这个值会在下一次垃圾收集器执行操作时被找到并释放。

- 局部变量和全局变量的销毁

  - **局部变量**：局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。

  - **全局变量**：全局变量什么时候需要自动释放内存空间则很难判断，所以**在开发中尽量避免使用全局变量**。

- 以 `Google` 的 `V8` 引擎为例，`V8` 引擎中所有的 `JS` 对象都是通过堆来进行内存分配的

  - **初始分配**：当声明变量并赋值时，`V8` 引擎就会在堆内存中分配给这个变量。

  - **继续申请**：当已申请的内存不足以存储这个变量时，`V8` 引擎就会继续申请内存，直到堆的大小达到了 `V8` 引擎的内存上限为止。

- `V8` 引擎对堆内存中的 `JS` 对象进行分代管理

  - **新生代**：存活周期较短的 `JS` 对象，如临时变量、字符串等。

  - **老生代**：经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。

## 垃圾回收算法

对垃圾回收算法来说，核心思想就是如何判断内存已经不再使用，常用垃圾回收算法有下面两种。

- 引用计数（现代浏览器不再使用）

- 标记清除（常用）

### 1. 引用计数

引用计数是最简单的垃圾收集算法.此算法把“对象是否不再需要 / 内存不再使用”简化定义为“对象有没有其他对象引用到它”. 如果没有引用指向该对象（零引用）, 对象将被垃圾回收机制回收

```javaScript
// 创建一个对象person，他有两个指向属性age和name的引用
var person = {
    age: 12,
    name: 'aaaa'
};

person.name = null; // 虽然name设置为null，但因为person对象还有指向name的引用，因此name不会回收

var p = person;
person = 1; //原来的person对象被赋值为1，但因为有新引用p指向原person对象，因此它不会被回收

p = null; //原person对象已经没有引用，很快会被回收
```

引用计数有一个致命的问题，那就是循环引用

如果两个对象相互引用，尽管他们已不再使用，但是

两个对象对象被创建并互相引用，就会造成了循环引用。 它们被调用之后不会离开函数作用域, 所以它们已经没有用了，可以被回收了。然而，引用计数算法考虑到它们互相都有至少一次引用，所以垃圾回收器不会对它们进行回收，最终可能会导致内存泄露。

```javaScript
function cycle() {
    var o1 = {};
    var o2 = {};
    o1.a = o2;
    o2.a = o1;

    return "cycle reference!"
}

cycle();
```

`cycle` 函数执行完成之后，对象 `o1` 和 `o2` 实际上已经不再需要了，但根据引用计数的原则，他们之间的相互引用依然存在，因此这部分内存不会被回收。所以现代浏览器不再使用这个算法。但是 IE 依旧使用。

实际例子:

```javaScript
var div;
window.onload = function(){
  div = document.getElementById("myDivElement");
  div.circularReference = div;
  div.lotsOfData = new Array(10000).join("*");
};
```

在上面的例子里，`myDivElement` 这个 `DOM` 元素里的 `circularReference` 属性引用了 `myDivElement`, 造成了循环引用。 IE6，7 使用引用计数方式对 `DOM` 对象进行垃圾回收。该方式常常造成对象被循环引用时内存发生泄漏。现代浏览器通过使用**标记-清除**内存回收算法，来解决这一问题。

### 2. 标记-清除（常用）

标记-清除算法把“对象是否不再需要”简化定义为“对象是否可以获得”。

即从根部`root`对象（在 `Javascript` 里，根是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，保留。那些从根部出发无法触及到的对象被标记为不再使用，稍后进行回收。

无法触及的对象包含了没有引用的对象这个概念，但反之未必成立。

标记清除（ Mark-and-sweep ）算法由以下几步组成：

- 1、垃圾回收器创建了一个“roots”列表。roots 通常是代码中全局变量的引用。JavaScript 中，“window” 对象是一个全局变量，被当作 root 。window 对象总是存在，因此垃圾回收器可以检查它和它的所有子对象是否存在（即不是垃圾）；

- 2、所有的 roots 被检查和标记为激活（即不是垃圾）。所有的子对象也被递归地检查。从 root 开始的所有对象如果是可达的，它就不被当作垃圾。

- 3、所有未被标记的内存会被当做垃圾，收集器现在可以释放内存，归还给操作系统了。

现代的垃圾回收器改良了算法，但是本质是相同的：可达内存被标记，其余的被当作垃圾回收。

所以上面的例子就可以正确被垃圾回收处理了。

从 2012 年起, 所有现代浏览器都使用了标记-清除内存回收算法。所有对 `JavaScript` 垃圾回收算法的改进都是基于标记-清除算法的改进.

所以现在对于主流浏览器来说，只需要切断需要回收的对象与根部的联系。最常见的内存泄露一般都与 DOM 元素绑定有关：

```javaScript
email.message = document.createElement(“div”);
displayList.appendChild(email.message);

// 稍后从displayList中清除DOM元素
displayList.removeAllChildren();
```

上面代码中，`div` 元素已经从 `DOM` 树中清除，但是该 `div` 元素还绑定在 `email` 对象中，所以如果 `email` 对象存在，那么该 `div` 元素就会一直保存在内存中。

## 内存泄漏

对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。 对于不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。

本质上讲, 内存泄露就是不再被需要的内存, 由于某种原因, 无法被释放。

1. 内存泄漏识别方法

- 浏览器方法

  - 1. 打开开发者工具，选择 `Memory`
  - 2. 在右侧的 `Select profiling type` 字段里面勾选 `timeline`
  - 3. 点击左上角的录制按钮。
  - 4. 在页面上进行各种操作，模拟用户的使用情况。
  - 5. 一段时间后，点击左上角的 `stop` 按钮，面板上就会显示这段时间的内存占用情况。

- 命令行方法

使用 `Node` 提供的 `process.memoryUsage` 方法。

```javaScript
console.log(process.memoryUsage());

// 输出
{
  rss: 27709440,		// resident set size，所有内存占用，包括指令区和堆栈
  heapTotal: 5685248,   // "堆"占用的内存，包括用到的和没用到的
  heapUsed: 3449392,	// 用到的堆的部分
  external: 8772 		// V8 引擎内部的 C++ 对象占用的内存
}
```

判断内存泄漏，以 `heapUsed` 字段为准。

**思考题**

1. 从内存来看 `null` 和 `undefined` 本质的区别是什么？

解答：

给一个全局变量赋值为 `null`，相当于将这个变量的指针对象以及值清空。

如果是给对象的属性赋值为 `null`，或者局部变量赋值为 `null`，相当于给这个属性分配了一块空的内存，然后值为 `null`， `JS` 会回收全局变量为 `null` 的对象。

给一个全局变量赋值为 `undefined`，相当于将这个对象的值清空，但是这个对象依旧存在。

如果是给对象的属性赋值 为 `undefined`，说明这个值为空值

扩展：

声明了一个变量，但未对其初始化时，这个变量的值就是 `undefined`，它是 `JavaScript` 基本类型 之一。

```javaScript
var data;
console.log(data === undefined); //true
```

对于尚未声明过的变量，只能执行一项操作，即使用 `typeof` 操作符检测其数据类型，使用其他的操作都会报错。

```javaScript
//data变量未定义
console.log(typeof data); // "undefined"
console.log(data === undefined); //报错
```

值 `undefined` 特指对象的值未设置，它是 `JavaScript` 基本类型 之一。

值 `null` 是一个字面量，它不像 `undefined` 是全局对象的一个属性。`null` 是表示缺少的标识，指示变量未指向任何对象。

```javaScript
// foo不存在，它从来没有被定义过或者是初始化过：
foo;
"ReferenceError: foo is not defined"

// foo现在已经是知存在的，但是它没有类型或者是值：
var foo = null;
console.log(foo);	// null
```

## 常见的内存泄露案例及如何避免

1. 意外的全局变量

未定义的变量会在全局对象创建一个新变量，如下。

```javaScript
function foo(arg) {
  bar = "this is a hidden global variable";
}

// =>

function foo(arg) {
  window.bar = "this is an explicit global variable";
}
```

函数 `foo` 内部忘记使用 `var` ，实际上 `JS` 会把 `bar` 挂载到全局对象上，意外创建一个全局变量。在页面中的全局变量, 只有当页面被关闭后才会被销毁. 所以这种写法就会造成内存泄露, 当然在这个例子中泄露的只是一个简单的字符串, 但是在实际的代码中, 往往情况会更加糟糕.

另一个意外的全局变量可能由 `this` 创建。

```javaScript
function foo() {
    this.variable = "potential accidental global";
}

// Foo 调用自己，this 指向了全局对象（window）
// 而不是 undefined
foo();
```

解决方法：

在 `JavaScript` 文件头部加上 `'use strict'`，使用严格模式避免意外的全局变量，此时上例中的 `this` 指向 `undefined`。如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 `null` 或者重新定义。

2. 被遗忘的计时器或回调函数

```javaScript
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);
```

上面的例子表明，在节点 `node` 或者数据不再需要时，定时器依旧指向这些数据。所以哪怕当 `node` 节点被移除后，`interval` 仍旧存活并且垃圾回收器没办法回收，它的依赖也没办法被回收，除非终止定时器。

```javaScript
var element = document.getElementById('button');
function onClick(event) {
    element.innerHTML = 'text';
}

element.addEventListener('click', onClick);
```

对于上面观察者的例子，一旦它们不再需要（或者关联的对象变成不可达），明确地移除它们非常重要。老的 `IE6` 是无法处理循环引用的。因为老版本的 `IE` 是无法检测 `DOM` 节点与 `JavaScript` 代码之间的循环引用，会导致内存泄漏。

但是，现代的浏览器（包括 `IE` 和 `Microsoft Edge`）使用了更先进的垃圾回收算法（标记清除），已经可以正确检测和处理循环引用了。即回收节点内存时，不必非要调用 `removeEventListener` 了。

3. 脱离 `DOM` 的引用

如果把 `DOM` 存成字典（`Map`）或者数组，此时，同样的 `DOM` 元素存在两个引用：一个在 `DOM` 树中，另一个在字典中。那么将来需要把两个引用都清除。

```javaScript
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image'),
    text: document.getElementById('text')
};
function doStuff() {
    image.src = 'http://some.url/image';
    button.click();
    console.log(text.innerHTML);
    // 更多逻辑
}
function removeButton() {
    // 按钮是 body 的后代元素
    document.body.removeChild(document.getElementById('button'));
    // 此时，仍旧存在一个全局的 #button 的引用
    // elements 字典。button 元素仍旧在内存中，不能被 GC 回收。
}
```

上述案例中, 即使我们对于 `button` 元素进行了移除, 但是仍然有对 `button` 元素的引用, 依然无法对齐进行内存回收。

另外需要注意的一个点是, 对于一个 `Dom` 树的叶子节点的引用。举个例子：如果代码中保存了表格某一个 `<td>` 的引用。将来决定删除整个表格的时候，直觉认为 GC 会回收除了已保存的 `<td>` 以外的其它节点。实际情况并非如此：此 `<td>` 是表格的子节点，子元素与父元素是引用关系。由于代码保留了 `<td>` 的引用，导致整个表格仍待在内存中。所以保存 `DOM` 元素引用的时候，要小心谨慎。

4. 闭包

闭包的关键是一个内部函数，有权访问包含其的外部函数中的变量。下面这种情况下， 闭包也会造成内存泄露。

```javaScript
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // 对于 'originalThing'的引用
      console.log("hi");
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("someMessage");
    }
  };
};

setInterval(replaceThing, 1000);
```

每次调用 `replaceThing`，`theThing` 得到一个包含一个大数组和一个新闭包（`someMethod`）的新对象。同时，变量 `unused` 是一个引用 `originalThing` 的闭包（先前的 `replaceThing` 又调用了 `theThing` ）。`someMethod` 可以通过 `theThing` 使用，`someMethod` 与 `unused` 分享闭包作用域，尽管 `unused` 从未使用，它引用的 `originalThing` 迫使它保留在内存中（防止被回收）。当这段代码被反复执行时，内存会持续增长。

解决方法：

在 `replaceThing` 的最后添加 `originalThing = null` 。

## `ES6` 的解决方案

`ES6` 中引入 `WeakSet` 和 `WeakMap` 两个新的概念，来解决引用造成的内存回收问题。`WeakSet` 和 `WeakMap` 对于值的引用可以忽略不计，他们对于值的引用是弱引用，内存回收机制，不会考虑这种引用。当其他引用被消除后，引用就会从内存中被释放。

`JS` 这类高级语言，隐藏了内存管理功能。但无论开发人员是否注意，内存管理都在那，所有编程语言最终要与操作系统打交道，在内存大小固定的硬件上工作。不幸的是，即使不考虑垃圾回收对性能的影响，2017 年最新的垃圾回收算法，也无法智能回收所有极端的情况。

唯有程序员自己才知道何时进行垃圾回收，而 `JS` 由于没有暴露显示内存管理接口，导致触发垃圾回收的代码看起来像“垃圾”，或者优化垃圾回收的代码段看起来不优雅、甚至不可读。

所以在 `JS` 这类高级语言中，有必要掌握基础内存分配原理，在对内存敏感的场景，比如 `nodejs` 代码做严格检查与优化。谨慎使用 `dom` 操作、主动删除没有业务意义的变量、避免提前优化、过度优化，在保证代码可读性的前提下，利用性能监控工具，通过调用栈定位问题代码。


[深入理解Chrome V8垃圾回收机制 ](https://github.com/yacan8/blog/issues/33)

[4 类 JavaScript 内存泄漏及如何避免](https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/)

[JavaScript 工作原理：内存管理 + 处理常见的 4 种内存泄漏](https://juejin.cn/post/6844903519078580238)