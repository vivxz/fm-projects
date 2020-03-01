import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown.jsx";

const SearchParams = () => {
  const [location, setLocation] = useState("San Francisco, CA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "cat", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

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
      <form>
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
        <button>Submit</button>
      </form>
    </div >
  )
}

export default SearchParams;