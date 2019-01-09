const should = require('should');
const ERR_MSG = require('../../src/utils/errors');
const MinHeap = require('../../src/data_structures/min-heap');

describe('# Min Heap', () => {
  describe('constructor', () => {
    it('should be empty after initialized', () => {
      const minHeap = new MinHeap();
      minHeap.size().should.be.equal(0);
      minHeap.isEmpty().should.be.True();
      should(minHeap.pop()).be.Undefined();
      should(minHeap.peek()).be.Undefined();
    });
  });

  describe('push/pop/peek', () => {
    it('should return error if input elem is not a number', () => {
      const minHeap = new MinHeap();
      (() => minHeap.push('some string')).should.throw(ERR_MSG.NOT_NUMBER);
    });

    it('should push/pop/peek correctly', () => {
      const minHeap = new MinHeap();
      const testData = [-1000, 2000, 3, 5, 78, -100, 50, 50, 30, -1000];
      const temp = [];
      testData.forEach((n) => {
        minHeap.push(n);
        temp.push(n);
        const sortedTemp = [...temp].sort((self, other) => self - other);
        minHeap.peek().should.be.equal(sortedTemp[0]);
      });

      testData.sort((self, other) => self - other).forEach((n) => {
        minHeap.pop().should.be.equal(n);
      });
    });
  });
});
