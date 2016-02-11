import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import {FoodFighterAction} from '../actions/FoodFighterAction';


/**
 * FoodFighterStore
 */
export class FoodFighterStore extends ReduceStore {  // eslint-disable-line require-jsdoc
  /**
   * Initial state
   *
   * @return {number}
   */
  getInitialState() {
    return 0;
  }

  /**
   * Handle action
   *
   * @param {number} state count
   * @param {Object} action action
   * @param {Symbol} action.type action type
   * @param {Object|undefined} action.data action data
   * @return {number}
   */
  reduce(state, action) {
    switch (action.type) {
    case FoodFighterAction.types.eat:
      return state + action.data.count;
    case FoodFighterAction.types.reset:
      return 0;
    default:
      break;
    }
    return state;
  }
}

export default new FoodFighterStore(Dispatcher);
