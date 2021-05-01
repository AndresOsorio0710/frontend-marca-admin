import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import logo from "./../../images/logoMarca.png";
import CellarMaster from "./cellar/cellarMaster";
import ProviderMaster from "./provider/providerMaster";
import SectionMaster from "./section/sectionMaster";
import CollectionMaster from "./collection/collectionMaster";
import ProductMaster from "./product/productMaster";


function AdminMaster() {
    return (
        <Router>
            <div className="wrapper">
                <div className="col1">
                    <div className="sidebar shadow">
                        <div className="section-top">
                            <div className="logo">
                                <img src={logo} alt="logo" className="img-fluid"/>
                            </div>
                            <div className="user">
                                <span className="subtitle">Hola</span>
                                <div className="name">
                                    Andres Osorio
                                    <a
                                        href="/admin/home"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Salir"
                                    >
                                        <i className="fas fa-sign-out-alt"/>
                                    </a>
                                </div>
                                <div className="email">andres@gmail.com</div>
                            </div>
                        </div>
                        <div className="main">
                            <ul>
                                <li>
                                    <Link to="/admin/home/">
                                        <i className="fas fa-home"/> Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/cellar/">
                                        <i className="fas fa-store"/> Bodegas
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/provider/">
                                        <i className="fas fa-handshake"/> Proveedores
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/section/">
                                        <i className="far fa-folder"/> Secciones
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/collection/">
                                        <i className="fas fa-boxes"/> Colecciones
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/product/">
                                        <i className="fas fa-box-open"/> Productos
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col2">
                    <Route exact path={'/admin/cellar/'} component={CellarMaster}/>
                    <Route exact path={'/admin/provider/'} component={ProviderMaster}/>
                    <Route exact path={'/admin/section/'} component={SectionMaster}/>
                    <Route exact path={'/admin/collection/'} component={CollectionMaster}/>
                    <Route path={'/admin/product/'} component={ProductMaster}/>
                </div>
            </div>
        </Router>
    );
}

export default AdminMaster;
