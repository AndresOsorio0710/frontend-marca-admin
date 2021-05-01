import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import React from "react";
import {NavDropdown} from "react-bootstrap";
import {ProductInCellarContent} from "./productInCellar/productInCellarContent";

//import {PSContent} from "./productSale/productSaleContent";

function ProductMaster() {

    return (
        <Router>
            <div className={'page'}>
                <div className={'container-fluid'}>
                    <nav aria-label={'breadcrumb shadow'}>
                        <ol className={'breadcrumb'}>
                            <li className="breadcrumb-item">
                                <a href="/admin/home/" className="">
                                    <i className="fas fa-home"/> Home
                                </a>
                                <a href="/admin/product/" className="">
                                    / <i className={'fas fa-box-open'}/> Productos
                                </a>
                            </li>
                        </ol>
                    </nav>
                    <div className={'panel shadow'}>
                        <div className={'inside'}>
                            <nav className={'nav nav-pills nav-fill'}>
                                <NavDropdown
                                    bsPrefix={'nav-link fas fa-dolly-flatbed'}
                                    title={' Productos en bodega'}
                                >
                                    <NavDropdown.Item href={'/admin/product/cellar/form/'} eventKey={'4.1'}>
                                        <i className={'fas fa-dolly'}/> Ingesar producto a bodega
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={'/admin/product/cellar/list/'} eventKey={'4.2'}>
                                        <i className={'fas fa-layer-group'}/> Ver productos en bodega
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    bsPrefix={'nav-link fas fa-lightbulb'}
                                    title={' Productos MARCA'}
                                >
                                    <NavDropdown.Item href={'/admin/product/marca/form'} eventKey={'4.1'}>
                                        <i className={'fas fa-plus'}/> Crear producto MARCA
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={'/admin/product/marca/list'} eventKey={'4.2'}>
                                        <i className={'fas fa-layer-group'}/> Ver productos MARCA
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </nav>
                        </div>
                    </div>
                </div>
                <Route path={'/admin/product/cellar/'} component={ProductInCellarContent}/>
                {//<Route path={'/admin/product/marca/'} component={PSContent}/>
                }
            </div>
        </Router>
    );
};

export default ProductMaster;