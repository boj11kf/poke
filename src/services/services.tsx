import axios, { AxiosResponse } from "axios";
import { Pokemon } from '../types';

export interface PokeAPIResponse {
    [string: string]: any;
}

export const services = {

    get: async (url:string) => {
        try {
            const authToken = localStorage.getItem('token');
            //if (!authToken) { throw new Error("Authentication token not found.");}
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) { await getErrorMessage(url, response);}

            return response;
        } catch (error) {
            throw new Error(`Error in getData: ${error}`);
        }
    },

    post: async (url:string, payload:any) => {
        try {
            const authToken = localStorage.getItem('token');
            //if (!authToken) { throw new Error("Authentication token not found.");}
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) { await getErrorMessage(url, response);}

            return response;
        } catch (error) {
            throw new Error(`Error in postData: ${error}`);
        }
    },

    put: async (url:string, payload:any) => {
        try {
            const authToken = localStorage.getItem('token');
            //if (!authToken) { throw new Error("Authentication token not found.");}
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) { await getErrorMessage(url, response);}

            return response;
        } catch (error) {
            throw new Error(`Error in putData: ${error}`);
        }
    },

    delete: async (url:string, payload:any) => {
        try {
            const authToken = localStorage.getItem('token');
            //if (!authToken) { throw new Error("Authentication token not found.");}
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) { await getErrorMessage(url, response);}

            return response;
        } catch (error) {
            throw new Error(`Error in deleteData: ${error}`);
        }
    }
};

export const pokemonServices = {
    
    get: async (url: string) => {
        return await axios.get<PokeAPIResponse>(url);
    },

    getPokemonData: async (results: Pokemon[]): Promise<AxiosResponse<any>[]> => {
        const promises = results.map(item => axios.get(item.url));
        return await Promise.all(promises);
    },
};

const getErrorMessage = async (url: string, response: Response) => {
    let errorMessage = `getData ERROR url: ${url} status: ${response.status} `;
    try {
        const errorPayload = await response.json();
        errorMessage += `payload: ${JSON.stringify(errorPayload)}`;
    } catch (error) {
        errorMessage += `error parsing payload: ${error}`;
    }
    throw new Error(errorMessage);
};