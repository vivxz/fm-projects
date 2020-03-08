import React from 'react';

export default function Pet({ name, animal, color }) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>Animal: {animal}</h2>
      <h2>Color: {color}</h2>
    </div>
  )
};
