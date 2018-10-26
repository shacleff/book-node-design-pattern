"use strict";

function createProxy(subject) {
  const helloOrig = subject.hello;

  //  call方法调用 
  subject.hello = () => (helloOrig.call(this) + ' world!');

  return subject;
}


module.exports = createProxy;
