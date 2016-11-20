/* eslint-disable class-methods-use-this */
import assert from 'power-assert';
import sinon from 'sinon';
import {Dispatcher} from 'flux';
import {ReduceStore} from 'flux/utils';

import SimpleActionCreator from '../src';


/** @test {SimpleActionCreator} */
describe('SimpleActionCreator', () => {
  let DummyAction = null;
  let DummyStore = null;
  let actionSpy = null;
  let dispatcher = null;
  let dummyAction = null;
  let dummyStore = null;

  before(() => {
    DummyStore = class extends ReduceStore {
      getInitialState() {
        return {
          back: [],
          go: []
        };
      }
      reduce(state, action) {
        switch (action.type) {
        case 'go':
          state.go.push(action);
          break;
        default:
          break;
        }
        return state;
      }
    };

    DummyAction = class extends SimpleActionCreator {
      go(data) {
        this.dispatch('go', data);
      }
    };
  });

  beforeEach(() => {
    dispatcher = new Dispatcher();
    dummyStore = new DummyStore(dispatcher);
    dummyAction = new DummyAction(dispatcher);
    actionSpy = sinon.spy(dummyStore, 'reduce');
  });

  it('has dispatcher', () => {
    assert(dummyAction.dispatcher === dispatcher);
  });

  it('dispatch action', () => {
    const goData = {to: 'America', when: 'now'};
    dummyAction.go(goData);
    assert(actionSpy.args.length === 1);
    assert(actionSpy.args[0].length === 2);
    assert.deepEqual(actionSpy.args[0][1], {data: goData, type: 'go'});
  });
});
