import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql`{
  pets{
    id
    name
    type
    img
  }
}`;

const CREATE_PET = gql`
  mutation CreatePet($newPet: NewPetInput!){
    addPet(input: $newPet){
      id
      name
      type
      img
    }
  }`

export default function Pets() {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS)

  // THESE ARE THE SAME THING
  const [addPet, NewPet] = useMutation(CREATE_PET,
    // const [addPet, { data: results, loading: load, error: errors }] = useMutation(CREATE_PET);
    {
      // Second argument of useMutation
      update(cache, { data: { addPet } }) {
        // if pets wasn't deconstruct then we would use data.pets
        const { pets } = cache.readQuery({ query: ALL_PETS });
        cache.writeQuery({
          query: ALL_PETS,
          // data: { pets: [addPet].concat(pets) }
          data: { pets: [addPet, ...pets] }
        })
      }
      //,optimisticResponse:{}
    });

  if (loading) return <Loader />; // removed NewPet.loading because we're using optimisticResponse now
  // if (loading || NewPet.loading) return <Loader />;
  if (error || NewPet.error) return `Error! ${error.message}`;
  // if (loading || load) return <Loader />;
  // if (error || errors) return `Error! ${error.message}`;


  const onSubmit = input => {
    setModal(false);
    addPet({
      variables: { newPet: input },
      // Add optimisticResponse:{} here if you need access to the variables
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          id: "0123456789",
          name: input.name,
          type: input.type,
          img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          __typename: "Pet"
        }
      }
    })
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}