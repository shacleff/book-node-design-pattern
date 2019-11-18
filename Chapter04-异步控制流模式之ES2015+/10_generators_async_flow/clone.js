"use strict";

const fs = require('fs');
const path = require('path');

// 异步工作流
function asyncFlow(generatorFunction) {

  function callback(err) {
    if (err) {
      return generator.throw(err);
    }
    const results = [].slice.call(arguments, 1);

    generator.next(results.length > 1 ? results : results[0]);
  }

  const generator = generatorFunction(callback);
  generator.next();
}

asyncFlow(function* (callback) {
  const fileName = path.basename(__filename);

  // 先读取这个文件
  const myself = yield fs.readFile(fileName, 'utf8', callback);

  // 读取完后创建一个新的文件, 并将读取到的文件内容写入进去
  yield fs.writeFile(`clone_of_${fileName}`, myself, callback);

  console.log('Clone created');
});
