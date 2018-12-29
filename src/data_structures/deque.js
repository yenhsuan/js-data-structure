const internal = require('../utils/private-props');

const INIT_CAPACITY = 8;
const MINIMUN_CAPACITY = 2;

class ArrayDeque {
  constructor(capacity = INIT_CAPACITY) {
    if (!Number.isSafeInteger(capacity) || capacity <= 0) {
      throw new Error('Invalid capacity value');
    }

    const cap = (capacity < MINIMUN_CAPACITY) ? MINIMUN_CAPACITY : capacity;
    internal(this).deque = Array(cap).fill(null);
    internal(this).front = 0;
    internal(this).rare = 0;
    internal(this).length = 0;
    internal(this).resize = () => {
      const size = internal(this).deque.length * 2;
      const deque = Array(size).fill(null);
      const { rare } = internal(this);
      let { front } = internal(this);
      let idx = 0;

      while (front !== rare) {
        deque[idx] = internal(this).deque[front];
        front = (front + 1) % size;
        idx += 1;
      }

      internal(this).front = 0;
      internal(this).rare = idx - 1;
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
    internal(this).rare = 0;
    internal(this).length = 0;
  }

  peek() {
    return this.isEmpty() ? null : internal(this).deque[internal(this).rare];
  }

  peekFront() {
    return this.isEmpty() ? null : internal(this).deque[internal(this).front];
  }

  push(elem) {
    if (typeof elem === 'undefined') {
      throw new Error('No argument found');
    }

    if (this.isEmpty()) {
      internal(this).deque[internal(this).rare] = elem;
      internal(this).length += 1;
      return;
    }

    if (this.size() === internal(this).deque.length) {
      internal(this).resize();
    }

    internal(this).rare = (internal(this).rare + 1) % internal(this).deque.length;
    internal(this).deque[internal(this).rare] = elem;
    internal(this).length += 1;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const rarePrev = internal(this).rare;
    internal(this).rare = (
      internal(this).rare + internal(this).deque.length - 1
    ) % internal(this).deque.length;

    internal(this).length -= 1;
    return internal(this).deque[rarePrev];
  }

  pushFront(elem) {
    if (typeof elem === 'undefined') {
      throw new Error('No argument found');
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

    const rareFront = internal(this).front;
    internal(this).front = (internal(this).front + 1) % internal(this).deque.length;
    internal(this).length -= 1;
    return internal(this).deque[rareFront];
  }
}

module.exports = ArrayDeque;
