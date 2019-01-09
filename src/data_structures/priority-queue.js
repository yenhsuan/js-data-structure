const ERR_MSG = require('../utils/errors');
const Heap = require('./heap');

class PriorityQueue extends Heap {
  constructor(cmp) {
    if (typeof cmp === 'undefined') {
      throw new TypeError(ERR_MSG.NO_COMPARATOR);
    }
    super(cmp);
  }
}

module.exports = PriorityQueue;
