"use strict";

const path = require('path');
const utilities = require('./utilities');
const TaskQueue = require('./taskQueue');
const request = utilities.promisify(require('request'));
const fs = require('fs');
const mkdirp = utilities.promisify(require('mkdirp'));
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

// 最大容纳任务数量是2
let downloadQueue = new TaskQueue(2);

// 
function spiderLinks(currentUrl, body, nesting) {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = utilities.getPageLinks(currentUrl, body);


  /**
   * we need the following because the Promise we create next
   * will never settle if there are no tasks to process
   */
  if (links.length === 0) {
    return Promise.resolve();
  }

  // 
  return new Promise((resolve, reject) => {

    // 已经完成的任务数量
    let completed = 0;

    // 是否发生了错误
    let errored = false;

    // 
    links.forEach(link => {

      // 
      let task = () => {
        return spider(link, nesting - 1)
          .then(() => {

            // 
            if (++completed === links.length) {
              resolve();
            }

          })
          .catch(() => {
            if (!errored) {
              errored = true;
              reject();
            }
          })
          ;
      };

      // 
      downloadQueue.pushTask(task);

    });
  });
}

// 
function download(url, filename) {
  console.log(`Downloading ${url}`);
  let body;
  return request(url)
    .then(response => {
      body = response.body;
      return mkdirp(path.dirname(filename));
    })
    .then(() => writeFile(filename, body))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return body;
    })
    ;
}

// 
const spidering = new Map();

// 
function spider(url, nesting) {

  // 已经有这个下载任务了，避免重复
  if (spidering.has(url)) {
    return Promise.resolve();
  }

  // 添加一个新的url
  spidering.set(url, true);

  let filename = utilities.urlToFilename(url);

  // 
  return readFile(filename, 'utf8')
    .then(
      body => spiderLinks(url, body, nesting),
      err => {
        if (err.code !== 'ENOENT') {
          throw err;
        }

        return download(url, filename)
          .then(body => spiderLinks(url, body, nesting))
          ;
      }
    )
    ;
}

// 
spider(process.argv[2], 1)
  .then(() => console.log('Download complete'))
  .catch(err => console.log(err))
  ;
