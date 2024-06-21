
import React, { useEffect, useState } from 'react';
import { Pokemon } from './Cards-container';
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
    const [isMine, setIsMine] = useState<boolean>(pokemon.isMine);

    const navigate = useNavigate();
    const location = useLocation();

    const onClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(`/pokemons/pokemon/${id}`, { state: { background: location }});
    };

    useEffect(() => {
        setId(pokemon.id.toString());
        setPokeName(pokemon.name);
        setPokeImg(pokemon.sprites.front_default);
        //setIsMine(pokemon.isMine);
    }, []);

    useEffect(() => {
        setIsMine(pokemon.isMine);
      }, [pokemon.isMine]);

    console.log(isMine);

    return (
        <>
            <div className={`item`} key={`${id}`}>
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