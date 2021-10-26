(function (window) {
  var Waterfall = function (options) {
    this.el = document.getElementsByClassName(options.el)[0];
    this.oItems = this.el.getElementsByTagName("div");
    this.column = options.column;
    this.gap = options.gap;
    this.itemWidth =
      (this.el.offsetWidth - (this.column - 1) * this.gap) / this.column;
    this.heightList = [];

    this.init();
  };

  Waterfall.prototype.init = function () {
    this.render();
  };

  Waterfall.prototype.render = function () {
    var item = null,
      minIndex = -1;
    for (let i = 0; i < this.oItems.length; i++) {
      item = this.oItems[i];
      item.style.width = this.itemWidth + "px";

      if (i < this.column) {
        item.style.top = 0 + "px";
        item.style.left = i * (this.itemWidth + this.gap) + "px";
        this.heightList.push(item.offsetHeight);
      } else {
        var minIndex = getMinIndex(this.heightList);
        item.style.left = this.oItems[minIndex].offsetLeft + "px";
        item.style.top = this.heightList[minIndex] + this.gap + "px";

        this.heightList[minIndex] += item.offsetHeight + this.gap;
      }
    }
  };

  function getMinIndex(list) {
    return list.indexOf(Math.min.apply(null, list));
  }

  window.Waterfall = Waterfall;
})(window);
