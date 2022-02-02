import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/main.css';

console.log(
  "%cCongrats, you're a programmer. But looking at the source is not in the spirit of the game. So go ahead if you really want.",
  'font-size: x-large'
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
