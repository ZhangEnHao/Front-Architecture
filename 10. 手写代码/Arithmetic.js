/**
 * 
 * [js小数的数学运算和四舍五入精度问题](https://juejin.im/post/5e3bb243f265da573a01e396)
 */ 

/**
 * 带有小数的加法/减法运算
 * 减法实际上可看成加法，所以如果要做减法，只需第二个参数即被减数传负值即可
 * @param {Number} arg1 - 加数/减数
 * @param {Number} arg2 - 加数/被减数
 */
export function addFloat(arg1, arg2) {
  let m = 0; // 记录两个加数中最长的小数位长度
  let arg1Str = arg1 + '';
  let arg2Str = arg2 + '';
  const arg1StrFloat = arg1Str.split('.')[1];
  const arg2StrFloat = arg2Str.split('.')[1];
  arg1StrFloat && (m = arg1StrFloat.length);
  arg2StrFloat && (m = m > arg2StrFloat.length ? m : arg2StrFloat.length);
  arg1Str = arg1.toFixed(m); // 主要是为了补零
  arg2Str = arg2.toFixed(m);
  const transferResult = +(arg1Str.replace('.', '')) + +(arg2Str.replace('.', ''));
  return transferResult / Math.pow(10, m);
};

/**
* 带有小数的乘法运算
* @param {Number} arg1 - 因数
* @param {Number} arg2 - 因数
*/
export function multiplyFloat(arg1, arg2) {
  let m = 0;
  const arg1Str = arg1 + '';
  const arg2Str = arg2 + '';
  const arg1StrFloat = arg1Str.split('.')[1];
  const arg2StrFloat = arg2Str.split('.')[1];
  arg1StrFloat && (m += arg1StrFloat.length);
  arg2StrFloat && (m += arg2StrFloat.length);
  const transferResult = +(arg1Str.replace('.', '')) * +(arg2Str.replace('.', ''));
  return transferResult / Math.pow(10, m);;
};

/**
* 有小数的除法运算
* @param {Number} arg1 - 除数
* @param {Number} arg2 - 被除数
*/
export function divideFloat(arg1, arg2) {
  const arg1Str = arg1 + '';
  const arg2Str = arg2 + '';
  const arg1StrFloat = arg1Str.split('.')[1] || '';
  const arg2StrFloat = arg2Str.split('.')[1] || '';
  const m = arg2StrFloat.length - arg1StrFloat.length;
  const transferResult = +(arg1Str.replace('.', '')) / +(arg2Str.replace('.', ''));
  return transferResult * Math.pow(10, m);;
};