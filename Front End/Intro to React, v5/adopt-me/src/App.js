import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet';

const App = () => {
  return React.createElement(
    "div",
    { id: "something-important" },
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Sox",
      animal: "Cat",
      color: "Gray"
    }),
    React.createElement(Pet, {
      name: "Toeby",
      animal: "Cat",
      color: "Tabby Brown"
    }),
    React.createElement(Pet, {
      name: "Batman",
      animal: "Cat",
      color: "Black"
    })
  );
};

render(React.createElement(App), document.getElementById("root"));
