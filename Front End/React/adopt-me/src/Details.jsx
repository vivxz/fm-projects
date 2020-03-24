import React from 'react';
import pet from '@frontendmasters/pet';
import { navigate } from '@reach/router';
import Modal from './Modal';
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
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props.id)
      .then(({ animal }) => { // using arrow functions allows this to not refer to a different context
        this.setState({
          url: animal.url,
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

  toggleModal = () => this.setState({ showModal: !this.state.showModal })
  adopt = () => navigate(this.state.url)

  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>
    }

    const { animal, breed, location, description, name, media, showModal } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => ( // deconstructing theme => (themeHook)
              <button onClick={this.toggleModal} style={{ backgroundColor: theme }}>Adopt {name}</button> // if using themeHook, then backgroundColor: themeHook[0]
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No, I am a monster</button>
                  </div>
                </div>
              </Modal>
            ) : null
          }
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