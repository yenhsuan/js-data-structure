const should = require('should');
const ERR_MSG = require('../../src/utils/errors');
const PriorityQueue = require('../../src/data_structures/priority-queue');

describe('# PriorityQueue', () => {
  let pq;
  beforeEach(() => {
    const cmp = (self, other) => self.priority - other.priority;
    pq = new PriorityQueue(cmp);
  });

  describe('constructor', () => {
    it('should be empty after initialized', () => {
      pq.size().should.be.equal(0);
      pq.isEmpty().should.be.True();
      should(pq.pop()).be.Undefined();
      should(pq.peek()).be.Undefined();
    });

    it('should return error if there is no comparator', () => {
      (() => new PriorityQueue()).should.throw(ERR_MSG.NO_COMPARATOR);
    });
  });

  describe('push/pop/peek', () => {
    it('should push/pop/peek correctly', () => {
      const testData = [
        {
          value: 1,
          priority: 1,
        },
        {
          value: 10,
          priority: 10,
        },
        {
          value: 3,
          priority: 3,
        },
        {
          value: 100,
          priority: 100,
        },
      ];

      const expectedPeek = [1, 1, 1, 1];
      const expectedPop = [1, 3, 10, 100];

      testData.forEach((n, i) => {
        pq.push(n);
        pq.peek().value.should.be.equal(expectedPeek[i]);
        pq.size().should.be.equal(i + 1);
      });

      while (!pq.isEmpty()) {
        pq.pop().value.should.be.equal(expectedPop[expectedPop.length - pq.size() - 1]);
      }
    });
  });
});
