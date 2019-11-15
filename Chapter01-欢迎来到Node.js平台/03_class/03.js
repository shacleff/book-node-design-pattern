"use strict";

class Person {
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName() {
        return this.name + ' ' + this.surname;
    }

    static older(person1, person2) {
        return (person1.age >= person2.age) ? person1 : person2;
    }
}

// es6继承有extends关键字
class PersonWithMiddlename extends Person {
    // 有构造函数, 且只能由1个构造函数
    constructor(name, middlename, surname, age) {
        //
        super(name, surname, age);
        this.middlename = middlename;
    }

    getFullName() {
        return this.name + ' ' + this.middlename + ' ' + this.surname;
    }
}

const alan = new PersonWithMiddlename('Alan', 'Mathison', 'Turing', 104);
console.log(alan.getFullName());

/**
 constructor(name, middlename, surname, age) {
    ^^^^^^^^^^^

SyntaxError: A class may only have one constructor
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:617:28)
    at Object.Module._extensions..js (module.js:664:10)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Function.Module.runMain (module.js:694:10)
    at startup (bootstrap_node.js:204:16)
    at bootstrap_node.js:625:3
 */