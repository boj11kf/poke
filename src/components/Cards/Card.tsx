
import React, { useEffect, useState } from 'react';
import { Pokemon } from './Cards-container';
import { v4 as uuidv4 } from 'uuid'; /* uuIdv4() amiatt kell, mert a Strict mode miatt 2x renderel, igy kellet egy strongId */

export interface CardProps {
    pokemon: Pokemon;
    handleShow: (pokemon: Pokemon) => void;
}


export const Card: React.FC<CardProps> = (props: CardProps) => {

    const { pokemon, handleShow } = props;
    const [id, setId] = useState<string>('');
    const [strongId, setSearchInput] = useState<string>('');
    const [pokeName, setPokeName] = useState<string>('');
    const [pokeImg, setPokeImg] = useState<string>('');

    useEffect(() => {
        setId(pokemon.id.toString());
        setPokeName(pokemon.name);
        setPokeImg(pokemon.sprites.front_default);
    }, []);

    
    
    return (
        <>
            <div className={`item`} key={`${id}-${uuidv4()}`}>
                <div className={`card poke-card ${pokemon.isMine && "is-already-mine"}`} onClick={() => handleShow(pokemon)}>
                    <img className="card-img-top card-img" src={pokeImg} alt="Card" />
                    <div className="card-body">
                        <h5 className="card-title poke-name">{pokeName}</h5>
                    </div>
                </div>
                <br />
            </div>
        </>

    );
};