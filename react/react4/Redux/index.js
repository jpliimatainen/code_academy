/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 49-51)
 * 
 * Vaatii redux ja react-redux -asennukset
 * (npm i redux/react-redux --save)
 * 
 * Juha-Pekka Liimatainen 26.11.2019
*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import StudentApp from './StudentApp';

render(
  <Provider store={store}>
    <StudentApp />
  </Provider>,
  document.getElementById('root')
);