setTimeout(() => {
  console.log("0");
}, 0);
new Promise((resolve, reject) => {
  console.log("1");
  resolve();
})
  .then(() => {
    console.log("2");
    new Promise((resolve, reject) => {
      console.log("3");
      resolve();
    })
      .then(() => {
        console.log("4");
      })
      .then(() => {
        console.log("5");
      });
  })
  .then(() => {
    console.log("6");
  });

new Promise((resolve, reject) => {
  console.log("7");
  resolve();
}).then(() => {
  console.log("8");
});

// 1 7 2 3 8 4 6 5 0

/*输出顺序从上到下进行分析
：9： 遇到定时器 setTimeout，放入宏队列（宏任务 1）
：13：遇到同步回调 newPromise，直接执行输出 1
：16：遇到.then 将该部分放入微队列（微任务 1）
：26：*遇到.then ，暂时不会将该部分放入微队列，因为该任务依赖于微任务 1，微任务 1 还没有执行完
：30：遇到同步回调 newPromise，直接执行输出 7
：33：遇到.then 将该部分放入微队列（微任务 2）
：16：执行微任务 1，输出 2
：18：\*遇到同步回调 newPromise，直接执行输出 3，此时 Promise 状态改变为 resolved，但.then 的值是 undefined
：21：遇到.then 将该部分放入微队列（微任务 3）
：23：遇到.then ，暂时不会将该部分放入微队列，因为该任务依赖于微任务 3，微任务 3 还没有执行完
：26：因为微任务 1 执行完毕，所以遇到.then 将该部分放入微队列（微任务 4）
：33：执行微任务 2，输出 8
：21：执行微任务 3，输出 4
：23：因为微任务 3 执行完毕，所以遇到.then 将该部分放入微队列（微任务 5）
：26：执行微任务 4，输出 6
：23：执行微任务 5，输出 5
：9： 微任务执行完毕，执行宏任务，输出 0

    所以输出顺序是：1，7，2，3，8，4，6，5，0
    * */
