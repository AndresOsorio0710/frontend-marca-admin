import axios from 'axios'

const dataInitial = {
    array_product: [],
    array_cellar: [],
    array_provider: [],
    array_detail: [],
    data_edit: {}
}

const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
const GET_PRODUCT_SUCCESS_ID = 'GET_PRODUCT_SUCCESS_ID'
const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS'
const POST_DETAIL_SUCCESS = 'POST_DETAIL_SUCCESS'
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
const GET_CELLAR_SUCCESS = 'GET_CELLAR_SUCCESS'
const GET_PROVIDER_SUCCESS = 'GET_PROVIDER_SUCCESS'
const GET_DETAIL_SUCCESS = 'GET_DETAIL_SUCCESS'

export default function productoInCellarReducer(state = dataInitial, action) {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS:
            return {...state, array_product: action.payload}
        case GET_CELLAR_SUCCESS:
            return {...state, array_cellar: action.payload}
        case GET_PROVIDER_SUCCESS:
            return {...state, array_provider: action.payload}
        case GET_PRODUCT_SUCCESS_ID:
            return {...state, data_edit: action.payload}
        case GET_DETAIL_SUCCESS:
            return {...state, array_detail: action.payload}
        case POST_PRODUCT_SUCCESS:
            return {...state, array_product: action.payload}
        case POST_DETAIL_SUCCESS:
            return {...state, data_edit: action.payload}
        case DELETE_PRODUCT_SUCCESS:
            return {...state, array_product: state.array_product.filter(array => array.uuid !== action.payload)}
        default:
            return state
    }
}

export const getProductoInCellarAction = () => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL)
        dispatch({type: GET_PRODUCT_SUCCESS, payload: answer.data})
    } catch (error) {
        console.log(error)
    }
}

export const getCellarAction = () => async (dispatch, getState) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_CELLAR_LITE_BASE_URL)
        dispatch({
            type: GET_CELLAR_SUCCESS,
            payload: answer.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getProviderAction = () => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_PROVIDER_LITE_BASE_URL)
        dispatch({type: GET_PROVIDER_SUCCESS, payload: answer.data})
    } catch (error) {
        console.log(error)
    }
}

export const getProductInCellarDetailForPICId = (uuid) => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_PRODUCT_IN_CELLAR_DETAIL_BASE_URL + uuid + '/pic/size/')
        dispatch({type: GET_DETAIL_SUCCESS, payload: answer.data})
    } catch (error) {
        console.log(error)
    }
}

export const getProductoInCellarActionId = (uuid) => async (dispatch) => {
    try {
        const answer = await axios.get(process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL + uuid + '/')
        dispatch({type: GET_PRODUCT_SUCCESS_ID, payload: answer.data})
    } catch (error) {
        console.log(error)
    }
}

export const postProductoInCellarAction = newProductoInCellar => async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL, newProductoInCellar)
        const answer = await axios.get(process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL)
        console.log("Responce: ", response)
        dispatch({type: POST_PRODUCT_SUCCESS, payload: answer.data})
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const postProductoInCellarDetailAction = newProductoInCellarDetail => async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_PRODUCT_IN_CELLAR_DETAIL_BASE_URL, newProductoInCellarDetail);
        const answer = await axios.get(process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL + newProductoInCellarDetail.product_in_cellar + '/');
        console.log(answer);
        dispatch({type: POST_PRODUCT_SUCCESS, payload: answer.data})
        alert('Producto asociado correctamente.\n' + response.status.toString() +
            '\nCantidad ingresada: ' + answer.data.quantity_entered +
            '\nCantidad asociada: ' + answer.data.free_quantity);
    } catch (error) {
        alert('Error:' + error);
        console.log("Error: ", error);
    }
}

export const editPostProductoInCellarAction = (uuid, productoInCellar) => async (dispatch) => {

    const data = await axios.patch(`${process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL}${uuid}/`, productoInCellar)
    const answer = await axios.get(process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL)
    dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: answer.data
    })
}

export const deleteProductoInCellarAction = productoInCellar => async (dispatch) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_PRODUCT_IN_CELLAR_BASE_URL + productoInCellar + '/')
        dispatch({type: DELETE_PRODUCT_SUCCESS, payload: productoInCellar})
    } catch (error) {
        console.log(error);
    }
}