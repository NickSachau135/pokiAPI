export const reducer = (state, dispatch) => {
    switch(dispatch.type) {
        case 'SET_LOADING': {
            return{ ...state, loading: true}
        }
        case 'REMOVE_LOADING': {
            return { ...state, loading: false}
        }
        case 'SET_POKEMON': {
            return{ ...state, pokemon: dispatch.payload, loading: false }
        }
        case 'SET_ABILITIES': {
            return { ...state, abilities: dispatch.payload, loading: false }
        }
        case 'PREV_PAGE': {
            switch(state.page) {
                case 0: {
                    return { ...state, page: 44}
                }
                default: {
                    return { ...state, page: state.page - 1 }
                }
            }
        }
        case 'NEXT_PAGE': {
            switch(state.page) {
                case 44: {
                    return { ...state, page: 0}
                }
                default: {
                    return { ...state, page: state.page + 1 }
                }
            }
        }
        case 'SET_POKEMON_SPRITES': {
            return { ...state, sprites: dispatch.payload }
        }
        case 'SET_SINGLE_POKEMON': {
            return { ...state, singlePokemon: dispatch.payload, loading: false }
        }
        case 'SET_ALL_POKEMON': {
            return { ...state, allPokemon: dispatch.payload }
        }
        default :{
            console.log('dispactch not defined')
        }
    }
}