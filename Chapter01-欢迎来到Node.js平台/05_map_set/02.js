"use strict";

const tests = new Map();
tests.set(() => 2+2, 4);
tests.set(() => 2*2, 4);
tests.set(() => 2/2, 1);

for (let entry of tests) {
  console.log((entry[0]() === entry[1]) ? 'PASS' : 'FAIL');
}


let a = {}

// es6 对象可以作为key
tests.set(a, 1);
tests.set({c:1}, 2);

console.log(tests);
console.log(tests.get(a));

/**
 PASS
 PASS
 PASS
 Map {
  [Function] => 4,
  [Function] => 4,
  [Function] => 1,
  {} => 1,
  { c: 1 } => 2 }
 1
 */