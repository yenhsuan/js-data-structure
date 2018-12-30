const should = require('should');
const Deque = require('../../src/data_structures/deque');
const ERR_MSG = require('../../src/utils/errors');

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

    it('should throw error if given a invalid capacity', () => {
      (() => new Deque(-1)).should.throw(ERR_MSG.CAPACITY);
      (() => new Deque(null)).should.throw(ERR_MSG.CAPACITY);
      (() => new Deque('some string')).should.throw(ERR_MSG.CAPACITY);
    });
  });

  describe('push/pop/peek', () => {
    it('should throw error if no argument given (push)', () => {
      (() => new Deque().push()).should.throw(ERR_MSG.NO_ARGUMENT);
      (() => new Deque(3).push()).should.throw(ERR_MSG.NO_ARGUMENT);
    });

    it('should be able to push/pop/peek elements', () => {
      const deque = new Deque();
      const elems = [{}, { a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];
      elems.forEach((elem, i) => {
        deque.push(elem);
        should(deque.peek()).be.deepEqual(elem);
        deque.size().should.be.equal(i + 1);
      });

      for (let i = elems.length - 1; i >= 0; i -= 1) {
        should(deque.peek()).be.deepEqual(elems[i]);
        should(deque.pop()).be.deepEqual(elems[i]);
        deque.size().should.be.equal(i);
      }
      should(deque.pop()).be.equal(null);
    });
  });

  describe('pushFront/popFront/peekFront', () => {
    it('should throw error if no argument given (pushFront)', () => {
      (() => new Deque().pushFront()).should.throw(ERR_MSG.NO_ARGUMENT);
      (() => new Deque(3).pushFront()).should.throw(ERR_MSG.NO_ARGUMENT);
    });

    it('should be able to pushFront/popFront elements', () => {
      const deque = new Deque();
      const elems = [{}, { a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];
      elems.forEach((elem, i) => {
        deque.pushFront(elem);
        should(deque.peekFront()).be.deepEqual(elem);
        deque.size().should.be.equal(i + 1);
      });

      for (let i = elems.length - 1; i >= 0; i -= 1) {
        should(deque.peekFront()).be.deepEqual(elems[i]);
        should(deque.popFront()).be.deepEqual(elems[i]);
        deque.size().should.be.equal(i);
      }
      should(deque.popFront()).be.equal(null);
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

  describe('mix push/pop/pushFront/popFront operations', () => {
    it('should be able to perform queue-like operation (push/popFront)', () => {
      const deque = new Deque();
      for (let i = 0; i < 10; i += 1) {
        deque.push(i);
        deque.peek().should.be.equal(i);
        deque.peekFront().should.be.equal(0);
      }

      let idx = 0;
      while (!deque.isEmpty()) {
        deque.peek().should.be.equal(9);
        deque.peekFront().should.be.equal(idx);
        deque.popFront().should.be.equal(idx);
        idx += 1;
      }
    });

    it('should be able to perform queue-like operation (pushFront/pop)', () => {
      const deque = new Deque();
      for (let i = 0; i < 10; i += 1) {
        deque.pushFront(i);
        deque.peek().should.be.equal(0);
        deque.peekFront().should.be.equal(i);
      }

      let idx = 0;
      while (!deque.isEmpty()) {
        deque.peekFront().should.be.equal(9);
        deque.peek().should.be.equal(idx);
        deque.pop().should.be.equal(idx);
        idx += 1;
      }
    });
  });
});
