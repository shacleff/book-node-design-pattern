"use strict";

let person = {
    name: 'George',
    surname: 'Boole',

    get fullname() {
        return this.name + ' ' + this.surname;
    },

    // xx.fullname = xxx 时被调用
    set fullname(fullname) {
        let parts = fullname.split(' ');
        this.name = parts[0];
        this.surname = parts[1];
    }
};

console.log(person.fullname); // "George Boole"
console.log(person.fullname = 'Alan Turing'); // "Alan Turing"
console.log(person.name); // "Alan"

/**
 George Boole
 Alan Turing
 Alan
 */