// loader 是一个函数结构，不接受箭头函数
// 必须有返回值

module.exports = function(source) {
  console.log(source);
  // 获取的就是 loader 传进来的参数，还有很多数据都被传芳在 this 对象中
  console.log(this.query);

  // const result = source.replace('loader', this.query.name)
  // 错误信息   主体内容    sourcemap   ”xxxx“
  // this.callback(null, result); // 同步的使用方式

  const callback = this.async(); // 返回 callback，使用异步的调用方式
  setTimeout(() => { // 异步的使用方法
    const result = source.replace('loader', this.query.name)
    callback(null, result);
  }, 1000)
  
  // return source.replace('loader', 'tony');
}
