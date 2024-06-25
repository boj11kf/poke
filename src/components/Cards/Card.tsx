
import React, { useEffect, useState } from 'react';
import { Pokemon } from './Cards-container';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/store';
import { useDispatch } from 'react-redux';
import { actionCreators as pokemonActions } from "../../store/actions/pokemons-actions";
import { Button } from 'react-bootstrap';
import logo from '../../poke-logo.png';
import './style.scss';


export interface CardProps {
    pokemon: Pokemon;
}


export const Card: React.FC<CardProps> = (props: CardProps) => {

    const { pokemon } = props;

    const [id, setId] = useState<string>('');
    const [pokeName, setPokeName] = useState<string>('');
    const [pokeImg, setPokeImg] = useState<string>('');
    const [hp, setHp] = useState<string>('');
    const [attack, setAttack] = useState<string>('');
    const [defense, setDefense] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [mainType, setMainType] = useState<string>('');
    const [isMine, setIsMine] = useState<boolean>(pokemon.isMine);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();


    const onClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(`/pokemons/pokemon/${id}`, { state: { background: location } });
    };

    const getCardColor = (type: string) => {
        switch (type) {
            case 'grass':
                return `linear-gradient(#9BCC50, #8BBE8A)`;
            case 'fire':
                return `linear-gradient(#FD7D24, #FFA07A)`;
            case 'flying':
                return `linear-gradient(#3DC7EF, #BDEDFF)`;
            case 'water':
                return `linear-gradient(#4592C4, #6CBDE5)`;
            case 'bug':
                return `linear-gradient(#729F3F, #AAB220)`;
            case 'poison':
                return `linear-gradient(#B97FC9, #C183C1)`;
            case 'normal':
                return `linear-gradient(#A4ACAF, #B5B9BB)`;
            default:
                return `linear-gradient(#F9BC61, #FDE8C9)`;
        }

    };
    /* const getCardMiddleColor = (type: string) => {
        switch (type) {
            case 'grass':
                return `linear-gradient(#9BCC50, #8BBE8A 75%)`;
            case 'fire':
                return `linear-gradient(#FD7D24, #FFA07A 75%)`;
            case 'flying':
                return `linear-gradient(#3DC7EF, #BDEDFF 75%)`;
            case 'water':
                return `linear-gradient(#4592C4, #6CBDE5 75%)`;
            case 'bug':
                return `linear-gradient(#729F3F, #AAB220 75%)`;
            case 'poison':
                return `linear-gradient(#B97FC9, #C183C1 75%)`;
            case 'normal':
                return `linear-gradient(#A4ACAF, #B5B9BB 75%)`;
            default:
                return `linear-gradient(#F9BC61, #FDE8C9 75%)`;
        }
    }; */

    useEffect(() => {
        setId(pokemon.id.toString());
        setPokeName(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
        setPokeImg(pokemon.sprites.front_default);
        setMainType(pokemon.types[0].type.name);
        setType(pokemon.types[0].type.name + (pokemon.types[1]?.type.name !== undefined ? ' / ' + pokemon.types[1]?.type.name : ''));

    }, []);

    useEffect(() => {
        setIsMine(pokemon.isMine);
    }, [pokemon.isMine]);


    const handleCatch = (event: React.MouseEvent, pokemon: Pokemon) => {
        event.preventDefault();
        dispatch(pokemonActions.thunkAddToMyPokemons(pokemon));
    };

    const handleRelease = (event: React.MouseEvent, pokemon: Pokemon) => {
        event.preventDefault();
        dispatch(pokemonActions.thunkRemoveFromMyPokemons(pokemon));
    };

    return (
        <div className="card" key={`${id}`} onClick={onClickHandler}>
            <div className="content" style={{background: getCardColor(mainType), border: pokemon.isMine ? "3px solid gold" : "none"}}>
                <div className="front" >
                    <div className="top">
                        <div>{type}</div>
                        <div className="color" style={{ background: `${getCardColor(mainType)}` }}></div>
                    </div>
                    <div className="middle" /* style={{background: `${getCardColor(mainType)}`}}*/ >
                        <div>
                            {
                                pokemon.isMine ? <p>Already yours</p> : <p> </p>
                            }
                            
                            <p>{pokeName}</p>
                        </div>
                        <img src={pokeImg} />
                    </div>
                    <div className="bottom">
                        <div>
                            <p>Hp</p>
                            <p>36</p>
                        </div>
                        <div>
                            <p>Att</p>
                            <p>93</p>
                        </div>
                        <div>
                            <p>Def</p>
                            <p>68</p>
                        </div>
                    </div>
                </div>
                <div className="back">
                    <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                        <img src={logo} className="img-fluid" style={{ maxWidth: '55%', height: 'auto' }} alt="PokeBall" />
                    </div>
                    <div className="d-flex justify-content-evenly align-items-center mb-3 pb-1">
                        {
                            location.pathname === '/pokemons'
                                ? pokemon.isMine
                                    ? <Button variant="primary" onClick={(e) => handleRelease(e, pokemon)}>Release</Button>
                                    : <Button variant="secondary" onClick={(e) => handleCatch(e, pokemon)}>Catch</Button>
                                : pokemon.isMine
                                    ? <Button variant="primary" onClick={(e) => handleRelease(e, pokemon)}>Release</Button>
                                    : <Button variant="secondary" onClick={(e) => handleCatch(e, pokemon)}>Catch</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};