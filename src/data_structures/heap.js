const internal = require('../utils/private-props');
const ERR_MSG = require('../utils/errors');

/* helpers */
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

    const { elems, cmp } = internal(this);
    let parent = parentIdx(idx);
    let cur = idx;

    while (parent !== undefined && cmp(elems[cur], elems[parent]) < 0) {
      privateMethods.swap.apply(this, [cur, parent]);
      cur = parent;
      parent = parentIdx(idx);
    }
  },
  siftDown: function moveElememtDownInHeap(idx) {
    if (idx > this.size() - 1) {
      return;
    }

    const { elems, cmp } = internal(this);
    let cur = idx;
    let left = leftChildIdx(cur, this.size());
    let right = rightChildIdx(cur, this.size());

    while ((left !== undefined) || (right !== undefined)) {
      if (left !== undefined && cmp(elems[cur], elems[left]) > 0) {
        privateMethods.swap.apply(this, [cur, left]);
        cur = left;
      } else if (right !== undefined && cmp(elems[cur], elems[right]) > 0) {
        privateMethods.swap.apply(this, [cur, right]);
        cur = right;
      } else {
        break;
      }

      left = leftChildIdx(cur, this.size());
      right = rightChildIdx(cur, this.size());
    }
  },
  swap: function swapTwoNodeInHeap(selfIdx, otherIdx) {
    const temp = internal(this).elems[selfIdx];
    internal(this).elems[selfIdx] = internal(this).elems[otherIdx];
    internal(this).elems[otherIdx] = temp;
  },
};

class Heap {
  constructor(cmp) {
    if (cmp === undefined) {
      throw new TypeError(ERR_MSG.NO_COMPARATOR);
    }

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
    privateMethods.siftUp.apply(this, [this.size() - 1]);
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    const first = this.peek();
    const last = internal(this).elems.pop();

    if (first === last) {
      return first;
    }

    internal(this).elems[0] = last;
    privateMethods.siftDown.apply(this, [0]);
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
