"use strict";

const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

// 等待有人通过http协议传递过来文件
const server = http.createServer((req, res) => {
    const filename = req.headers.filename;
    console.log('File request received: ' + filename);
    req.pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(filename))
        .on('finish', () => {
            res.writeHead(201, {'Content-Type': 'text/plain'});
            res.end('That\'s it\n');
            console.log(`File saved: ${filename}`);
        });
});

server.listen(3000, () => console.log('Listening'));