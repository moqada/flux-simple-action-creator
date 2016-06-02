import React from 'react';

import FoodFighterAction from '../actions/FoodFighterAction';
import FoodFighterStore from '../stores/FoodFighterStore';


/**
 * Root App Component
 */
export default class App extends React.Component {  // eslint-disable-line require-jsdoc
  /**
   * Depends stores
   *
   * @return {Store[]}
   */
  static getStores() {
    return [FoodFighterStore];
  }

  /**
   * Component state
   *
   * @return {Object}
   */
  static calculateState() {
    return {
      count: FoodFighterStore.getState()
    };
  }

  /**
   * Click handler for increase button
   */
  onClickIncrease = () => {
    FoodFighterAction.eat(1);
  };

  /**
   * Click handler for reset button
   */
  onClickReset = () => {
    FoodFighterAction.reset();
  };

  /**
   * Render
   *
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <div>
          <button
            ref={c => (this.increase = c)}
            onClick={this.onClickIncrease}
          >
            Increase
          </button>
          <button
            ref={c => (this.reset = c)}
            onClick={this.onClickReset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}
