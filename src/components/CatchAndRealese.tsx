import React, { useEffect, useState } from "react";

import Card, { Pokemon } from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pokemonActions } from "../store/actions/pokemons-actions";
import './Card/style.css';
import { services } from "services/services";
import { RootState } from "store/reducers/root-reducer";
import axios from "axios";


const CatchAndRealese: React.FC = () => {

    /* const [pokeData, setPokeData] = useState<Pokemon[]>([]);
    const loading = useSelector((state: RootState) => state.pokemonsState?.isLoading) || false; 
    const pokemons = useSelector((state: RootState) => state.pokemonsState?.pokemons) || [] as Pokemon[];

    useEffect(() => {
        if (pokemons) {
            setPokeData(pokemons);
        }
    }, [loading]);

    console.log(pokeData); */

    const [pokeData, setPokeData] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");


    const pokeFunc = async () => {
        const res = await axios.get(url);

        getPokemonData(res.data.results);
        setLoading(false);
    };

    const getPokemonData = async (res: Pokemon[]) => {
        res.map(async (item) => {
            const result = await axios.get(item.url);
            // console.log("MAP DATA", result.data);
            setPokeData((state) => {
                state = [...result.data];
                state.sort((a, b) => a.id > b.id ? 1 : -1);
                return state;
            });
        })
    };


    useEffect(() => {
        pokeFunc()
    }, [url]);

    console.log(pokeData);

    return (
        <>
            <div className="container">
                <Card pokemons={pokeData} loading={loading} />
                {/* <div className="btn-div">
                    <button
                        type="button"
                        disabled={disable}
                        className="btn btn-func"
                        onClick={() => {
                            setPokeData([]);
                            if (prevUrl) setUrl(prevUrl); 
                        }} 
                    >
                        Previous
                    </button>&nbsp;&nbsp;
                    <button
                        type="button"
                        className="btn btn-func"
                        onClick={() => {
                            setPokeData([]);
                            if (nextUrl) setUrl(nextUrl);
                        }} 
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </>
    );
};

export default CatchAndRealese;
