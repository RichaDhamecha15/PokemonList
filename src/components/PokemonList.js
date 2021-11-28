import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PokemonCard from "./PokemonCard";

const PokemonList = () => {

  const [allPokemons, setAllPokemons] = useState([]);
  const [searchedPokemons, setSearchedPokemons] = useState(null);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=30"
  );

  //  fetching data asynchronously 
  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    // setLoadMore will load the pokemon data of next limit till 30 pokemon
    setLoadMore(data.next);    
    data.results.forEach(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      setAllPokemons((currentList) => [...currentList, data]);
      await allPokemons.sort((a, b) => a.id - b.id);
    });
  };

  const searchPokemon = (value) => {
    const matchingPokemons = allPokemons.filter((pokemon) => pokemon.name.includes(value));
    setSearchedPokemons(matchingPokemons);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);


  const SearchedResults = () => {
    return searchedPokemons.length === 0 ? <h1>No matching results</h1> :
    searchedPokemons.map((pokemonStats, index) => (
      <PokemonCard
        key={index}
        id={pokemonStats.id}
        image={pokemonStats.sprites.other.dream_world.front_default}
        name={pokemonStats.name}
        type={pokemonStats.types[0].type.name}
        species={pokemonStats.species.name}
      />
    ))
  }

  const PokemonsList = () => {
    return (<InfiniteScroll
      dataLength={allPokemons.length}
      next={getAllPokemons}
      hasMore={allPokemons.length <= 200}
      scrollThreshold={1.0}
      loader={<h4 style={{ textAlign: "center", color: 'green' }}>Loading...</h4>}
      endMessage={<p style={{ textAlign: "center", color: 'green' }}>
          <b>You have reached at end of your results</b></p>}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >{allPokemons.map((pokemonStats, index) => (
      <PokemonCard
        key={index}
        id={pokemonStats.id}
        image={pokemonStats.sprites.other.dream_world.front_default}
        name={pokemonStats.name}
        type={pokemonStats.types[0].type.name}
        species={pokemonStats.species.name}
      />
    ))}
    </InfiniteScroll>)
  }

  return (
    <div className="pokemon-container">
      <div className="search-box">
        <label>Search Pokemon: </label>
        <input
          type="text"
          onChange={event => {
            searchPokemon(event.target.value);
          }}
        />
      </div>    
      <div className="list-container">
        {searchedPokemons ? 
          <SearchedResults /> :        
          <PokemonsList />
        }
      </div>
  </div>
  );
};

export default PokemonList;
