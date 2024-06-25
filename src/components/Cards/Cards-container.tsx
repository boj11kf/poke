import React from "react";
import { Card } from "./Card";
import './style.scss';


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
    
  );

}

export default CardsContainer;
