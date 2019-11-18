"use strict";

const glob = require('glob');

glob('data/*.txt', (error, files) => console.log(`All files found: ${JSON.stringify(files)}`))
    .on('match', match => console.log(`Match found: ${match}`));

/**
 Match found: data/file1.txt
 Match found: data/file2.txt
 Match found: data/file3.txt
 All files found: ["data/file1.txt","data/file2.txt","data/file3.txt"]
 */
