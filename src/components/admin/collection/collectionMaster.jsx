import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import {CollectionContent} from "./collectionContent";

function CollectionMaster() {
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
                                <a href="/admin/collection/" className="">
                                    / <i className="fas fa-boxes"/> Colecciones
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Switch>
                    <Route exact path={'/admin/collection/'} component={CollectionContent}/>
                    <Route path={'/admin/collection/:id'} component={CollectionContent}/>
                </Switch>
            </div>
        </Router>
    );
};

export default CollectionMaster;