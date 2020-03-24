import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';

class Details extends React.Component {
  // constructor(props) {
  //   super(props); // get properties from parent which is React.Component

  //   this.state = {
  //     loading: true
  //   };
  // }

  // have to modify babel config in order for it to work this way
  state = { loading: true };

  componentDidMount() {
    pet.animal(this.props.id)
      .then(({ animal }) => { // using arrow functions allows this to not refer to a different context
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        })
      }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>
    }

    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => ( // deconstructing theme => (themeHook)
              <button style={{backgroundColor: theme}}>Adopt {name}</button> // if using themeHook, then backgroundColor: themeHook[0]
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>

      </div>
    )
  }
}

// const Details = (props) => {
//   return (
//     // <pre> = preformatted
//     <pre>
//       <code>{JSON.stringify(props, null, 4)}</code>
//     </pre>
//   )
// }

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      {/*spread the props across details –– used: component doesn't care about the props & just needs to pass it through*/}
      <Details {...props} />
    </ErrorBoundary>
  );
}