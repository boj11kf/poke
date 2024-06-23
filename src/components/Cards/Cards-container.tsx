import React, { useState } from "react";
import { Loading } from "../Loading";
import { Card } from "./Card";
import './style.css';


export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  url: string;
  sprites: {
    front_default: string;
  };
  [key: string]: any;
  isMine: boolean;
}

interface CardsContainerProps {
  pokemons: Pokemon[];
  searchInput: string;
}

const CardsContainer: React.FC<CardsContainerProps> = (props: CardsContainerProps) => {

  const { pokemons, searchInput } = props;

  return (
    <div className="container">
      <div className="grid-container">
        {
          pokemons.filter((pokemon) => {
            if (searchInput == "") {
              return pokemon
            } else if (pokemon.name.toLowerCase().includes(searchInput.toLowerCase())) {
              return pokemon
            }
          }).map((pokemon) => (
            <Card
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))
        }
      </div>
    </div>
  );

}

export default CardsContainer;
