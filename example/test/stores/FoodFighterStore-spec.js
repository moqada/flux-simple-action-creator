import assert from 'power-assert';

import {Dispatcher} from '../../src/Dispatcher';
import {FoodFighterStore} from '../../src/stores/FoodFighterStore';
import {FoodFighterAction} from '../../src/actions/FoodFighterAction';


/** @test {FoodFighterStore} */
describe('FoodFighterStore', () => {
  let store = null;
  let action = null;
  let dispatcher = null;

  beforeEach(() => {
    dispatcher = new Dispatcher();
    action = new FoodFighterAction(dispatcher);
    store = new FoodFighterStore(dispatcher);
  });

  describe('when dispatch FoodFighterAction.eat', () => {
    it('should increase count', () => {
      const count = 10;
      action.eat(count);
      assert(store.getState() === count);
      action.eat(5);
      assert(store.getState() === count + 5);
    });
  });

  describe('when dispatch FoodFighterAction.rest', () => {
    it('should increase count', () => {
      store._state = 100;  // eslint-disable-line no-underscore-dangle
      assert(store.getState() === 100);
      action.reset();
      assert(store.getState() === 0);
    });
  });
});

