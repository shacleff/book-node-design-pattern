"use strict";

const fs = require('fs');

function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        let parsed;
        if (err)
        //propagate the error and exit the current function
            return callback(err);

        try {
            //parse the file contents
            parsed = JSON.parse(data);
        } catch (err) {
            //catch parsing errors
            return callback(err);
        }
        //no errors, propagate just the data
        callback(null, parsed);
    });
}

let cb = (err, data) => {
    if (err) {
        return console.error(err);
    }

    console.log(data)
};

readJSON('valid_json.json', cb); // dumps the content
readJSON('invalid_json.json', cb); // prints error (SyntaxError)

/**
 SyntaxError: Unexpected token h in JSON at position 1
 at JSON.parse (<anonymous>)
 at fs.readFile (/Users/jianan/Documents/other/book-node-design-pattern/Chapter02-Node.js基础设计模式/07_callback_propagating_errors/readJSON.js:14:27)
 at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:511:3)
 { hello: 'world' }
 */