import SimpleActionCreator from 'flux-simple-action-creator';
import action from 'flux-simple-action-creator/action';

import Dispatcher from '../Dispatcher';


/**
 * FoodFighterAction
 */
export class FoodFighterAction extends SimpleActionCreator {  // eslint-disable-line require-jsdoc

  /**
   * Action for eating count
   *
   * @param {Symbol} type action type
   * @param {number} count count number
   */
  @action
  eat(type, count) {  // eslint-disable-line require-jsdoc
    this.dispatch(type, {count});
  }

  /**
   * Action for reset
   *
   * @param {Symbol} type action type
   */
  @action
  reset(type) {  // eslint-disable-line require-jsdoc
    this.dispatch(type);
  }
}

export default new FoodFighterAction(Dispatcher);
