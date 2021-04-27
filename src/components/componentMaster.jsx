import React from "react"
import {BrowserRouter as Router} from "react-router-dom"
import AdminMaster from "./admin/adminMaster";

function ComponentMaster() {
    return (
        <Router>
            <AdminMaster/>
        </Router>
    );
}

export default ComponentMaster;