"use strict";

const OfflineState = require('./offlineState');
const OnlineState = require('./onlineState');

class FailsafeSocket {
  constructor(options) {                      //[1]
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null;

    // 所有状态
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    };

    // 初始状态
    this.changeState('offline');
  }

  // 切换状态
  changeState(state) {                         //[2]
    console.log('Activating state: ' + state);
    this.currentState = this.states[state];
    this.currentState.activate();
  }

  // 
  send(data) {                                 //[3]
    this.currentState.send(data);
  }
}


// 导出接口
module.exports = options => {
  return new FailsafeSocket(options);
};
