
import React, { useCallback, useEffect, useState } from 'react';
import { Pokemon } from './Cards-container';
import { v4 as uuidv4 } from 'uuid'; /* uuIdv4() amiatt kell, mert a Strict mode miatt 2x renderel, igy kellet egy strongId */
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';


export interface CardProps {
    pokemon: Pokemon;
}


export const Card: React.FC<CardProps> = (props: CardProps) => {

    const { pokemon } = props;
    const [id, setId] = useState<string>('');
    const [pokeName, setPokeName] = useState<string>('');
    const [pokeImg, setPokeImg] = useState<string>('');
    const [isMine, setIsMine] = useState<boolean>(false);
    const _isMine: boolean = useSelector((state: RootState) => state.pokemons.pokemons).find(p => p.id === pokemon.id)?.isMine || false;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setId(pokemon.id.toString());
        setPokeName(pokemon.name);
        setPokeImg(pokemon.sprites.front_default);
    }, []);

    useEffect(() => {
        setIsMine(_isMine);
    }, [_isMine]);

    const onClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(`/pokemons/pokemon/${id}`, { state: { background: location }});
    };

    return (
        <>
            <div className={`item`} key={`${id}-${uuidv4()}`}>
                <div className={`card poke-card ${isMine && "is-already-mine"}`} onClick={onClickHandler}>
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