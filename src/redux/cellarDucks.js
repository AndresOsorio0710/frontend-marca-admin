import axios from "axios";

const dataInitial = {
    array: [],
    dataEdit: {}
}

const GET_CELLAR_SUCCESS = 'GET_CELLAR_SUCCESS'
const GET_CELLAR_SUCCESS_ID = 'GET_CELLAR_SUCCESS_ID'
const POST_CELLAR_SUCCESS = 'POST_CELLAR_SUCCESS'
const DELETE_CELLAR_SUCCESS = 'DELETE_CELLAR_SUCCESS'

export default function cellarReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_CELLAR_SUCCESS:
            return {...state, array: action.payload};
        case GET_CELLAR_SUCCESS_ID:
            return {...state, dataEdit: action.payload};
        case POST_CELLAR_SUCCESS:
            return {...state, array: action.payload};
        case DELETE_CELLAR_SUCCESS:
            return {...state, array: state.array.filter(array => array.uuid !== action.payload)}
        default:
            return state;
    }
}

export const getCellarAction = () => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_CELLAR_BASE_URL);
        dispatch({type: GET_CELLAR_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export const getCellarActionId = (uuid) => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_CELLAR_BASE_URL + uuid + '/');
        dispatch({type: GET_CELLAR_SUCCESS_ID, payload: answer.data});
    } catch (error) {
        console.log(error)
    }
}

export const postCellarAction = newCellar => async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_CELLAR_BASE_URL, newCellar);
        const answer = await axios.get(process.env.REACT_APP_CELLAR_BASE_URL);
        dispatch({type: POST_CELLAR_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const patchCellarAction = (uuid, cellar) => async (dispatch) => {
    try {
        const response = await axios.patch(process.env.REACT_APP_CELLAR_BASE_URL + uuid + '/', cellar);
        const answer = await axios.get(process.env.REACT_APP_CELLAR_BASE_URL);
        dispatch({type: GET_CELLAR_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteCellarAction = uuid => async (dispatch) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_CELLAR_BASE_URL + uuid + '/');
        dispatch({type: DELETE_CELLAR_SUCCESS, payload: uuid});
    } catch (error) {
        console.log(error);
    }
}