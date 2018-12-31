const internal = require('../utils/private-props');
const ERR_MSG = require('../utils/errors');

class Stack {
    constructor() {
        internal(this).array = Array();
    }

    size() {
        return internal(this).array.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    push(elem) {
        if (typeof elem === 'undefined') {
            throw new Error(ERR_MSG.NO_ARGUMENT);
        }
        internal(this).array.push(elem);
    }a

    pop() {
        return this.isEmpty() ? null : internal(this).array.pop();
    }

    peek() {
        return this.isEmpty() ? null : internal(this).array[this.size()-1];
    }
}