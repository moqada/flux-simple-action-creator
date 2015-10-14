import assert from 'power-assert';
import sinon from 'sinon';

import {Dispatcher} from '../../src/Dispatcher';
import {FoodFighterAction} from '../../src/actions/FoodFighterAction';


/** @test {FoodFighterAction} */
describe('FoodFighterAction', () => {
  let action = null;
  let dispatcher = null;
  let dispatchSpy = null;

  beforeEach(() => {
    dispatcher = new Dispatcher();
    dispatchSpy = sinon.spy(dispatcher, 'dispatch');
    action = new FoodFighterAction(dispatcher);
  });

  /** @test {FoodFighterAction#eat} */
  describe('#eat()', () => {
    it('should dispatch count', () => {
      const count = 10;
      action.eat(count);
      assert(dispatchSpy.args.length === 1);
      assert.deepEqual(dispatchSpy.args[0][0].data, {count});
    });
  });

  /** @test {FoodFighterAction#reset} */
  describe('#reset()', () => {
    it('should dispatch count', () => {
      action.reset();
      assert(dispatchSpy.args.length === 1);
      assert(dispatchSpy.args[0][0].data === undefined);
    });
  });
});
