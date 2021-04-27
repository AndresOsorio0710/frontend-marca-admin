import React from "react";
import {Provider} from "react-redux";
import ComponentMaster from "./components/componentMaster";
import generateStore from "./redux/store";


function App() {

    const store = generateStore();

    return (
        <Provider store={store}>
            <ComponentMaster/>
        </Provider>
    )
}

export default App;