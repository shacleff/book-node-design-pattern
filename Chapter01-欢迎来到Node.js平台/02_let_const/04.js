"use strict";

const x = {};

// const变量的内部的值还可以更改, 整体引用不可以更改
x.name = 'John'; // This is allowed
//x = null; // This will fail