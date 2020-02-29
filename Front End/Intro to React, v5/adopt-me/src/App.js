const Pet = ({ name, animal, color }) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, color),
  ])
}

const App = () => {
  return React.createElement(
    "div", { id: "something-important" },
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

ReactDOM.render(React.createElement(App), document.getElementById("root"));