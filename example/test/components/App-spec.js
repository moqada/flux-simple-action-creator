import testDom from 'testdom';
testDom('<html><body></body></html>');

import assert from 'power-assert';
import proxyquire from 'proxyquire';
import {Container} from 'flux/utils';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import {Dispatcher} from '../../src/Dispatcher';
import {FoodFighterAction} from '../../src/actions/FoodFighterAction';


/** @test {App} */
describe('App', () => {
  let action = null;
  let dispatchSpy = null;
  let cmp = null;

  beforeEach(() => {
    const dispatcher = new Dispatcher();
    action = new FoodFighterAction(dispatcher);
    dispatchSpy = sinon.spy(action, 'dispatch');
    const App = proxyquire('../../src/components/App', {
      '../actions/FoodFighterAction': {'default': action}
    });
    const AppContainer = Container.create(App);
    cmp = ReactTestUtils.renderIntoDocument(<AppContainer />);
  });

  it('should has state', () => {
    assert.deepEqual(cmp.state, {count: 0});
  });

  describe('when click increase button', () => {
    it('should dispatch FoodFighterAction#eat', () => {
      const node = cmp.increase;
      ReactTestUtils.Simulate.click(node);
      assert(dispatchSpy.args.length === 1);
      assert(dispatchSpy.args[0][0].toString() === 'Symbol(eat)');
      assert.deepEqual(dispatchSpy.args[0][1], {count: 1});
    });
  });

  describe('when click reset button', () => {
    it('should dispatch FoodFighterAction#reset', () => {
      const node = cmp.reset;
      ReactTestUtils.Simulate.click(node);
      assert(dispatchSpy.args.length === 1);
      assert(dispatchSpy.args[0][0].toString() === 'Symbol(reset)');
    });
  });
});
