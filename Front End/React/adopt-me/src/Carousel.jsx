import React, { Component } from 'react';

class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  };

  // React method and must be static
  static getDerivedStateFromProps({ media }) { // takes in a set of property does some filtering and passes it to the component
    let photos = ['http://placecorgi.com/600/600']; // default if media is empty

    if (media.length) {
      photos = media.map(({ large }) => large); //grabbing all the large photos
    }

    return { photos };
  }

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index //unary + turns it into a number
    })
  }

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index} // this is what dataset is referring to
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;