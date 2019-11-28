import { LOADING_DATA, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, POST_SCREAM, SET_SCREAM, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types';
import axios from 'axios';

export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
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

export const getScream = (screamId) => dispatch => {
    dispatch({type: LOADING_UI})
    axios.get(`scream/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => {
            console.log(err.response.data)
        })
}

// Post scream
export const postScream = newScream => dispatch => {
    console.log(newScream)
    dispatch({ type: LOADING_UI })
    axios.post(`/scream`, {body: newScream})
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// Like a scream
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then( res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err =>{
            console.log(err)
        })
}

// Unlike a scream
export const unlikeScream = screamId => dispatch =>{
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteScream = screamId => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({ 
                type: DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch( err => console.log(err))
}

export const submitComment = (screamId, commentData) => dispatch => {
    axios.post(`/scream/${screamId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS})
}