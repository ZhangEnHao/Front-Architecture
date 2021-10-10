export default algorithm = {
  groupByKey: function(array, key) {
    return array.reduce(function (item, index) {
      (item[index[key]] = item[index[key]] || []).push(index);
      return item;
    }, {});
  },

  groupByList: function(array, fn) {
    let groups = {}
  
    array.forEach(o => {
      let group = JSON.stringify(fn(o))
      groups[group] = groups[group] || []
      groups[group].push(o)
    })
  
    return Object.keys(groups).map(group => groups[group])
  },

  pluck: function(array, iteratee) {
    let index = -1
    const length = array == null ? 0 : array.length
    const result = new Array(length)
  
    while (++index < length) {
      result[index] = iteratee(array[index], index, array)
    }
    return result
  },

  values: function(object) {
    return object ? this.baseValues(object, keys(object)) : [];
  },

  baseValues: function(object, props) {
    return props.map(function(key) {
      return object[key];
    });
  }
  
}