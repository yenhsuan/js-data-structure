const should = require('should');
const Stack = require('../../src/data_structures/stack');
const ERR_MSG = require('../../src/utils/errors');

describe('# Stack', () => {
  describe('constructor', () => {
    it('should be empty after initialized', () => {
      const stack = new Stack();
      stack.size().should.be.equal(0);
      stack.isEmpty().should.be.True();
      should(stack.pop()).be.null();
      should(stack.peek()).be.null();
    });
  });

  describe('size', () => {
    it('should return the number of elements in the stack', () => {
      const stack = new Stack();
      const elem = 'something';
      stack.size().should.be.equal(0);

      stack.push(elem);
      stack.size().should.be.equal(1);

      stack.push(elem);
      stack.size().should.be.equal(2);

      stack.pop();
      stack.size().should.be.equal(1);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the stack is empty', () => {
      const stack = new Stack();
      stack.isEmpty().should.be.True();
    });

    it('should return false if the stack is not empty', () => {
      const stack = new Stack();
      stack.push('something');
      stack.isEmpty().should.be.False();
    });
  });

  describe('push/pop/peek', () => {
    it('should throw error if no given argument', () => {
      (() => new Stack().push()).should.throw(ERR_MSG.NO_ARGUMENT);
    });

    it('should be able to push/pop/peek element(s)', () => {
      const stack = new Stack();
      const elems = [{}, { a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];
      elems.forEach((elem, idx) => {
        stack.push(elem);
        should(stack.peek()).be.deepEqual(elem);
        stack.size().should.be.equal(idx + 1);
      });

      for (let i = elems.length - 1; i >= 0; i -= 1) {
        should(stack.peek()).be.deepEqual(elems[i]);
        should(stack.pop()).be.deepEqual(elems[i]);
        stack.size().should.be.equal(i);
      }
      should(stack.pop()).be.Null();
    });
  });

  describe('toString', () => {
    it('should return empty string if stack is empty', () => {
      const stack = new Stack();
      stack.toString().should.be.equal('');
    });

    it('should return the same format as Array.toString()', () => {
      const array = ['Javascript', 'Data', 'Structure'];
      const stack = new Stack();
      array.forEach((elem) => {
        stack.push(elem);
      });
      stack.toString().should.be.equal(array.toString());
    });
  });
});
