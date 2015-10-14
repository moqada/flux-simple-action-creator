import assert from 'power-assert';
import sinon from 'sinon';
import {Dispatcher} from 'flux';

import SimpleActionCreator from '../src';
import action from '../src/action';


describe('action', () => {
  let DummyAction = null;

  beforeEach(() => {
    DummyAction = class extends SimpleActionCreator {
      @action
      eat(type, count) {
        this.dispatch(type, {count});
      }

      @action('dummyAction:reset')
      reset(type) {
        this.dispatch(type);
      }
    };
  });

  describe('class has decorated method', () => {
    it('should has types', () => {
      assert.deepEqual(Object.keys(DummyAction.types).length, 2);
      assert(DummyAction.types.eat.toString() === 'Symbol(eat)');
      assert(DummyAction.types.reset === 'dummyAction:reset');
    });
  });

  describe('instance of class has decorated method', () => {
    let dispatcher = null;
    let dummyAction = null;
    let dispatcherSpy = null;

    beforeEach(() => {
      dispatcher = new Dispatcher();
      dispatcherSpy = sinon.spy(dispatcher, 'dispatch');
      dummyAction = new DummyAction(dispatcher);
    });

    it('should has types', () => {
      assert.deepEqual(Object.keys(dummyAction.types), ['eat', 'reset']);
      assert(dummyAction.types.eat.toString() === 'Symbol(eat)');
      assert(dummyAction.types.reset === 'dummyAction:reset');
    });

    it('should insert `type` argument to method', () => {
      dummyAction.eat(2);
      const args = dispatcherSpy.args;
      assert(args.length === 1);
      assert(Object.keys(args[0][0]).length === 2);
      assert(args[0][0].type.toString() === 'Symbol(eat)');
      assert.deepEqual(args[0][0].data, {count: 2});
    });

    it('should insert custom `type` argument to method', () => {
      dummyAction.reset();
      const args = dispatcherSpy.args;
      assert(args.length === 1);
      assert(Object.keys(args[0][0]).length === 2);
      assert(args[0][0].type === 'dummyAction:reset');
      assert(args[0][0].data === undefined);
    });
  });
});
