# flux-simple-action-creator

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

export default new FoodFighterAction(dispatcher);
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
