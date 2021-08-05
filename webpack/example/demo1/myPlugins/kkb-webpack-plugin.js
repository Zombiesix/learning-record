// 插件的基本结构
// 类
// 必须内置一个 apply 函数

class KkbWebpackPlugin {

  constructor(options) {
    // 获取参数（new 这个插件时将参数传入）
    console.log(options);
  }
  
  apply(compiler) {
    // compiler 实例化的 webpack 对象，包含配置等信息
    // hook 钩子
    // 同步钩子用 tap
    // 异步钩子用 tapAsync 注册
    // 事件名称任意，建议和插件名称一致
    compiler.hooks.emit.tapAsync("xxx", (compilation, cb) => {
      console.log('当前webpack同步编译完成~~~');
      console.log(compilation.assets);
      cb();
    })
    
    // compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb)=>{
    //   setTimeout(()=>{
    //      console.log('等待3s再发射文件到指定文件夹');
    //      cb();
    //   }, 3000)
    // })
    
    // compiler.hooks.emit.tapPromise('HelloAsyncPlugin', compilation => {
  	// 	return new Promise((resolve, reject) => {
    // 		setTimeout(function() {
    //   		console.log('异步工作完成……');
    //  		 resolve();
    // 		}, 1000);
  	// 	});
	  // });
    console.log("hello plugins");
  }
}

module.exports = KkbWebpackPlugin;


