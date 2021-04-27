import Resact from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {CellarContent} from "./cellarContent";


function CellarMaster() {
    return (
        <Router>
            <div className={'page'}>
                <div className={'container-fluid'}>
                    <nav aria-label={'breadcrumb shadow'}>
                        <ol className={'breadcrumb'}>
                            <li className={'breadcrumb-item'}>
                                <a href="/admin/home">
                                    <i className={'fas fa-home'}> Home</i>
                                </a>
                                <a href="/admin/cellar/">
                                    / <i className={'fas fa-store'}> Bodega</i>
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Switch>
                    <Route exact path={'/admin/cellar/'} component={CellarContent}/>
                    <Route path={'/admin/cellar/:id'} component={CellarContent}/>
                </Switch>
            </div>
        </Router>
    );
}

export default CellarMaster;