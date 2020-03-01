import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown.jsx"
import userDropdown from "./useDropdown.jsx";

const SearchParams = () => {
  const [location, setLocation] = useState("San Jose, CA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = userDropdown("Animal", "cat", ANIMALS);
  const [breed, BreedDropdown] = userDropdown("Breed", "", breeds)

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