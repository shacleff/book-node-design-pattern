"use strict";

const jot = require('json-over-tcp');         //[1]

/**
 * 离线状态
 */
module.exports = class OfflineState {

  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {     //[2]
    this.failsafeSocket.queue.push(data);
  }

  activate() {     //[3]
    const retry = () => {
      setTimeout(() => this.activate(), 500);
    };

    // 每一段间隔就进行尝试连接，连接上了，则进入在线状态
    this.failsafeSocket.socket = jot.connect(
      this.failsafeSocket.options,
      () => {
        this.failsafeSocket.socket.removeListener('error', retry);
        this.failsafeSocket.changeState('online');
      }
    );
    this.failsafeSocket.socket.once('error', retry);
  }
};
