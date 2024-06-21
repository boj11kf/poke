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
}

const CardsContainer: React.FC<CardsContainerProps> = (props: CardsContainerProps) => {

  const { pokemons } = props;
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <div className="container">
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={event => setSearchInput(event.target.value)} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div className="grid-container">
        {
          pokemons.map((pokemon) => (
            <Card
              key={pokemon.id} // Assuming pokemon.id is unique and stable
              pokemon={pokemon}
            />
          ))
        }
      </div>
    </div>
  );

}

export default CardsContainer;
