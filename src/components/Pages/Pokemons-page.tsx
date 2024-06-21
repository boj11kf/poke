import React, { useEffect, useState } from "react";
import CardsContainer, { Pokemon } from "../Cards/Cards-container";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "store/store";
import { actionCreators as pokemonActions } from "../../store/actions/pokemons-actions";
import { useDispatch } from "react-redux";
import '../Cards/style.css';

const PokemonsPage: React.FC = () => {

    const loading: boolean = useSelector((state: RootState) => state.pokemons.isLoading);
    const pokemons: Pokemon[] = useSelector((state: RootState) => state.pokemons.pokemons);
    /* const [loading, setLoading] = useState<boolean>(false);
    const [pokemons, setPokemons] = useState<Pokemon[]>({} as Pokemon[]); */

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(pokemonActions.thunkInitPokemons());
    }, []);

    return (
        <CardsContainer pokemons={pokemons} loading={loading} />
    );
};

export default PokemonsPage;
