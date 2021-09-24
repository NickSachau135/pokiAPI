import React, { useEffect } from 'react'
import { CgPokemon } from 'react-icons/cg'
import { useGlobalContext } from '../util/context'
import { Link } from 'react-router-dom'

export const Navbar = () => {

    const { allPokemon } = useGlobalContext();

    return (
        <div className='navbar-container'>
            <Link className="home-icon" to="/"><CgPokemon /></Link>
            <div className="navbar">
                <ul>
                    <div className="right">
                        {/* <input type="search" name="search" id="search" placeholder="Search Pokémon" /> */}
                    </div>
                </ul>
            </div>

        </div>
    )
}

export default Navbar