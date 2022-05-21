import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {

  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);

  const createPokemon = async (pokemon) => {
    try {
      pokemon.image = {
        url: pokemon.image
      };
      const options = {
        method: 'POST',
        data: pokemon,
        url: `${process.env.REACT_APP_API_URL}/pokemons`
      };
      const { data } = await axios(options);
      setPokemons([
        ...pokemons,
        data
      ]);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        createPokemon
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};