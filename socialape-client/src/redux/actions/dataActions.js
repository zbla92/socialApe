import { LOADING_UI, SET_SCREAMS } from '../types';
import axios from 'axios';

export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get('/screams')
    .then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    })
} 
