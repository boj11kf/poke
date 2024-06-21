import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Loading } from "../Loading";
import { useDispatch } from "react-redux";
import { actionCreators as pokemonActions } from "../../store/actions/pokemons-actions";
import { AppDispatch } from "store/store";
import './style.css';
import { Card } from "./Card";
import { PokeModal } from "./Poke-modal";

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
  const [showModal, setShow] = useState<boolean>(false);
  const [chosenPokemon, setChosenPokemon] = useState<Pokemon>({} as Pokemon);
  const handleClose = () => setShow(false);
  const handleShow = (pokemon: Pokemon) => {
    setChosenPokemon(pokemon);
    setShow(true);
  };
  const dispatch: AppDispatch = useDispatch();

  const handleRelease = (event: React.MouseEvent, pokemon: Pokemon) => {
    event.preventDefault();
    dispatch(pokemonActions.thunkRemoveFromMyPokemons(pokemon));
  };

  const handleCatch = (event: React.MouseEvent, pokemon: Pokemon) => {
    event.preventDefault();
    dispatch(pokemonActions.thunkAddToMyPokemons(pokemon));
  };

  return (
    <>
      {
        showModal &&
        <PokeModal
          showModal={showModal}
          pokemon={chosenPokemon}
          handleRelease={handleRelease}
          handleCatch={handleCatch}
          handleClose={handleClose} />
      }
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
                    key={pokemon.id}
                    pokemon={pokemon}
                    handleShow={handleShow}
                  />
                ))
              : pokemons.map((pokemon) => (
                <Card
                  key={pokemon.id}
                  pokemon={pokemon}
                  handleShow={handleShow}
                />
              ))
        }
      </div>
    </>
  );
}

export default CardsContainer;
