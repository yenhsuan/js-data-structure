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

    it('should be able to push/pop/peek elements', () => {
      const heap = new Heap(cmp);
      const testData = [9, 0, 1, 3, 2, 4, 7, 5, 8, 6];
      const temp = [];

      testData.forEach((n) => {
        heap.push(n);
        temp.push(n);
        heap.peek().should.be.equal(temp.sort(cmp)[0]);
      });

      // for (let i = 0; i < 10; i += 1) {
      //   heap.pop().should.be.equal(i);
      // }
    });
  });

  // describe('pushFront/popFront/peekFront', () => {
  //   it('should throw error if no argument given (pushFront)', () => {
  //     (() => new Deque().pushFront()).should.throw(ERR_MSG.NO_ARGUMENT);
  //     (() => new Deque(3).pushFront()).should.throw(ERR_MSG.NO_ARGUMENT);
  //   });

  //   it('should be able to pushFront/popFront elements', () => {
  //     const deque = new Deque();
  //     const elems = [{}, { a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];
  //     elems.forEach((elem, i) => {
  //       deque.pushFront(elem);
  //       should(deque.peekFront()).be.deepEqual(elem);
  //       deque.size().should.be.equal(i + 1);
  //     });

  //     for (let i = elems.length - 1; i >= 0; i -= 1) {
  //       should(deque.peekFront()).be.deepEqual(elems[i]);
  //       should(deque.popFront()).be.deepEqual(elems[i]);
  //       deque.size().should.be.equal(i);
  //     }
  //     should(deque.popFront()).be.Null();
  //   });
  // });

  // describe('isEmpty', () => {
  //   const deque = new Deque();
  //   it('should return true if a deque is empty', () => {
  //     deque.isEmpty().should.be.True();
  //   });

  //   it('should return false if a deque is empty', () => {
  //     deque.push(1);
  //     deque.isEmpty().should.be.False();
  //   });
  // });

  // describe('size', () => {
  //   it('should return correct size', () => {
  //     const deque = new Deque(2);
  //     deque.push('string');
  //     deque.size().should.be.equal(1);

  //     deque.push('another string');
  //     deque.size().should.be.equal(2);

  //     deque.push(3);
  //     deque.pushFront(4);
  //     deque.size().should.be.equal(4);
  //   });
  // });

  // describe('clear', () => {
  //   const deque = new Deque();
  //   deque.push({});
  //   deque.pushFront({ a: 1 });
  //   deque.push('some string');

  //   deque.clear();
  //   deque.size().should.be.equal(0);
  //   should(deque.peek()).be.Null();
  //   should(deque.peekFront()).be.Null();
  //   should(deque.isEmpty()).be.True();
  // });

  // describe('toString', () => {
  //   it('should return empty string if deque is empty', () => {
  //     const deque = new Deque();
  //     deque.toString().should.be.equal('');
  //   });

  //   it('should return the same format as Array.toString()', () => {
  //     const test = [1, 3, 2, 4, 5, 9, 8, 0, 7];
  //     const deque = new Deque();
  //     test.forEach((n) => {
  //       deque.pushFront(n);
  //     });

  //     deque.toString().should.be.equal(test.reverse().toString());
  //   });
  // });

  // describe('mix push/pop/pushFront/popFront operations', () => {
  //   it('should be able to push elements at both side)', () => {
  //     const deque = new Deque();
  //     deque.pushFront(3);
  //     deque.pushFront(2);
  //     deque.pushFront(1);
  //     deque.push(4);
  //     deque.push(5);
  //     deque.push(6);

  //     for (let i = 1; i < 6; i += 1) {
  //       should(deque.popFront()).be.equal(i);
  //     }
  //   });

  //   it('should be able to perform queue-like operation (push/popFront)', () => {
  //     const deque = new Deque();
  //     for (let i = 0; i < 10; i += 1) {
  //       deque.push(i);
  //       deque.peek().should.be.equal(i);
  //       deque.peekFront().should.be.equal(0);
  //     }

  //     let idx = 0;
  //     while (!deque.isEmpty()) {
  //       deque.peek().should.be.equal(9);
  //       deque.peekFront().should.be.equal(idx);
  //       deque.popFront().should.be.equal(idx);
  //       idx += 1;
  //     }
  //   });

  //   it('should be able to perform queue-like operation (pushFront/pop)', () => {
  //     const deque = new Deque();
  //     for (let i = 0; i < 10; i += 1) {
  //       deque.pushFront(i);
  //       deque.peek().should.be.equal(0);
  //       deque.peekFront().should.be.equal(i);
  //     }

  //     let idx = 0;
  //     while (!deque.isEmpty()) {
  //       deque.peekFront().should.be.equal(9);
  //       deque.peek().should.be.equal(idx);
  //       deque.pop().should.be.equal(idx);
  //       idx += 1;
  //     }
  //   });
  // });
});
