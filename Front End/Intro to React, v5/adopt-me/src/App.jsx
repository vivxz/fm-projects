import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet.jsx';

const App = () => {
  return (
    <div>
      <h1 id="something-important">Adopt Me!</h1>
      <Pet name="Sox" animal="Cat" color="Gray" />
      <Pet name="Toeby" animal="Cat" color="Tabby Brown" />
      <Pet name="Batman" animal="Cat" color="Black" />
    </div>
  )

};

render(React.createElement(App), document.getElementById("root"));
