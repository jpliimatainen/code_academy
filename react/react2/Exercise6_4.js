/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävä 35)
 * 
 * Juha-Pekka Liimatainen 20.11.2019
*/

import React from 'react';
import './index.css';
import './custom5.css';

const App = () => {
  return (
    <div class="grid-container">
      <Header content="Welcome to main page of Savonia AMK" />
      <Left content="Please log in!" />
      <Middle content="Introduction to our company..." />
      <Right content="Lot's of info about our company..." />
      <Footer content="Copyright by ktkoiju@Savonia.fi" />
    </div>
  );
}

const Header = (props) => {
  return (
    <div id="header">
      <p>{props.content}</p>
    </div>
  );
}

const Left = (props) => {
  return (
    <div id="left">
      <p>{props.content}</p>
    </div>
  );
}

const Middle = (props) => {
  return (
    <div id="middle">
      <p>{props.content}</p>
    </div>
  );
}

const Right = (props) => {
  return (
    <div id="right">
      <p>{props.content}</p>
    </div>
  );
}

const Footer = (props) => {
  return (
    <div id="footer">
      <p>{props.content}</p>
    </div>
  );
}

export default App;