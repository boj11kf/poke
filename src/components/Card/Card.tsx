import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Loading } from "../Loading";
import { useDispatch } from "react-redux";
import { actionCreators as pokemonActions } from "../../store/actions/pokemons-actions";
import { AppDispatch } from "store/store";
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

interface CardProps {
  pokemons: Pokemon[];
  loading: boolean;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { pokemons, loading } = props;
  const [showModal, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pokeName, setPokeName] = useState<string>('');
  const [pokeHeight, setPokeHeight] = useState<string>('');
  const [pokeWeight, setPokeWeight] = useState<string>('');
  const [pokeImg, setPokeImg] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>({} as Pokemon);
  const dispatch: AppDispatch = useDispatch();
  
  const openPokeInfo = (res: Pokemon) => {
    setPokeName(res.name);
    setPokeHeight(res.height.toString());
    setPokeWeight(res.weight.toString());
    setPokeImg(res.sprites.front_default);
    setCurrentPokemon(res);
    handleShow();
  }

  const handleRelease = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(pokemonActions.thunkRemoveFromMyPokemons(currentPokemon));
  };

  const handleCatch = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(pokemonActions.thunkAddToMyPokemons(currentPokemon));
  };

  console.log(pokemons);
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`chosen-poke-modal`} 
      >
        <Modal.Header closeButton>
          <Modal.Title>{pokeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="poke-content">
          <img src={pokeImg} className="img-fluid img-height" alt="Responsive" />
          <p>Height : {pokeHeight}</p>
          <p>Weight : {pokeWeight}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleCatch(e)}>Catch</Button>
          <Button variant="primary" onClick={(e) => handleRelease(e)}>Release</Button>
        </Modal.Footer>
      </Modal>

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
          loading ? <Loading /> :
            pokemons.filter((item) => {
              if (searchInput === "") {
                return item;
              } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return item;
              }
              return null;
            }).map((item) => {
              return (
                <div className={`item ${item.isMine && "is-already-mine"}`}  key={item.id}>
                  <div className="card poke-card" onClick={() => openPokeInfo(item)}>
                    <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card" />
                    <div className="card-body">
                      <h5 className="card-title poke-name">{item.name}</h5>
                    </div>
                  </div>
                  <br />
                </div>
              )
            })
        }
      </div>
    </>
  );
}

export default Card;
