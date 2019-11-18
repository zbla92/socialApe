import { SET_SCREAMS } from '../types';

const initialState= {
    screams: []
}


export default function(state = initialState, action){
    switch(action.type){
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload
            }
            default:
                return state
    }
}