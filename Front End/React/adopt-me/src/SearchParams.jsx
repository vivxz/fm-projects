import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from './Results';
import useDropdown from "./useDropdown.jsx";
import ThemeContext from './ThemeContext';

const SearchParams = () => {
  const [location, setLocation] = useState("San Francisco, CA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "cat", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPet] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext); // useContext = hooks, to use it provider has to be parent

  // async always returns a promise
  async function requestPets() {
    const { animals } = await pet.animals({ // pet.animals returns a promise
      location,
      breed,
      type: animal
    })

    setPet(animals || []); // set to animal to keep it as an empty array
  }

  // Schedule to run after the render happens because you don't want to slow down the first render
  useEffect(() => {
    // Clears out the breeds
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedString = apiBreeds.map(({ name }) => name); // breedObj = breedObj.name
      setBreeds(breedString);
    }, console.error)
  }, [animal, setBreed, setBreeds]) // adding this will rerun useEffect after it renders only when these dependencies changes

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          Location:
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={event => setLocation(event.target.value)} />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={event => setTheme(event.target.value)}
            onBlur={event => setTheme(event.target.value)}>
            {/* Not using a dropdown because it creates its own hooks –– we're using Apps hooks, not SearchParams' hooks */}
            <option value="#FF9AA2">Light Salmon Pink</option>
            <option value="#FFB7B2">Melon</option>
            <option value="#FFDAC1">Very Pale Orange</option>
            <option value="#E2F0CB">Light Lime Green</option>
            <option value="#B5EAD7">Magic Mint</option>
            <option value="#C7CEEA">Periwinkle</option>
          </select>
        </label>
        {/* <label htmlFor="animal">
          Animal:
          <select
            id="animal"
            value={animal}
            onChange={event => setAnimal(event.target.value)}
            onBlur={event => setAnimal(event.target.value)}>
            <option>All </option>
            {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
          </select>
        </label>
        <label htmlFor="breed">
          Breed:
          <select
            id="breed"
            value="breed"
            onChange={event => setBreed(event.target.value)}
            onBlur={event => setBreed(event.target.value)}
            // If the length of breed is 0, disable it
            disabled={!breeds.length}>
            <option>All </option>
            {breeds.map(breedString => <option key={breedString} value={breedString}>{breedString}</option>)}
          </select>
        </label> */}
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div >
  )
}

export default SearchParams;