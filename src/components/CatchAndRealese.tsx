import React, { useEffect, useState } from "react";
import axios from "axios";
import Card, { Pokemon } from "../components/Card/Card";
import './Card/style.css';

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

        const pokemonsWithoutRepetitiveElement = Array.from(new Set(pokemonData)) as Pokemon[];

        setPokeData((state) => {
            state = [...pokemonData];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            return state;
        });
    };

    useEffect(() => {
        pokeFunc();
    }, [url]);

    return (
        <>
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
