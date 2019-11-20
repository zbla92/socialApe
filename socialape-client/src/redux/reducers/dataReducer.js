import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM} from '../types';

const initialState= {
    screams: [],
    scream: {},
    loading: false
}


export default function(state = initialState, action){
    let index;
    switch(action.type){
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload;
            return {
                ...state
            }
        case LOADING_DATA:
           return{
            ...state,
            loading: true
           } 
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index, 1);
            return {
                ...state
            }
        default:
                return {
                    ...state, 

                }
    }
}