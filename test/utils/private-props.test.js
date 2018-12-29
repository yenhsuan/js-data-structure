const should = require('should');
const privateProps = require('../../src/utils/private-props');

describe('# Private props', () => {
  class Foo {
    constructor() {
      privateProps(this).privateVars1 = 1;
      privateProps(this).privateVars2 = 100;
    }

    get var1() {
      return privateProps(this).privateVars1;
    }

    set var1(val) {
      privateProps(this).privateVars1 = val;
    }
  }

  const foo = new Foo();

  it('should be able to set private variables', () => {
    foo.var1.should.be.exactly(1);
    foo.var1 = 2;
    foo.var1.should.be.exactly(2);
  });

  it('should store private variables using instance itself as key', () => {
    privateProps(foo).privateVars1.should.be.exactly(2);
    privateProps(foo).privateVars2.should.be.exactly(100);
  });
});
