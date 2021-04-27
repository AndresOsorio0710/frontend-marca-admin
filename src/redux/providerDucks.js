import axios from 'axios'

const dataInitial = {
    array: [],
    dataEdit: {}
}

const GET_PROVIDER_SUCCESS = 'GET_PROVIDER_SUCCESS'
const GET_PROVIDER_SUCCESS_ID = 'GET_PROVIDER_SUCCESS_ID'
const POST_PROVIDER_SUCCESS = 'POST_PROVIDER_SUCCESS'
const DELETE_PROVIDER_SUCCESS = 'DELETE_PROVIDER_SUCCESS'

export default function providerReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_PROVIDER_SUCCESS:
            return {...state, array: action.payload};
        case GET_PROVIDER_SUCCESS_ID:
            return {...state, dataEdit: action.payload};
        case POST_PROVIDER_SUCCESS:
            return {...state, array: action.payload};
        case DELETE_PROVIDER_SUCCESS:
            return {...state, array: state.array.filter(array => array.uuid !== action.payload)};
        default:
            return state;
    }
}

export const getProviderAction = () => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_PROVIDER_BASE_URL);
        dispatch({type: GET_PROVIDER_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const getProviderActionId = (uuid) => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_PROVIDER_BASE_URL + uuid + '/');
        dispatch({type: GET_PROVIDER_SUCCESS_ID, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const postProviderAction = newProvider => async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_PROVIDER_BASE_URL, newProvider);
        const answer = await axios.get(process.env.REACT_APP_PROVIDER_BASE_URL);
        dispatch({type: POST_PROVIDER_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const patchProviderAction = (uuid, provider) => async (dispatch) => {
    try {
        const data = await axios.patch(`${process.env.REACT_APP_PROVIDER_BASE_URL}${uuid}/`, provider);
        const answer = await axios.get(process.env.REACT_APP_PROVIDER_BASE_URL);
        dispatch({type: GET_PROVIDER_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteProviderAction = uuid => async (dispatch) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_PROVIDER_BASE_URL + uuid + '/');
        dispatch({type: DELETE_PROVIDER_SUCCESS, payload: uuid});
    } catch (error) {
        console.log(error);
    }
}