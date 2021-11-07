/**
 * 现在需要延迟打印数组 [1,2,3,4,5]
 * 每一次打印的初始延迟为 1000ms，增长延迟为 500ms
 * 打印结果如下所示：
 *
 * 0s:    1
 * 1s:    2
 * 2.5s:  3
 * 4.5s:  4
 * 7s:    5
 *
 *
 * 可以通过 reduce 函数来实现
 * 由于引入了递增的延迟执行
 * 所以都需要得到上一次执行的延迟时间
 * */

const arr = [1, 2, 3, 4, 5];

arr.reduce(async (prs, cur, index) => {
  const t = await prs;
  const time = index === 0 ? 0 : 1000 + (index - 1) * 500;
  return new Promise((res) => {
    setTimeout(() => {
      console.log(cur);
      res(time);
    }, time);
  });
}, Promise.resolve(0));
