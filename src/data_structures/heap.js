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

    let parent = parentIdx(idx);
    let cur = idx;

    while (parent !== undefined) {
      const curVal = internal(this).elems[cur];
      const parentVal = internal(this).elems[parent];

      if (internal(this).cmp(curVal, parentVal) < 0) {
        privateMethods.swap.apply(this, [cur, parent]);
        cur = parent;
        parent = parentIdx(idx);
      } else {
        break;
      }
    }
  },
  siftDown: function moveElememtDownInHeap(idx) {
    if (idx > internal(this).elems.length - 1) {
      return;
    }

    let cur = idx;
    let left = leftChildIdx(cur, internal(this).length);
    let right = rightChildIdx(cur, internal(this).length);

    while ((left !== undefined) || (right !== undefined)) {
      const curVal = internal(this).elems[cur];
      const leftVal = internal(this).elems[left];
      const rightVal = internal(this).elems[right];

      if (left !== undefined && internal(this).cmp(curVal, leftVal) > 0) {
        privateMethods.swap.apply(this, [cur, left]);
        cur = left;
      } else if (right !== undefined && internal(this).cmp(curVal, rightVal) > 0) {
        privateMethods.swap.apply(this, [cur, right]);
        cur = right;
      } else {
        break;
      }

      left = leftChildIdx(cur, internal(this).length);
      right = rightChildIdx(cur, internal(this).length);
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
