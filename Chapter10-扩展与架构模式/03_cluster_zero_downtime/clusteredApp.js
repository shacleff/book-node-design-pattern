"use strict";

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // 检测到一个进程挂了，重新启动一个新的进程
  cluster.on('exit', (worker, code) => {
    if (code != 0 && !worker.exitedAfterDisconnect) {
      console.log('Worker crashed. Starting a new worker');
      cluster.fork();
    }
  });

  // 这个没触发...
  process.on('SIGUSR2', () => {
    console.log('Restarting workers');
    const workers = Object.keys(cluster.workers);

    function restartWorker(i) {

      if (i >= workers.length) {
        return;
      }
      const worker = cluster.workers[workers[i]];
      console.log(`Stopping worker: ${worker.process.pid}`);
      worker.disconnect();

      worker.on('exit', () => {

        // 还存活的直接返回，但是前面已经disconnect了，应该不会还没自杀吧
        if (!worker.suicide) {
          return;
        }
        const newWorker = cluster.fork();
        newWorker.on('listening', () => {
          restartWorker(i + 1);
        });
      });
    }
    restartWorker(0);
  });
} else {
  require('./app');
}


/**
➜  ~ kill -SIGUSR2 12324
Started 12323
Started 12321
Started 12326
Started 12325
Started 12320
Started 12322
Started 12324
Started 12327
Worker crashed. Starting a new worker
Started 12644
Worker crashed. Starting a new worker
Started 12657


还可以一下干掉多个进程
➜  ~ kill -SIGUSR2 12992 12995
 */