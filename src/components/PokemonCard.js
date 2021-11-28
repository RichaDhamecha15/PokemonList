import React from "react";

const PokemonCard = ({ id, image, name, type, species, _callback }) => {
  const style = type + " pokemon-card";
  return (
    <div className={style}>
      <img src={image} alt={name} />
      <div className="pokemon-detail">
        <h3>{name}</h3>
        <small>Type: {type}</small>
        <small>Species: {species}</small>
      </div>
    </div>
  );
};

export default PokemonCard;
