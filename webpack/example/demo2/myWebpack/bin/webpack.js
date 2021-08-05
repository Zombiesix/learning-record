// webpack 类源码

const fs = require('fs')
const path = require('path')
const babelparser = require("@babel/parser")
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

module.exports = class webpack {
  constructor(options) {
    // 读取配置文件的信息
    this.entry = options.entry
    this.output = options.output

    this.modulesInfo = []
  }

  // 入口函数，执行模块的编译
  // 读取入口文件内容，并编译
  run() {
    const moduleParserInfo = this.parser(this.entry)
    this.modulesInfo.push(moduleParserInfo)

    for(let i = 0; i < this.modulesInfo.length; i++) {
      // 判断是否有依赖
      const dependencies = this.modulesInfo[i].dependencies
      if (dependencies) {
        for (let j in dependencies) { // 循环依赖对象
          this.modulesInfo.push(this.parser(dependencies[j])) // 递归
        }
      }
    }
    // console.log(this.modulesInfo);
    
    // 结构转换
    const obj = {}
    this.modulesInfo.forEach(module => {
      obj[module.modulePath] = {
        dependencies: module.dependencies,
        code: module.code
      }
    })
    // console.log(obj);
    this.getBundleFile(obj)
  }

  // 模块的编译函数，接受一个模块的路径
  parser(modulePath) {
    // 1. 分析是否有依赖；有：提取依赖的路径
    // 2. 编译模块生成 chunk
    const content = fs.readFileSync(modulePath,  "utf-8")
    const ast = babelparser.parse(content, { // 编译成抽象语法树
      sourceType: "module"
    })
    // ast.program.body 可以获取到代码集合（对象数组类型 每一行表示一个对象）
    // import 方式类型：ImportDeclaration；requrie 方式类型：VariableDeclaration
    // console.log(ast);
    const dependencies = {} // 保存依赖路径
    traverse(ast, { // 过滤 ImportDeclaration 节点
      ImportDeclaration: function({ node }) {
        const newPath = ("./" + path.join(path.dirname(modulePath), node.source.value)).replace('\\', '\/')
        dependencies[node.source.value] = newPath
      }
    })
    // console.log(dependencies);

    // 编译后生成 chunk
    const { code } = transformFromAst(ast, null, {
      presets: [
        [
          '@babel/preset-env'
        ]
      ]
    })
    // console.log(code);

    return {
      modulePath,
      dependencies,
      code
    }
  }

  // 生成 bundle 文件
  getBundleFile(obj) {
    const bundlePath = path.join(this.output.path, this.output.filename)
    const depInp = JSON.stringify(obj)
    console.log(bundlePath);
    const content = `
      (function(modulesInfo) {
        function require(modulePath) {

          const exports = {}
          
          function newRequire(relativePath) {
            return require(modulesInfo[modulePath].dependencies[relativePath])
          }

          (function(require, code) {
            eval(code)
          })(newRequire, modulesInfo[modulePath].code)
          
          return exports
        }
        require('${this.entry}'); // 从入口文件中开始执行
      })(${depInp})
    `
    
    fs.writeFileSync(bundlePath, content, "utf-8")
  }

}
