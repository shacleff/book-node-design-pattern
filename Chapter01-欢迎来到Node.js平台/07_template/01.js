"use strict";

const name = "Leonardo";
const interests = ["arts", "architecture", "science", "music", "mathematics"];
const birth = {year: 1452, place: 'Florence'};

// 可换行的模板字符串
const text = `${name} was an Italian polymath interested in many topics such
as ${interests.join(', ')}.
He was born in ${birth.year} in ${birth.place}.`;
console.log(text);