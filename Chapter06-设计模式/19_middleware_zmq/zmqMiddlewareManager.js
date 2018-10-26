"use strict";

/**
 * 中间件管理类
 */
module.exports = class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket;
    this.inboundMiddleware = [];           //[1]
    this.outboundMiddleware = [];
    socket.on('message', message => {       //[2]
      this.executeMiddleware(this.inboundMiddleware, {
        data: message
      });
    });
  }

  send(data) {
    const message = {
      data: data
    };

    this.executeMiddleware(this.outboundMiddleware, message,
      () => {
        this.socket.send(message.data);
      }
    );
  }

  // 
  use(middleware) {

    // 
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound);
    }

    // 
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound);
    }
  }

  /**
   * 执行中间件
   * @param {*} middleware 中间件arr数组
   * @param {*} arg        传递每个中间件都需要处理的参数
   * @param {*} finish     遍历完毕中间件后的回调
   */
  executeMiddleware(middleware, arg, finish) {

    // 迭代器模式，遍历所有中间件
    function iterator(index) {

      // 遍历完毕所有中间件
      if (index === middleware.length) {
        return finish && finish();
      }

      // 
      middleware[index].call(this, arg, err => {
        if (err) {
          return console.log('There was an error: ' + err.message);
        }
        iterator.call(this, ++index);
      });
    }

    // 
    iterator.call(this, 0);
  }
};
