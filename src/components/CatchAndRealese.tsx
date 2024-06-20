import React, { useEffect, useState } from "react";

import Card, { Pokemon } from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pokemonActions } from "../store/actions/pokemons-actions";
import './Card/style.css';
import { services } from "services/services";
import { RootState } from "store/reducers/root-reducer";
import axios from "axios";


const CatchAndRealese: React.FC = () => {

    const dispatch = useDispatch();
    //const [loading, setLoading] = useState<boolean>(true);
    const loading = useSelector((state: RootState) => state.pokemonsState?.isLoading) || false;
    const pokemons = useSelector((state: RootState) => state.pokemonsState?.pokemons) || [] as Pokemon[];

    useEffect(() => {
        dispatch<any>(pokemonActions.thunkInitPokemons());
        /* setLoading(false); */
    }, [dispatch]);
    
    if (loading) {
        return <div>Loading...</div>;
      }

    console.log(pokemons);

    return (
        <>
            <div className="container">
                <Card pokemons={pokemons} loading={loading} />
            </div>
        </>
    );
};

export default CatchAndRealese;
