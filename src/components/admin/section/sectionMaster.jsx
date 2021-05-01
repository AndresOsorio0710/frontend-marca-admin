import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import {SectionContent} from "./sectionContent";

function SectionMaster() {
    return (
        <Router>
            <div className={'page'}>
                <div className="container-fluid">
                    <nav aria-label="breadcrumb shadow">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/admin/home/" className="">
                                    <i className="fas fa-home"/> Home
                                </a>
                                <a href="/admin/section/" className="">
                                    / <i className="far fa-folder"/> Secciones
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Switch>
                    <Route exact path={'/admin/section/'} component={SectionContent}/>
                    <Route path={'/admin/section/:id'} component={SectionContent}/>
                </Switch>
            </div>
        </Router>
    );
};

export default SectionMaster;