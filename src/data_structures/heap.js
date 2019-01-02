const internal = require('../utils/private-props');
const ERR_MSG = require('../utils/errors');

const defaultComparator = (self, other) => {
  if (self === other) {
    return 0;
  }

  return self > other ? 1 : -1;
};

const privateMethods = {
  siftUp: function moveElememtUpInHeap() {

  },
  siftDown: function moveElememtDownInHeap() {

  },
};

class Heap {
  constructor(cmp = defaultComparator) {
    internal(this).cmp = cmp;
    internal(this).elems = [];
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return internal(this).elems[0];
  }

  push(elem) {
    if (typeof elem === 'undefined') {
      throw new TypeError(ERR_MSG.NO_ARGUMENT);
    }
    internal(this).elems.push(elem);
    privateMethods.siftUp.apply(this);
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    const first = this.peek();
    const last = internal(this.elems).pop();

    if (first === last) {
      return first;
    }

    internal(this.elems)[0] = last;
    privateMethods.siftDown.apply(this);
    return first;
  }

  size() {
    return internal(this).elems.length;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

module.exports = Heap;
