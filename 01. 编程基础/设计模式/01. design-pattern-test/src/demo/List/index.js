import $ from 'jquery';
import GET_LIST from '../config';
import createItem from './CreateItem';

export default class List {
  constructor(app) {
    this.app = app;
    this.$el = $("<div>");
  }

  // 获取购物列表数据
  loadData() {
    // 返回 Promise 实例
    return fetch(GET_LIST).then(result => result.json())
  }

  // 生成购物列表
  initItemList(data) {
    data.forEach(itemData => {
      // 创建一个 Item 然后 init
      let item = createItem(this, itemData);
      item.init();
    })
  }

  // 渲染
  render() {
    this.app.$el.append(this.$el)
  }

  init() {
    this.loadData().then(data =>{
      this.initItemList(data)
    }).then(() => {
      this.render();
    })
  }
}