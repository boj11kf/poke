import React, { useEffect, useState } from "react";
import axios from "axios";
import Card, { Pokemon } from "../components/Card/Card";
import logo from '../poke-logo.jpeg';
import './Card/style.css';

/* interface Pokemon {
  id: number;
  name: string;
  url: string;
  [key: string]: any; // This allows other properties
} */

interface PokeAPIResponse {
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

const CatchAndRealese: React.FC = () => {
    const [pokeData, setPokeData] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [disable, setDisable] = useState<boolean>(true);

    const pokeFunc = async () => {
        const res = await axios.get<PokeAPIResponse>(url);

        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        await getPokemonData(res.data.results);
        setLoading(false);

        if (res.data.previous !== null) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    };

    const getPokemonData = async (results: Pokemon[]) => {
        const pokemonData = await Promise.all(
            results.map(async (item) => {
                const result = await axios.get<Pokemon>(item.url);
                return result.data;
            })
        );

        setPokeData((state) => {
            state = [...state, ...pokemonData];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            return state;
        });
    };

    useEffect(() => {
        pokeFunc();
    }, [url]);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand poke-nav" href="#">
                    <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="" />&nbsp;
                    Poke App
                </a>
            </nav>
            <div className="container">
                <Card pokemon={pokeData} loading={loading}></Card>
                <div className="btn-div">
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
                </div>
            </div>
        </>
    );
};

export default CatchAndRealese;
