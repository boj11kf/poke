
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Pokemon } from '../../types';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pokemonActions } from "../../store/actions/pokemons-actions";
import { AppDispatch, RootState } from "store/store";
import { useParams } from "react-router-dom";
import './style.scss';

const PokeModal: React.FC = () => {

    const [pokeName, setPokeName] = useState<string>('');
    const [pokeHeight, setPokeHeight] = useState<string>('');
    const [pokeWeight, setPokeWeight] = useState<string>('');
    const [pokeImg, setPokeImg] = useState<string>('');
    const { id } = useParams<"id">();
    const pokemon: Pokemon = useSelector((state: RootState) => state.pokemons.pokemons).find(p => p.id === parseInt(id || "0")) || {} as Pokemon;

    useEffect(() => {
        setPokeName(pokemon.name);
        setPokeHeight(pokemon.height?.toString());
        setPokeWeight(pokemon.weight?.toString());
        setPokeImg(pokemon.sprites.front_default);
    }, [id]);

    const dispatch: AppDispatch = useDispatch();

    const handleCatch = (event: React.MouseEvent, pokemon: Pokemon) => {
        event.preventDefault();
        dispatch(pokemonActions.thunkAddToMyPokemons(pokemon));
    };

    const handleRelease = (event: React.MouseEvent, pokemon: Pokemon) => {
        event.preventDefault();
        dispatch(pokemonActions.thunkRemoveFromMyPokemons(pokemon));
    };

    return (
        <Modal
            show={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Button className="btn close-button" variant="danger" onClick={() => window.history.back()}>X</Button>
            <Modal.Header>
                <Modal.Title>{pokeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="poke-content">
                <img src={pokeImg} className="img-fluid img-height" alt="Responsive" />
                <p>Height : {pokeHeight}</p>
                <p>Weight : {pokeWeight}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={(e) => handleCatch(e, pokemon)}>Catch</Button>
                <Button variant="primary" onClick={(e) => handleRelease(e, pokemon)}>Release</Button>
            </Modal.Footer>
        </Modal>
    );

};

export default PokeModal;