import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const cards = [
  {
    title: 'firstCard',
    id: 1,
  },
  {
    title: 'secondCard',
    id: 2,
  },
  {
    title: 'thirdCard',
    id: 3,
  },
  {
    title: 'fourthCard',
    id: 4,
  },
  {
    title: 'fifthCard',
    id: 5,
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App
      cards={cards}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
