import React, { useEffect } from "react";
import Card, { Pokemon } from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pokemonActions } from "../store/actions/pokemons-actions";
import { RootState, AppDispatch } from "store/store";
import './Card/style.css';

const CatchAndRealese: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const loading: boolean = useSelector((state: RootState) => state.pokemons.isLoading);
    const pokemons: Pokemon[] = useSelector((state: RootState) => state.pokemons.pokemons);

    useEffect(() => {
        dispatch(pokemonActions.thunkInitPokemons());
    }, [dispatch]);

    return (
        <>
            <div className="container">
                <Card pokemons={pokemons} loading={loading} />
            </div>
        </>
    );
};

export default CatchAndRealese;
