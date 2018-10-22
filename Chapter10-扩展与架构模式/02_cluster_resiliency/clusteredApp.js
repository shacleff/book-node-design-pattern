"use strict";

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // 监听到退出了
  cluster.on('exit', (worker, code) => {
    if (code != 0) {
      console.log('Worker crashed. Starting a new worker');

      // 立马再次重启一个, 这样保证服务可以不间断执行
      cluster.fork();
    }
  });
} else {
  require('./app');
}
