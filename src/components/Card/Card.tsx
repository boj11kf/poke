import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
/* import { RiSearch2Line } from "react-icons/ri"; */
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
}

interface CardProps {
  pokemon: Pokemon[];
  loading: boolean;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { pokemon, loading } = props;
  const [showModal, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pokeName, setPokeName] = useState<string>('');
  const [pokeHeight, setPokeHeight] = useState<string>('');
  const [pokeWeight, setPokeWeight] = useState<string>('');
  const [pokeImg, setPokeImg] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const openPokeInfo = (res: Pokemon) => {
    setPokeName(res.name);
    setPokeHeight(res.height.toString());
    setPokeWeight(res.weight.toString());
    setPokeImg(res.sprites.front_default);
    handleShow();
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{pokeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="poke-content">
          <img src={pokeImg} className="img-fluid img-height" alt="Responsive" />
          <p>Height : {pokeHeight}</p>
          <p>Weight : {pokeWeight}</p>
        </Modal.Body>
      </Modal>

      <div className="form-group has-search">
        <span className="fa fa-search form-control-feedback">
          {/* <RiSearch2Line className="search-icon" /> */}
        </span>
        <input
          type="text"
          className="form-control"
          onChange={event => setSearchInput(event.target.value)}
          placeholder="Search"
        />
      </div>

      <div className="row card-row">
        {
          loading ? <h1>Loading...</h1> :
            pokemon.filter((item) => {
              if (searchInput === "") {
                return item;
              } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return item;
              }
              return null;
            }).map((item) => {
              return (
                <div className="col-md-3" key={item.id}>
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