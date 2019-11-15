"use strict";

if (false) {

    // let 是node中的块作用域,在外面访问不到
    let x = "hello";
}
console.log(x); // ReferenceError: x is not defined

/**
 console.log(x); // ReferenceError: x is not defined
 ^

 ReferenceError: x is not defined
 at Object.<anonymous> (/Users/jianan/Documents/other/book-node-design-pattern/Chapter01-欢迎来到Node.js平台/02_let_const/01.js:6:13)
 at Module._compile (module.js:653:30)
 at Object.Module._extensions..js (module.js:664:10)
 at Module.load (module.js:566:32)
 at tryModuleLoad (module.js:506:12)
 at Function.Module._load (module.js:498:3)
 at Function.Module.runMain (module.js:694:10)
 at startup (bootstrap_node.js:204:16)
 at bootstrap_node.js:625:3

 Process finished with exit code 1
 */