"use strict";

// 引入promise话函数
const promisify = require('./promisify.js');

// 待promise函数
const delayedDivision = (dividend, divisor, cb) => {

    // 1s 后执行一个函数
    setTimeout(() => {
        if (
            typeof dividend !== 'number' ||
            typeof divisor !== 'number' ||
            divisor === 0
        ) {

            // 参数错误，第一个抛出异常
            cb(new Error('Invalid operands'));
        }

        /**
         * 没有错误，第一个参数传递null
         */
        cb(null, dividend / divisor);
    }, 1000);
};


const promisifiedDivision = promisify(delayedDivision);

// 正常传递参数
promisifiedDivision(10, 2)
    .then((value) => console.log(value)) // 5
    .catch((error) => console.log(error));

// 第2个参数传递的有问题
promisifiedDivision(10, 0)
    .then((value) => console.log(value))
    .catch((error) => console.log(error));  // 异常报错

const delayedMultiDivision = (numA, numB, numC, cb) => {
    setTimeout(() => {
        cb(null, numA / 2, numB / 2, numC / 2);
    }, 1000);
};

const promisifiedMultiDivision = promisify(delayedMultiDivision);

promisifiedMultiDivision(7, 12, 542)
    .then((value) => console.log(value))  // [ 3.5, 6, 271 ]
    .catch((error) => console.log(error));


/**
 5
 [ 3.5, 6, 271 ]
 Error: Invalid operands
 at Timeout.setTimeout [as _onTimeout] (/Users/jianan/Documents/Core/NodeDesignPattern/Chapter04/01_promisify/test.js:18:10)
 at ontimeout (timers.js:498:11)
 at tryOnTimeout (timers.js:323:5)
 at Timer.listOnTimeout (timers.js:290:5)
 */