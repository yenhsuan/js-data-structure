const privateProps = require('../utils/private-props');
const INIT_CAPICITY = 16;

class ArrayDeque {
  constructor(capacity=INIT_CAPICITY) {
    if (!Number.isSafeInteger(capacity) || capacity <= 0) {
      throw "Invalid initial capacity";
    }

    privateProps(this).init = (cap) => {
      privateProps(this).deque = Array(cap).fill(null);
      privateProps(this).front = 0;
      privateProps(this).rare = 0;
      privateProps(this).length = 0;
    }

    privateProps(this).init(capacity);
  }

  size() {
    return privateProps(this).length
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    privateProps(this).init(INIT_CAPICITY);
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return privateProps(this).deque[rare];
  }

  peekLeft() {
    if (this.isEmpty()) {
      return null;
    }

    return privateProps(this).deque[front];
  }

  push(elem) {

  }

  pop() {

  }

  pushLeft(elem) {

  }

  popLeft() {

  }
}

module.exports = ArrayDeque;
