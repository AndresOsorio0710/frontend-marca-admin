import axios from 'axios'

const dataInitial = {
    array: [],
    dataEdit: {}
}

const GET_SECTION_SUCCESS = 'GET_SECTION_SUCCESS'
const GET_SECTION_SUCCESS_ID = 'GET_SECTION_SUCCESS_ID'
const POST_SECTION_SUCCESS = 'POST_SECTION_SUCCESS'
const DELETE_SECTION_SUCCESS = 'DELETE_SECTION_SUCCESS'


export default function sectionReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_SECTION_SUCCESS:
            return {...state, array: action.payload}
        case GET_SECTION_SUCCESS_ID:
            return {...state, dataEdit: action.payload}
        case POST_SECTION_SUCCESS:
            return {...state, array: [...state.array, action.payload]}
        case DELETE_SECTION_SUCCESS:
            return {...state, array: state.array.filter(array => array.uuid !== action.payload)}
        default:
            return state
    }
}

export const getSectionAction = () => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_SECTION_BASE_URL);
        dispatch({type: GET_SECTION_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const getSectionActionId = (uuid) => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_SECTION_BASE_URL + uuid + '/');
        dispatch({type: GET_SECTION_SUCCESS_ID, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}
export const postSectionAction = newSection => async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_SECTION_BASE_URL, newSection);
        dispatch({type: POST_SECTION_SUCCESS, payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

export const patchSectionAction = (uuid, section) => async (dispatch) => {
    try {
        const data = await axios.patch(`${process.env.REACT_APP_SECTION_BASE_URL}${uuid}/`, section);
        const answer = await axios.get(process.env.REACT_APP_SECTION_BASE_URL);
        dispatch({type: GET_SECTION_SUCCESS, payload: answer.data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteSectionAction = section => async (dispatch) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_SECTION_BASE_URL + section + '/');
        dispatch({type: DELETE_SECTION_SUCCESS, payload: section});
    } catch (error) {
        console.log(error);
    }
}