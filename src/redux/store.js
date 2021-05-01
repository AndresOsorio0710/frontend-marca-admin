import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunck from 'redux-thunk';
import cellarReducer from "./cellarDucks";
import providerReducer from "./providerDucks";
import sectionReducer from "./sectionDucks";
import collectionReducer from "./collectionDucks";
import productInCellarReducer from "./productInCellarDucks";
//import productSaleReducer from "./productSaleDucks";

const rootReducer = combineReducers({
    cellars: cellarReducer,
    providers: providerReducer,
    sections: sectionReducer,
    collections: collectionReducer,
    pics: productInCellarReducer
    //pss: productSaleReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunck)))
    return store;
}