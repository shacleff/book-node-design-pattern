"use strict";

const utilities = require('./utilities');
const path = require('path');
const request = utilities.promisify(require('request'));
const fs = require('fs');
const mkdirp = utilities.promisify(require('mkdirp'));
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

function spiderLinks(currentUrl, body, nesting) {
  let promise = Promise.resolve();

  if (nesting === 0) {
    return promise;
  }

  const links = utilities.getPageLinks(currentUrl, body);

  links.forEach(link => {
    promise = promise.then(() => spider(link, nesting - 1));
  });

  return promise;
}

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

function spider(url, nesting) {
  let filename = utilities.urlToFilename(url);

  console.log('filename:' + filename);

  return readFile(filename, 'utf8')
    .then(
      (body) => (spiderLinks(url, body, nesting)),
      (err) => {
        if (err.code !== 'ENOENT') {
          throw err;
        }

        return download(url, filename)
          .then(body => spiderLinks(url, body, nesting));
      }
    );
}

/**
 * node index.js "http://www.baidu.com"
 * 这样process.argv[2] 这样就把第二个参数传递过去了
 */
spider(process.argv[2], 1)
  .then(() => console.log('Download complete'))
  .catch(err => console.log(err))
  ;

/**
filename:www.baidu.com.html
Downloading http://www.baidu.com
Downloaded and saved: http://www.baidu.com
filename:www.baidu.com/gaoji/preferenceshtml.html
Downloading http://www.baidu.com/gaoji/preferences.html
Downloaded and saved: http://www.baidu.com/gaoji/preferences.html
filename:www.baidu.com.html
filename:www.baidu.com.html
filename:www.baidu.com/more.html
Downloading http://www.baidu.com/more/
Downloaded and saved: http://www.baidu.com/more/
filename:www.baidu.com/gaoji/preferenceshtml.html
filename:www.baidu.com/more.html
filename:www.baidu.com/more.html
filename:www.baidu.com.html
filename:www.baidu.com/cache/sethelp/indexhtml.html
Downloading http://www.baidu.com/cache/sethelp/index.html
Downloaded and saved: http://www.baidu.com/cache/sethelp/index.html
filename:www.baidu.com/duty.html
Downloading http://www.baidu.com/duty/
Downloaded and saved: http://www.baidu.com/duty/
Download complete
*/