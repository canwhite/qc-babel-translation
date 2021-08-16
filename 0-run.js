/*=====================
完成算法题个数计数,顺便讲解转译过程
======================*/
const glob = require("glob"); // const path = require('path');


const fs = require('fs');

const parser = require("@babel/parser"); //PS:transformFromAstAsync


const {
  transformFromAstSync
} = require('@babel/core'); //1.glob，根据正则匹配，读出文件名，然后生成文件名数组


const files = glob.sync("./*.js");
console.log("-----", files.length, "-----"); //2.遍历files，item拿到单个文件名

files.forEach((item, index) => {
  //3.通过node的fs模块，读取文件内代码
  const sourceCode = fs.readFileSync(item, {
    encoding: 'utf-8'
  });
  /* console.log(sourceCode); */
  //4.将文件内代码转化为ast形式

  const ast = parser.parse(sourceCode, {
    sourceType: "unambiguous"
  }); //5.通过之前生成的sourceCode，ast，和我们转化用的插件
  //生成目标code

  const {
    code
  } = transformFromAstSync(ast, sourceCode, {
    plugins: [
    /* "@babel/plugin-transform-modules-umd" */
    "@babel/plugin-transform-modules-commonjs"]
  });
  /* console.log(code); */
  //6.然后将目标code，重新写入文件，

  fs.writeFileSync(item, code);
});