import { moduleExpression } from "@babel/types"

//1.es module
export default{
    a:"123"
}
// import test from "./test" //引入


//2.commonjs 
/* let test = require("./test").default //引入 */

//3.umd module
//以上两种都可以
/* let test = require("./test").default
import test from "./test" */