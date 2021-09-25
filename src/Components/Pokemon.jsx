import React from 'react'
import { useGlobalContext } from '../util/context';
import { Link } from 'react-router-dom'
// import Abilities from './Abilities';

// import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { BsInfo } from 'react-icons/bs'

const Pokemon = () => {
    const { stopLoading, loading, pokemon, page, nextPage, prevPage, setLoading } = useGlobalContext();

    if (loading) {
        return <div className="loading-container">
            <div className="loading"></div>
        </div>
    }

    return (
        <div id="pokemon" onLoad={stopLoading} className='pokemon'>
            {pokemon.map((poke, index) => {
                if (poke.name === 'deoxys-attack' || poke.name === 'deoxys-defense') {
                    return (
                        <div className="hidden"></div>
                    )
                }
                return (
                    <div key={index} className="pokedex">
                        <div className="pokemon-img-container">
                            <img className="pokemon-img" src={`./sprites/sprites/pokemon/${index + 1 + (page * 20)}.png`} alt={`${poke.name} pokemon sprite`} />
                        </div>
                        <h2 className='pokemon-name'>{poke.name}</h2>
                        <div className="controlls-container">
                            <div className="controlls">
                                <div className="plusVert"></div>
                                <div className="plusHorz"></div>
                            </div>
                            <Link to={`/${poke.name}`} onClick={setLoading} className="more-info"><BsInfo /></Link>
                        </div>
                    </div>

                )
            })}

            <div className="buttons-container">
                <div onClick={prevPage} href='#pokemon' className='prev-button-container'>
                    <button className='btn'>Prev Page</button>
                    <GrFormPrevious />
                </div>
                <p className='page-nbr'>{page + 1} of 45</p>
                <div onClick={nextPage} className='next-button-container'>
                    <button className='btn'>Next Page</button>
                    <GrFormNext />
                </div>
            </div>
        </div>
    )
}

export default Pokemon
