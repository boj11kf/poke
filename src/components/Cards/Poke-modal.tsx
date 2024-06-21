
import { Button, Modal } from "react-bootstrap";
import { CardProps } from "./Card";
import { useEffect, useState } from "react";
import { Pokemon } from "./Cards-container";

interface PokeModalProps {
    pokemon: Pokemon;
    showModal: boolean;
    handleRelease: (event: React.MouseEvent, pokemon: Pokemon) => void;
    handleCatch: (event: React.MouseEvent, pokemon: Pokemon) => void;
    handleClose: () => void;
};

export const PokeModal: React.FC<PokeModalProps> = (props: PokeModalProps) => {
    
    const { pokemon, showModal, handleCatch, handleRelease, handleClose } = props;
    const [id, setId] = useState<string>('');
    const [pokeName, setPokeName] = useState<string>('');
    const [pokeHeight, setPokeHeight] = useState<string>('');
    const [pokeWeight, setPokeWeight] = useState<string>('');
    const [pokeImg, setPokeImg] = useState<string>('');

    
    useEffect(() => {
        setId(pokemon.id.toString());
        setPokeName(pokemon.name);
        setPokeHeight(pokemon.height?.toString());
        setPokeWeight(pokemon.weight?.toString());
        setPokeImg(pokemon.sprites.front_default);
    }, []);
    
    return (
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
                <Button variant="secondary" onClick={(e) => handleCatch(e, pokemon)}>Catch</Button>
                <Button variant="primary" onClick={(e) => handleRelease(e, pokemon)}>Release</Button>
            </Modal.Footer>
        </Modal>
    );

};