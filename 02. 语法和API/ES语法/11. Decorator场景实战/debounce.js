// 防抖
function _debounce(func, wait, immediate) {

  var timeout;

  return function () {
      var context = this;
      var args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(function(){
              timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
  }
}

function debounce(wait, immediate) {
return function handleDescriptor(target, key, descriptor) {
  const callback = descriptor.value;

  if (typeof callback !== 'function') {
    throw new SyntaxError('Only functions can be debounced');
  }

  var fn = _debounce(callback, wait, immediate)

  return {
    ...descriptor,
    value() {
      fn()
    }
  };
}
}
