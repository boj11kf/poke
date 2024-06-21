import React, { useEffect, useMemo, useState } from "react";
import CardsContainer, { Pokemon } from "../Cards/Cards-container";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "store/store";
import { actionCreators as pokemonActions } from "../../store/actions/pokemons-actions";
import { useDispatch } from "react-redux";
import '../Cards/style.css';

const PokemonsPage: React.FC = () => {

    const pokemons: Pokemon[] = useSelector((state: RootState) => state.pokemons.pokemons);
    const [initialized, setInitialized] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        if (!initialized && pokemons.length === 0) {
            dispatch(pokemonActions.thunkInitPokemons());
            setInitialized(true);
        }
    }, [dispatch, initialized, pokemons.length]);


    /* useEffect(() => {
        dispatch(pokemonActions.thunkInitPokemons());
    }, []); */

    const memoizedPokemons = useMemo(() => pokemons, [pokemons]);

    return (
        <CardsContainer pokemons={memoizedPokemons} />
    );
};

export default PokemonsPage;
