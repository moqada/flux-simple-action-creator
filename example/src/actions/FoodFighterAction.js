import SimpleActionCreator from 'flux-simple-action-creator';
import action from 'flux-simple-action-creator/action';

import Dispatcher from '../Dispatcher';


/**
 * FoodFighterAction
 */
export class FoodFighterAction extends SimpleActionCreator {

  /**
   * Action for eating count
   *
   * @param {Symbol} type action type
   * @param {number} count count number
   */
  @action
  eat(type, count) {
    this.dispatch(type, {count});
  }

  /**
   * Action for reset
   *
   * @param {Symbol} type action type
   */
  @action
  reset(type) {
    this.dispatch(type);
  }
}

export default new FoodFighterAction(Dispatcher);
