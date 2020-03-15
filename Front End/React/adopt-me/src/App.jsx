import React from 'react';
import { render } from 'react-dom';
// import Pet from './Pet.jsx';
import { Router, Link } from '@reach/router';
import SearchParams from './SearchParams';
import Details from './Details';

const App = () => {
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  )

};

render(React.createElement(App), document.getElementById("root"));
