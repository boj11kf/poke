import React, { useEffect, useState } from "react";

import Card, { Pokemon } from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pokemonActions } from "../store/actions/pokemons-actions";
import './Card/style.css';
import { services } from "services/services";
import { RootState } from "store/reducers/root-reducer";
import axios from "axios";


const CatchAndRealese: React.FC = () => {

    const [pokeData, setPokeData] = useState<Pokemon[]>([]);
    //const pokeData: Pokemon[] = useSelector((state: RootState) => state.pokemonsState.pokemons);
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch();

    console.log(pokeData);

    return (
        <>
            <div className="container">
                <Card pokemons={pokeData} loading={loading}/>
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
