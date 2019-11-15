"use strict";

// 用const导入模块更保险,避免又变为引用其他模块
const path = require('path');

// .. do stuff with the path module

var path = './some/path'; // this will fail

/**
 var path = './some/path'; // this will fail
 ^

 SyntaxError: Identifier 'path' has already been declared
 at createScript (vm.js:80:10)
 at Object.runInThisContext (vm.js:139:10)
 at Module._compile (module.js:617:28)
 at Object.Module._extensions..js (module.js:664:10)
 at Module.load (module.js:566:32)
 at tryModuleLoad (module.js:506:12)
 at Function.Module._load (module.js:498:3)
 at Function.Module.runMain (module.js:694:10)
 at startup (bootstrap_node.js:204:16)
 at bootstrap_node.js:625:3
 */