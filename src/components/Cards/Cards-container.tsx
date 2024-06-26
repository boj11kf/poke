import React from "react";
import { Card } from "./Card";
import { Pokemon } from '../../types';
import './style.scss';


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
