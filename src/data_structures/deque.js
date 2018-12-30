const internal = require('../utils/private-props');
const ERR_MSG = require('../utils/errors');

const INIT_CAPACITY = 8;
const MINIMUN_CAPACITY = 2;

class ArrayDeque {
  constructor(capacity = INIT_CAPACITY) {
    if (!Number.isSafeInteger(capacity) || capacity <= 0) {
      throw new Error(ERR_MSG.CAPACITY);
    }

    const cap = (capacity < MINIMUN_CAPACITY) ? MINIMUN_CAPACITY : capacity;
    internal(this).deque = Array(cap).fill(null);
    internal(this).front = 0;
    internal(this).rear = 0;
    internal(this).length = 0;
    internal(this).resize = () => {
      const size = internal(this).deque.length * 2;
      const deque = Array(size).fill(null);
      const { rear } = internal(this);
      let { front } = internal(this);
      let idx = 0;

      while (front !== rear) {
        deque[idx] = internal(this).deque[front];
        front = (front + 1) % this.size();
        idx += 1;
      }

      deque[idx] = internal(this).deque[rear];
      internal(this).front = 0;
      internal(this).rear = idx;
      internal(this).deque = deque;
    };
  }

  size() {
    return internal(this).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    internal(this).deque = Array(INIT_CAPACITY).fill(null);
    internal(this).front = 0;
    internal(this).rear = 0;
    internal(this).length = 0;
  }

  peek() {
    return this.isEmpty() ? null : internal(this).deque[internal(this).rear];
  }

  peekFront() {
    return this.isEmpty() ? null : internal(this).deque[internal(this).front];
  }

  push(elem) {
    if (typeof elem === 'undefined') {
      throw new Error(ERR_MSG.NO_ARGUMENT);
    }

    if (this.isEmpty()) {
      internal(this).deque[internal(this).rear] = elem;
      internal(this).length += 1;
      return;
    }

    if (this.size() === internal(this).deque.length) {
      internal(this).resize();
    }

    internal(this).rear = (internal(this).rear + 1) % internal(this).deque.length;
    internal(this).deque[internal(this).rear] = elem;
    internal(this).length += 1;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const rearPrev = internal(this).rear;
    internal(this).rear = (
      internal(this).rear + internal(this).deque.length - 1
    ) % internal(this).deque.length;

    internal(this).length -= 1;
    return internal(this).deque[rearPrev];
  }

  pushFront(elem) {
    if (typeof elem === 'undefined') {
      throw new Error(ERR_MSG.NO_ARGUMENT);
    }

    if (this.isEmpty()) {
      internal(this).deque[internal(this).front] = elem;
      internal(this).length += 1;
      return;
    }

    if (this.size() === internal(this).deque.length) {
      internal(this).resize();
    }

    internal(this).front = (
      internal(this).front + internal(this).deque.length - 1
    ) % internal(this).deque.length;

    internal(this).deque[internal(this).front] = elem;
    internal(this).length += 1;
  }

  popFront() {
    if (this.isEmpty()) {
      return null;
    }

    const prevFront = internal(this).front;
    internal(this).front = (internal(this).front + 1) % internal(this).deque.length;
    internal(this).length -= 1;
    return internal(this).deque[prevFront];
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    const { front, rear } = internal(this);
    const temp = [];

    let iterator = front;
    while (iterator !== rear) {
      temp.push(internal(this).deque[iterator]);
      iterator = (iterator + 1) % this.size();
    }
    temp.push(this.peek());
    return temp.toString();
  }
}

module.exports = ArrayDeque;
