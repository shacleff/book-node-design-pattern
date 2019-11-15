"use strict";

function DelayedGreeter(name) {
    this.name = name;
}

DelayedGreeter.prototype.greet = function () {
    // 箭头函数this
    setTimeout(() => console.log('Hello ' + this.name), 500);
};

var greeter = new DelayedGreeter('World');
greeter.greet(); // will print “Hello World”

/**
 Hello World
 */