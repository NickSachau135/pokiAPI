// import React from 'react'
import React, { useEffect } from 'react'

import { useGlobalContext } from '../util/context';
import { useParams } from 'react-router-dom';

const Abilities = () => {
    const { singlePokemon, fetchNewLink, loading } = useGlobalContext();
    const { id } = useParams()
    useEffect(() => {
        fetchNewLink(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    }, [])

    const getProgressColor = (type) => {
        console.log(type)
        switch(type) {
            case 'grass': {
                return '#78C850' 
            }
            case 'fire': {
                return '#F08030'
            }
            case 'poison': {
                return '#A040A0'
            }
            case 'normal': {
                return '#A8A878'
            }
            case 'electric': {
                return '#F8D030'
            }
            case 'ground': {
                return '#E0C068'
            }
            case 'fairy': {
                return '#EE99AC' 
            }
            case 'steel': {
                return '#B8B8D0'
            }
            case 'dark': {
                return '#705848'
            }
            case 'flying': {
                return '#A890F0'
            }
            case 'phychic': {
                return '#F85888'
            }
            case 'water': {
                return '#6890F0'
            }
            case 'bug': {
                return '#A8B820'
            }
            case 'ghost': {
                return '#705898'
            }
            case 'fighting': {
                return '#C03028'
            }
            case 'ice': {
                return '#98D8D8'
            }
            case 'rock': {
                return '#B8A038'
            }
            case 'dragon': {
                return '#7038F8'
            }
        }
    }

    if(loading) {
        return (
            <div className="loading-container">
                <div className="loading">

                </div>
            </div>
        )
    }

    const { id: pokeId, name, types, stats, moves } = singlePokemon

    console.log(moves)

    return <div className="pokemon">
        <div className="name">
            <h2>{name}</h2>
            <p className="type">Type: {types.map((type) => `${type.type.name} `)}</p>
            <p className="id">ID: {pokeId}</p>
        </div>
        
        <img src={`./sprites/sprites/pokemon/${singlePokemon.id}.png`} alt="" />
        <div className="stats">
            {stats.map((stat, index) => {
                return (
                    <div className="stat" key={index}>
                        <h2>{stat.stat.name.toUpperCase()}: {stat.base_stat}</h2>
                        <div className="bar"><div style={{width: `${stat.base_stat}%`, backgroundColor: getProgressColor(types[0].type.name)}} className="progress"></div></div>
                    </div>
                )
            })}
            
        </div>
    </div>

}

export default Abilities
