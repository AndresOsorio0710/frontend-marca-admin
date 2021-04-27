import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import {ProviderContent} from "./providerContent";

function ProviderMaster() {
    return (
        <Router>
            <div className={'page'}>
                <div className={'container-fluid'}>
                    <nav aria-label={'breadcrumb shadow'}>
                        <ol className={'breadcrumb'}>
                            <li className={'breadcrumb-item'}>
                                <a href={'/admin/home/'} className="">
                                    <i className={'fas fa-home'}/> Home
                                </a>
                                <a href={'/admin/provider/'} className="">
                                    / <i className={'fas fa-handshake'}/> Proveedores
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Switch>
                    <Route exact path={'/admin/provider/'} component={ProviderContent}/>
                    <Route path={'/admin/provider/:id'} component={ProviderContent}/>
                </Switch>
            </div>
        </Router>
    );
}

export default ProviderMaster;