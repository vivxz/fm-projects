import React, { useState } from 'react';
import { render } from 'react-dom';
// import Pet from './Pet.jsx';
import { Router, Link } from '@reach/router';
import SearchParams from './SearchParams';
import Details from './Details';
import ThemeContext from './ThemeContext';

const App = () => {
  const themeHook = useState('coral'); // if want multiple colors then store it in an object
  return (
    <React.StrictMode>
      {/* Hooks and Contexts are two separate things that work nicely together */}
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            {/* Link is pretty much like an <a> but reach router will handle all the various different routes for you */}
            <Link to="/">
              Adopt Me!
            {/* React router will render the everything that matches, whereas reach router will render the thing that matches the most */}
            </Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
          {/* <Pet name="Sox" animal="Cat" color="Gray" />
      <Pet name="Toeby" animal="Cat" color="Tabby Brown" />
      <Pet name="Batman" animal="Cat" color="Black" /> */}
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  )
};

render(React.createElement(App), document.getElementById("root"));
