"use strict";

const WebSocketServer = require('ws').Server;

// 需要启动redis服务端
const redis = require("redis");

// redis订阅者
const redisSub = redis.createClient();

// redis发布者
const redisPub = redis.createClient();

//static file server
const server = require('http').createServer(
  require('ecstatic')({ root: `${__dirname}/www` })
);

const wss = new WebSocketServer({ server: server });
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);

    // 发布消息
    redisPub.publish('chat_messages', msg);
  });
});

// 订阅消息
redisSub.subscribe('chat_messages');

/**
 * channel unused
 * msg     订阅后收到的消息
 */
redisSub.on('message', (channel, msg) => {
  wss.clients.forEach((client) => {
    client.send(msg);
  });
});

// 
server.listen(process.argv[2] || 8080);
