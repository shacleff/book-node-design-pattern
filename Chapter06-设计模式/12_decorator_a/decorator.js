"use strict";

function decorate(component) {

  // 
  const proto = Object.getPrototypeOf(component);

  function Decorator(component) {
    this.component = component;
  }

  // 在proto基础上扩展
  Decorator.prototype = Object.create(proto);

  /**
   * new method
   */
  Decorator.prototype.greetings = function () {
    return 'Hi!';
  };

  //delegated method
  Decorator.prototype.hello = function () {

    // 
    return this.component.hello.apply(this.component, arguments);
  };

  return new Decorator(component);
}

/**
 * 待装饰的类
 */
class Greeter {
  hello(subject) {
    return `Hello ${subject}`;
  }
}

// test
const decoratedGreeter = decorate(new Greeter());
console.log(decoratedGreeter.hello('world'));     // uses original method
console.log(decoratedGreeter.greetings());        // uses new method
