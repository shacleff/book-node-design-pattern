"use strict";

// let 让i除了作用域就消失了
for (let i = 0; i < 10; i++) {
    // do something here
}
console.log(i); // ReferenceError: i is not defined

/**
 console.log(i); // ReferenceError: i is not defined
 ^

 ReferenceError: i is not defined
 at Object.<anonymous> (/Users/jianan/Documents/other/book-node-design-pattern/Chapter01-欢迎来到Node.js平台/02_let_const/02.js:6:13)
 at Module._compile (module.js:653:30)
 at Object.Module._extensions..js (module.js:664:10)
 at Module.load (module.js:566:32)
 at tryModuleLoad (module.js:506:12)
 at Function.Module._load (module.js:498:3)
 at Function.Module.runMain (module.js:694:10)
 at startup (bootstrap_node.js:204:16)
 at bootstrap_node.js:625:3
 */