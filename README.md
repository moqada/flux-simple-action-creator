# flux-simple-action-creator

[![Greenkeeper badge](https://badges.greenkeeper.io/moqada/flux-simple-action-creator.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download-image]][npm-download-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

Super Simple Base Action Creator for Flux.


## Installation

```
npm install --save flux-simple-action-creator
```


## Usage

### Basic

**[Use Decorators](https://github.com/wycats/javascript-decorators).**
You have to use like [babel.js](https://babeljs.io) with [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy).

```javascript
// actions/FoodFighterAction.js
import SimpleActionCreator from 'flux-simple-action-creator';
import action from 'flux-simple-action-creator/action';
import Dispatcher from './dispatcher/AppDispatcher.js';


export class FoodFighterAction extends SimpleActionCreator {

  // Automatically insert `type` to method arguments
  // and register Symbol to class variables. (ex. FoodFighterAction.types)
  @action
  eat(type, food) {
    // assert(typeof type === 'symbol');
    // assert(type.toStirng() === 'Symbol(eat)');
    this.dispatch(type, {food});
  }

  // You can insert custom `type`, too.
  @action('foodFighter:reverse')
  reverse(type) {
    // assert(type === 'foodFighter:reverse');
    this.dispatch(type);
  }
}

export default new FoodFighterAction(Dispatcher);

// assert(FoodFighterAction.types.eat.toString() === 'Symbol(eat)');
// assert(FoodFighterAction.types.reverse.toString() === 'Symbol(reverse)');
// assert(FoodFighterAction.types.special === 'foodFighter:special');
```

```javascript
// stores/FoodFighterStore.js
import {ReduceStore} from 'flux/utils';
import Dispatcher from './dispatcher/AppDispatcher.js';
import {FoodFighterAction} from './actions/FoodFighterAction';


export class FoodFighterStore extends ReduceStore {
  initialState() {
    return {stomach: []};
  }

  // structure of dispatched action from SimpleActionCreator is {type: {Symbol|string}, data: {any}}
  reduce(state, action) {
    switch (action.type) {
    case FoodFighterAction.types.eat:
      state.stomach.push(action.food);
      break;
    case FoodFighterAction.types.reverse:
      state.stomach = [];
      break;
    }
    return state;
  }
}

export default new FoodFighterStore(Dispatcher);
```

```javascript
// dispatcher/AppDispatcher.js
import {Dispatcher} from 'flux';

export class AppDispatcher extends Dispatcher {};
export default new AppDispatcher();
```


### More Simple (no use decorator)

```javascript
// actions/FoodFighterAction.js
import SimpleActionCreator from 'flux-simple-action-creator';
import Dispatcher from './dispatcher/AppDispatcher.js';


export class FoodFighterAction extends SimpleActionCreator {
  eat(food) {
    this.dispatch('foodFighter:eat', {food});
  }

  reverse() {
    this.dispatch('foodFighter:reverse');
  }
}

export default new FoodFighterAction(Dispatcher);
```

```javascript
// stores/FoodFighterStore.js
import {ReduceStore} from 'flux/utils';
import Dispatcher from './dispatcher/AppDispatcher.js';


export class FoodFighterStore extends ReduceStore {
  initialState() {
    return {stomach: []};
  }

  reduce(state, action) {
    switch (action.type) {
    case 'foodFighter:eat':
      state.stomach.push(action.food);
      break;
    case 'foodFighter:reverse':
      state.stomach = [];
      break;
    }
    return state;
  }
}

export default new FoodFighterStore(Dispatcher);
```

```javascript
// dispatcher/AppDispatcher.js
import {Dispatcher} from 'flux';

export class AppDispatcher extends Dispatcher {};
export default new AppDispatcher();
```

More detail, See [Doc](https://moqada.github.io/flux-simple-action-creator).


[npm-url]: https://www.npmjs.com/package/flux-simple-action-creator
[npm-image]: https://img.shields.io/npm/v/flux-simple-action-creator.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/flux-simple-action-creator
[npm-download-image]: https://img.shields.io/npm/dt/flux-simple-action-creator.svg?style=flat-square
[travis-url]: https://travis-ci.org/moqada/flux-simple-action-creator
[travis-image]: https://img.shields.io/travis/moqada/flux-simple-action-creator.svg?style=flat-square
[daviddm-url]: https://david-dm.org/moqada/flux-simple-action-creator
[daviddm-image]: https://img.shields.io/david/moqada/flux-simple-action-creator.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/flux-simple-action-creator#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/flux-simple-action-creator.svg?style=flat-square
[codecov-url]: https://codecov.io/github/moqada/flux-simple-action-creator
[codecov-image]: https://img.shields.io/codecov/c/github/moqada/flux-simple-action-creator.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/flux-simple-action-creator.svg?style=flat-square
