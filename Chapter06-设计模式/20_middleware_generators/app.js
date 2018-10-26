"use strict";

const app = require('koa')();

// 添加一个限制用户登录频率限制的中间件
app.use(require('./rateLimit'));

app.use(function *(){
  this.body = {"now": new Date()};
});

app.listen(3000);