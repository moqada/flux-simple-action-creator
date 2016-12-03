/**
 * SimpleActionCreator
 */
export default class SimpleActionCreator {  // eslint-disable-line require-jsdoc
  /**
   * Constructor
   *
   * @param {Dispatcher} dispatcher Disptacher instance
   */
  constructor(dispatcher) {
    /**
     * Flux Dispatcher instance
     *
     * @type {Dispatcher}
     */
    this.dispatcher = dispatcher;
  }

  /**
   * Dispatch Action
   *
   * @param {symbol|string} type action type
   * @param {Object|undefined} data action data
   */
  dispatch(type, data) {
    this.dispatcher.dispatch({data, type});
  }
}
