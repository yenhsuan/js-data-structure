const internal = require('../utils/private-props');
const ERR_MSG = require('../utils/errors');

/* helpers */
const defaultComparator = (self, other) => {
  if (self === other) {
    return 0;
  }
  return self > other ? 1 : -1;
};

const parentIdx = (idx) => {
  if (idx === 0) {
    return undefined;
  }
  return Math.floor((idx - 1) / 2);
};

const leftChildIdx = (idx, len) => {
  if (idx > len - 1) {
    return undefined;
  }
  return idx * 2 + 1;
};

const rightChildIdx = (idx, len) => {
  if (idx > len - 1) {
    return undefined;
  }
  return idx * 2 + 2;
};

/* private methods */
const privateMethods = {
  siftUp: function moveElememtUpInHeap(idx) {
    if (idx === 0) {
      return;
    }

    let parent = parentIdx(idx);
    let child = idx;

    while (parent !== undefined && internal(this).cmp(child, parent) < 0) {
      privateMethods.swap(child, parent);
      child = parent;
      parent = parentIdx(idx);
    }
  },
  siftDown: function moveElememtDownInHeap(idx) {
    if (idx > internal(this).elems.length - 1) {
      return;
    }

    let parent = idx;
    let left = leftChildIdx(parent, internal(this).length);
    let right = rightChildIdx(parent, internal(this).length);

    while ((left !== undefined) || (right !== undefined)) {
      if (left !== undefined && internal(this).cmp(parent, left) > 0) {
        privateMethods.swap(parent, left).apply(this);
        parent = left;
      } else if (right !== undefined && internal(this).cmp(parent, right) > 0) {
        privateMethods.swap(parent, right).apply(this);
        parent = right;
      } else {
        break;
      }

      left = leftChildIdx(parent, internal(this).length);
      right = rightChildIdx(parent, internal(this).length);
    }
  },
  swap: function swapTwoNodeInHeap(selfIdx, otherIdx) {
    const temp = internal(this).elems[selfIdx];
    internal(this).elems[selfIdx] = internal(this).elems[otherIdx];
    internal(this).elems[otherIdx] = temp;
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
