import axios from 'axios'

const dataInitial = {
    array: [],
    dataEdit: {}
}

const GET_COLLECTION_SUCCESS = 'GET_COLLECTION_SUCCESS'
const GET_COLLECTION_SUCCESS_ID = 'GET_COLLECTION_SUCCESS_ID'
const POST_COLLECTION_SUCCESS = 'POST_COLLECTION_SUCCESS'
const DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS'


export default function collectionReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_COLLECTION_SUCCESS:
            return {...state, array: action.payload};
        case GET_COLLECTION_SUCCESS_ID:
            return {...state, dataEdit: action.payload};
        case POST_COLLECTION_SUCCESS:
            return {...state, array: action.payload};
        case DELETE_COLLECTION_SUCCESS:
            return {...state, array: state.array.filter(array => array.uuid !== action.payload)};
        default:
            return state
    }
}

export const getCollectionAction = () => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_COLLECTION_BASE_URL);
        dispatch({type: GET_COLLECTION_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const getCollectionActionId = (uuid) => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_COLLECTION_BASE_URL + uuid + '/');
        dispatch({type: GET_COLLECTION_SUCCESS_ID, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const postCollectionAction = newCollection => async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_COLLECTION_BASE_URL, newCollection);
        const answer = await axios.get(process.env.REACT_APP_COLLECTION_BASE_URL);
        dispatch({type: POST_COLLECTION_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const patchCollectionAction = (uuid, collection) => async (dispatch) => {
    try {
        const data = await axios.patch(`${process.env.REACT_APP_COLLECTION_BASE_URL}${uuid}/`, collection);
        const answer = await axios.get(process.env.REACT_APP_COLLECTION_BASE_URL);
        dispatch({type: GET_COLLECTION_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteCollectionAction = collection => async (dispatch) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_COLLECTION_BASE_URL + collection + '/');
        dispatch({type: DELETE_COLLECTION_SUCCESS, payload: collection});
    } catch (error) {
        console.log(error);
    }
}