/**
 * @param String parentSelector 选择器字符串, 用于过滤需要实现代理的父层元素，既事件需要被真正绑定之上
 * @param String targetSelector 选择器字符串, 用于过滤触发事件的选择器元素的后代，既我们需要被代理事件的元素
 * @param String events 一个或多个用空格分隔的事件类型和可选的命名空间，如 click 或 keydown.click
 * @param Function callback 代理事件响应的函数
 */
function eventDelegate(parentSelector, targetSelector, events, callback) {
  // 触发执行的函数
  function triFunction(e) {
    // 兼容性处理
    const event = e || window.event;

    // 获取到目标阶段指向的元素
    const target = event.target || event.srcElement;

    // 获取到代理事件的函数
    const currentTarget = event.currentTarget;

    // 处理 matches 的兼容性
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          const matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // 遍历外层并且匹配
    while (target !== currentTarget) {
      // 判断是否匹配到我们所需要的元素上
      if (target.matches(targetSelector)) {
        const sTarget = target;
        // 执行绑定的函数，注意 this
        callback.call(sTarget, Array.prototype.slice.call(arguments));
      }

      target = target.parentNode;
    }
  }

  // 如果有多个事件的话需要全部一一绑定事件
  events.split(".").forEach(function (evt) {
    // 多个父层元素的话也需要一一绑定
    Array.prototype.slice
      .call(document.querySelectorAll(parentSelector))
      .forEach(function ($p) {
        $p.addEventListener(evt, triFunction);
      });
  });
}
