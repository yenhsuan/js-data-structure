const should = require('should');
const ERR_MSG = require('../../src/utils/errors');
const MaxHeap = require('../../src/data_structures/max-heap');

const cmp = (self, other) => other - self;

describe('# Max Heap', () => {
  describe('constructor', () => {
    it('should be empty after initialized', () => {
      const maxHeap = new MaxHeap();
      maxHeap.size().should.be.equal(0);
      maxHeap.isEmpty().should.be.True();
      should(maxHeap.pop()).be.Undefined();
      should(maxHeap.peek()).be.Undefined();
    });
  });

  describe('push/pop/peek', () => {
    it('should return error if input elem is not a number', () => {
      const maxHeap = new MaxHeap();
      (() => maxHeap.push('some string')).should.throw(ERR_MSG.NOT_NUMBER);
    });

    it('should push/pop/peek correctly', () => {
      const maxHeap = new MaxHeap();
      const testData = [-1000, 2000, 3, 5, 78, -100, 50, 50, 30, -1000];
      const temp = [];
      testData.forEach((n) => {
        maxHeap.push(n);
        temp.push(n);
        const sortedTemp = [...temp].sort(cmp);
        maxHeap.peek().should.be.equal(sortedTemp[0]);
      });

      testData.sort(cmp).forEach((n) => {
        maxHeap.pop().should.be.equal(n);
      });
    });
  });
});
