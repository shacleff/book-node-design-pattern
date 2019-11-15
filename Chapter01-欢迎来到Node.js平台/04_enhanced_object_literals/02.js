"use strict";

module.exports = {
    square(x) {
        return x * x;
    },
    cube(x) {
        return x * x * x;
    }
};

console.log(module.exports);

/**
 { square: [Function: square], cube: [Function: cube] }
 */