// import React from 'react'
import React, { useEffect, useReducer, useState } from 'react'

import { useGlobalContext } from '../util/context';
import { useParams } from 'react-router-dom';

import { Checkbox, FormControl, Select, MenuItem, InputLabel } from '@mui/material'

const Abilities = () => {
    const { singlePokemon, fetchNewLink, loading, setLoading } = useGlobalContext();
    const { id } = useParams()
    useEffect(() => {
        fetchNewLink(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    }, [])

    const [age, setAge] = useState('')

    const handleChange = (event) => {
        setAge(event.target.value)
    }

    const getProgressColor = (type) => {
        switch (type) {
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

    const ITEM_HEIGHT = 8
    const ITEM_PADDING_TOP = 8

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">

                </div>
            </div>
        )
    }

    const { id: pokeId, name, types, stats, moves, game_indices: games, is_default, weight, height } = singlePokemon

    return (
        <div className="pokemon">
            <Checkbox checked />
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-label">Game Version</InputLabel>
                <Select MenuProps={MenuProps} labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Game Version" onChange={handleChange}>
                    <MenuItem value={''}>Game Version</MenuItem>
                    <MenuItem value={10}>Gold-Silver</MenuItem>
                    <MenuItem value={20}>Crystal</MenuItem>
                    <MenuItem value={30}>Red-Blue</MenuItem>
                    <MenuItem value={40}>Yellow</MenuItem>
                    <MenuItem value={50}>Emerald</MenuItem>
                    <MenuItem value={60}>FireRed-LeafGreen</MenuItem>
                    <MenuItem value={70}>Diamond-Pearl</MenuItem>
                    <MenuItem value={80}>Platinum</MenuItem>
                    <MenuItem value={90}>Heartgold-Soulsilver</MenuItem>
                    <MenuItem value={100}>Black-White</MenuItem>
                    <MenuItem value={110}>Black-White2</MenuItem>
                    <MenuItem value={120}>X-Y</MenuItem>
                </Select>
            </FormControl>
            <div className="name">
                <h2>{name}</h2>
                <p>Height: {height}</p>
                <p className="type">Type: {types.map((type, index) => {
                    return (
                        <span key={index}>{`${type.type.name} `}</span>
                    )
                })}</p>
                <p className="id">ID: {pokeId}</p>
                <p>weight: {weight}</p>
                <p className='is-default'>Is Default: {is_default ? <input type='checkbox' checked disabled /> : <input type='checkbox' disabled />}</p>
            </div>

            <div className="abilities">

            </div>

            <div className="games">
                {games.length === 0 ? 'No Data Available' : games.map((game, index) => {
                    return (
                        <p index={index}>Index in {game.version.name}: {game.game_index}</p>
                    )
                })}
            </div>

            <div className="moves">
                {moves.length === 0 ? 'No Moves Available' : moves.map((move, index) => {
                    const { version_group_details } = move;

                    return (
                        <div className="move" key={index}>
                            <h2 className='move-name'>{move.move.name}</h2>
                            {version_group_details.map((version, index) => {
                                return (
                                    <div key={index} className='optained'>
                                        <p>Aquired at level: <span className='level'>{version.level_learned_at}</span></p>
                                        <p>In Game: <span className='game'>{version.version_group.name}</span></p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>

            <img src={`./sprites/sprites/pokemon/${singlePokemon.id}.png`} alt="" />

            <div className="stats">
                {stats.map((stat, index) => {
                    return (
                        <div className="stat" key={index}>
                            <h2>{stat.stat.name.toUpperCase()}: {stat.base_stat}</h2>
                            <div className="bar"><div style={{ width: `${stat.base_stat}%`, backgroundColor: getProgressColor(types[0].type.name) }} className="progress"></div></div>
                        </div>
                    )
                })}

            </div>
        </div>
    )

}

export default Abilities
