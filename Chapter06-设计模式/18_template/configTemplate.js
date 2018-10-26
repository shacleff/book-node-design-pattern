"use strict";

const fs = require('fs');
const objectPath = require('object-path');

class ConfigTemplate {
  read(file) {
    console.log(`Deserializing from ${file}`);
    this.data = this._deserialize(fs.readFileSync(file, 'utf-8'));
  }

  save(file) {
    console.log(`Serializing to ${file}`);
    fs.writeFileSync(file, this._serialize(this.data));
  }

  get(path) {
    return objectPath.get(this.data, path);
  }

  set(path, value) {
    return objectPath.set(this.data, path, value);
  }

  // 序列化写入数据
  _serialize() {
    throw new Error('_serialize() must be implemented');
  }

  // 反序列化得到数据
  _deserialize() {
    throw new Error('_deserialize() must be implemented');
  }
}

module.exports = ConfigTemplate;
