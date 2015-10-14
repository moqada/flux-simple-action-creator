import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'flux/utils';

import App from './components/App';


document.addEventListener('DOMContentLoaded', () => {
  const AppContainer = Container.create(App);
  ReactDOM.render(<AppContainer />, document.getElementById('app'));
});
