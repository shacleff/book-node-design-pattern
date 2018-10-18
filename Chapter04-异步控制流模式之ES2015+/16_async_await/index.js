"use strict";

const request = require('request');

function getPageHtml(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      resolve(body);
    });
  });
}

async function main() {
  // const html = await getPageHtml('http://google.com');
  const html = await getPageHtml('http://www.baidu.com');
  console.log(html); //输出这个网页的内容
}

main();
console.log('Loading...');
