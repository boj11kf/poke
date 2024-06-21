import React, { useCallback, useState } from "react";
import { Loading } from "../Loading";
import { Card } from "./Card";
import { v4 as uuidv4 } from 'uuid'; /* uuIdv4() amiatt kell, mert a Strict mode miatt 2x renderel, igy kellet egy strongId */
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
  loading: boolean;
}

const CardsContainer: React.FC<CardsContainerProps> = (props: CardsContainerProps) => {
  
  const { pokemons, loading } = props;
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
          loading
            ? <Loading />
            : searchInput !== ""
              ? pokemons
                .filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput.toLocaleLowerCase()))
                .map((pokemon) => (
                  <Card
                    key={`${pokemon.id}-${uuidv4()}`}
                    pokemon={pokemon}
                  />
                ))
              : pokemons.map((pokemon) => (
                <Card
                  key={`${pokemon.id}-${uuidv4()}`}
                  pokemon={pokemon}
                />
              ))
        }
      </div>
    </div>
  );
}

export default CardsContainer;
