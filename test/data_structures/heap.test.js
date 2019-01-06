const should = require('should');
const Heap = require('../../src/data_structures/heap');
const ERR_MSG = require('../../src/utils/errors');

describe('# Heap', () => {
  const cmp = (self, other) => self - other;

  describe('constructor', () => {
    it('should be empty after initialized', () => {
      const heap = new Heap(cmp);
      heap.size().should.be.equal(0);
      heap.isEmpty().should.be.True();
      should(heap.pop()).be.Undefined();
      should(heap.peek()).be.Undefined();
    });
  });

  describe('push/pop/peek', () => {
    it('should throw error if no argument given (push)', () => {
      (() => new Heap(cmp).push()).should.throw(ERR_MSG.NO_ARGUMENT);
    });

    it('should be able to push/pop/peek elements accroding to comparator', () => {
      const heap = new Heap(cmp);
      const testData = [9, 0, 1, 3, 2, 4, 7, 5, 8, 6];
      let temp = [];

      testData.forEach((n) => {
        heap.push(n);
        temp.push(n);
        heap.peek().should.be.equal(temp.sort(cmp)[0]);
      });

      for (let i = 0; i < 10; i += 1) {
        heap.pop().should.be.equal(i);
      }

      let testData2 = [9, 9, 9, 10, 2, 2, 9, -1, -1, -3, -5, 10];
      temp = [];

      testData2.forEach((n) => {
        heap.push(n);
        temp.push(n);
        heap.peek().should.be.equal(temp.sort(cmp)[0]);
      });

      testData2 = testData2.sort(cmp).reverse();
      while (!heap.isEmpty()) {
        heap.pop().should.be.equal(testData2.pop());
      }
    });
  });

  describe('isEmpty', () => {
    const heap = new Heap(cmp);
    it('should return true if a deque is empty', () => {
      heap.isEmpty().should.be.True();
    });

    it('should return false if a deque is empty', () => {
      heap.push(1);
      heap.isEmpty().should.be.False();
    });
  });

  describe('size', () => {
    it('should return correct size', () => {
      const heap = new Heap(cmp);
      heap.push(123);
      heap.size().should.be.equal(1);

      heap.push('another string');
      heap.size().should.be.equal(2);

      heap.push(3);
      heap.size().should.be.equal(3);
    });
  });
});
