"use strict";

const ini = require('ini');

// json编解码策略
module.exports.json = {
  deserialize: data => JSON.parse(data),
  serialize: data => JSON.stringify(data, null, '  ')
};

// ini编解码策略
module.exports.ini = {
  deserialize: data => ini.parse(data),
  serialize: data => ini.stringify(data)
};
