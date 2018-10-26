"use strict";

const request = require('request');
const util = require('util');

//The target
const statusUpdateService = {
  statusUpdates: {},
  sendUpdate: function (status) {
    console.log('Status sent: ' + status);
    let id = Math.floor(Math.random() * 1000000);
    statusUpdateService.statusUpdates[id] = status;
    return id;
  },

  destroyUpdate: id => {
    console.log('Status removed: ' + id);
    delete statusUpdateService.statusUpdates[id];
  }
};

//The Command
function createSendStatusCmd(service, status) {
  let postId = null;

  const command = () => {
    postId = service.sendUpdate(status);
  };

  command.undo = () => {
    if (postId) {
      service.destroyUpdate(postId);
      postId = null;
    }
  };

  // 序列化为json
  command.serialize = () => {
    return { type: 'status', action: 'post', status: status };
  };

  return command;
}

/**
 * The Invoker
 */
class Invoker {
  constructor() {
    this.history = [];
  }

  // 运行一条命令
  run(cmd) {

    // 记入历史命令记录
    this.history.push(cmd);

    // 执行这条命令
    cmd();
    console.log('Command executed', cmd.serialize());
  }

  // 延迟执行一条命令
  delay(cmd, delay) {
    setTimeout(() => {
      this.run(cmd);
    }, delay)
  }

  // 撤销一条命令
  undo() {

    // 命令弹出
    const cmd = this.history.pop();

    // 撤销
    cmd.undo();
    console.log('Command undone', cmd.serialize());
  }

  // 运行远程的命令
  runRemotely(cmd) {
    request.post('http://localhost:3000/cmd',
      { json: cmd.serialize() },  //将命令序列化后传输到指定地址
      err => {
        console.log('Command executed remotely', cmd.serialize());
      }
    );
  }
}

//The Client code
const invoker = new Invoker();
const command = createSendStatusCmd(statusUpdateService, 'HI!');
invoker.run(command);
invoker.delay(command, 1000 * 60 * 60);
invoker.undo();
invoker.runRemotely(command);
