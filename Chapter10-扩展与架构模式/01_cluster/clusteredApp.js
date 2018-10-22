"use strict";

const cluster = require('cluster');
const os = require('os');

// 这执行1次
if (cluster.isMaster) {
  console.log('-----111');
  // 获取cpu数目
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {  // [1]
    cluster.fork();
  }
}

// 这执行8次
else {
  console.log('-----222');
  require('./app');  // [2]
}
