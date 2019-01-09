const ERR_MSG = require('../utils/errors');
const Heap = require('./heap');

const cmp = (self, other) => self - other;

class MinHeap extends Heap {
  constructor() {
    super(cmp);
  }

  push(elem) {
    if (typeof elem !== 'number') {
      throw new TypeError(ERR_MSG.NOT_NUMBER);
    }
    super.push(elem);
  }
}

module.exports = MinHeap;
