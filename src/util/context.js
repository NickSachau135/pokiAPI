import React, { useReducer, useContext, useEffect } from 'react'
import { reducer } from './useReducer'

const defaultState = {
    loading: true,
    pokemon: {},
    abilities: {},
    page: 0,
    theme: true,
    sprites: {},
    allPokemon: {},
    singlePokemon: {},
    query: '',
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const fetchPokemon = async(url) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({ type: 'SET_POKEMON', payload: data.results })
        } catch (err) {
            console.error(err)
        }
    }

    const fetchAbilities = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            // dispatch({ type: 'SET_ABILITIES', payload: data.abilities});
        } catch (err) {
            console.error(err);
        }
    }

    const nextPage = () => {
        dispatch({ type: 'NEXT_PAGE' })
        const pokemon = document.querySelector('#pokemon')
        pokemon.scrollTop = 0;
    }

    const prevPage = () => {
        dispatch({ type: 'PREV_PAGE' })
        const pokemon = document.querySelector('#pokemon')
        pokemon.scrollTop = 0;
    }

    const stopLoading = () => {
        dispatch({ type: "REMOVE_LOADING" })
    }

    const getPokemonSprite = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({type: 'SET_POKEMON_SPRITES', payload: data.sprites})
        } catch (err) {
            console.error(err)
        }
    }

    const fetchNewLink = async (url) => {
        dispatch({ type: 'SET_LOADING' });  
        try{
            const response = await fetch(url);
            const data = await response.json();
            dispatch({type: 'SET_SINGLE_POKEMON', payload: data})
        } catch (err) {
            console.error(err)
        }
    }

    const fetchAllPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1118`);
            const data = await response.json();
            dispatch({ type: 'SET_ALL_POKEMON', payload: data.results })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchAllPokemon()
        fetchPokemon(`https://pokeapi.co/api/v2/pokemon?offset=${state.page * 20}&limit=20`);
    }, [state.page]);

    return <AppContext.Provider value={{ ...state, fetchNewLink, stopLoading, fetchAllPokemon, fetchAbilities, nextPage, prevPage, getPokemonSprite }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}