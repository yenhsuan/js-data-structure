const should = require('should');
const Deque = require('../../src/data_structures/deque');

describe('# Deque', () => {
  describe('constructor', () => {
    it('should be empty after initialized', () => {
      const deque = new Deque();
      deque.size().should.be.equal(0);
      should(deque.pop()).be.equal(null);
      should(deque.peek()).be.equal(null);
      should(deque.popFront()).be.equal(null);
      should(deque.peekFront()).be.equal(null);
    });

    it('should throw error after given a invalid capacity', () => {
      (() => new Deque(-1)).should.throw('Invalid capacity value');
      (() => new Deque(null)).should.throw('Invalid capacity value');
      (() => new Deque('some string')).should.throw('Invalid capacity value');
    });
  });

  describe('isEmpty', () => {
    const deque = new Deque();
    it('should return true if a deque is empty', () => {
      deque.isEmpty().should.be.True();
    });

    it('should return false if a deque is empty', () => {
      deque.push(1);
      deque.isEmpty().should.be.False();
    });
  });

  describe('size', () => {
    it('should return correct size', () => {
      const deque = new Deque(2);
      deque.push('string');
      deque.size().should.be.equal(1);

      deque.push('another string');
      deque.size().should.be.equal(2);

      deque.push(3);
      deque.pushFront(4);
      deque.size().should.be.equal(4);
    });
  });
});
