import React, {useEffect, useState} from "react";
import {useFormik} from 'formik'
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getCellarAction, getProviderAction} from '../../../../redux/productInCellarDucks';
import ProductInCellarDetailForm from "./productInCellarDetailForm";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Escriba un nombre válido.').required('Nombre requerido'),
    cellar: Yup.string().min(2, 'Seleccione una bodega.').required('Seleccione una bodega.'),
    provider: Yup.string().min(2, 'Seleccione un proveedor.').required('Seleccione un proveedor.'),
    cost: Yup.number().min(0, 'Escriba un costo válido.').required('Consto requerido.'),
    quantity_entered: Yup.number().min(1, 'Escriba una cantidad válida.').required('Cantidad requerida.'),
    stop: Yup.number().min(1, 'Escriba una cantidad stop válida.').required('Stop requerido.'),
    description: Yup.string().min(1, 'Escriba una descripción.').required('Descripción requerida.')
});

function ProductInCellarForm({isEdit, isAssociate, data, handleAddOrEdit}) {

    const dispatch = useDispatch();
    const cellars = useSelector((store) => store.pics.array_cellar);
    const providers = useSelector((store) => store.pics.array_provider);

    useEffect(() => {
        dispatch(getCellarAction());
        dispatch(getProviderAction());
    }, [dispatch])

    const handleSubmit = (dataCollection, {resetForm}) => {
        handleAddOrEdit(dataCollection);
        alert('Datos de producto registrada exitosamente.');
        resetForm({});
    };

    const formik = useFormik({
        initialValues: {
            name: isAssociate ? (data.name) : (''),
            cellar: isAssociate ? (data.cellar) : ('1'),
            provider: isAssociate ? (data.provider) : ('1'),
            cost: isAssociate ? (data.cost) : (''),
            quantity_entered: isAssociate ? (data.quantity_entered) : (''),
            stop: isAssociate ? (data.stop) : (''),
            description: isAssociate ? (data.description) : ('Producto en bodega.'),
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className={'row mtop16'}>
            <div className={'col-md-6'}>
                <div className={'panel shadow'}>
                    <div className={'header'}>
                        {isEdit ? (
                            <h2 className={'title'}>
                                <i className={'fas fa-edit'}/> Editar Producto
                            </h2>
                        ) : (
                            <h2 className={'title'}>
                                <i className={'fas fa-dolly'}/> Ingresar Producto
                            </h2>
                        )}
                    </div>
                    <div className={'inside'}>
                        <form onSubmit={formik.handleSubmit}>
                            <label>Nombre del producto:</label>
                            <div className={'input-group'}>
                                <div className={'input-group-prepend'}>
                                    <span className={'input-group-text'}>
                                        <i className={'far fa-keyboard'}/>
                                    </span>
                                </div>
                                <input
                                    type={'text'}
                                    name={'name'}
                                    className={'form-control'}
                                    placeholder={'Escriba un nombre'}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    maxLength={'50'}
                                    disabled={isAssociate}
                                />
                            </div>
                            {formik.errors.name && formik.touched.name ?
                                <div className={'container-fluid warning'}>
                                    <i className={'fas fa-exclamation'}/> {formik.errors.name}
                                </div> : null
                            }
                            <div className={'row mtop16'}>
                                <div className={'col-md-6'}>
                                    <div className={'input-gro'}>
                                        <div className={'input-group-prepend'}>
                                            <label><i className={'fas fa-store'}/> Bodega:</label>
                                        </div>
                                        <select
                                            name={'cellar'}
                                            onChange={formik.handleChange}
                                            className={'custom-select'}
                                            aria-label={'Default select example'}
                                            value={formik.values.cellar}
                                            disabled={isAssociate}
                                        >
                                            <option selected disabled value={'1'}>Seleccionar</option>
                                            {!!cellars && cellars.map((cellar) => (
                                                <option key={cellar.uuid} value={cellar.uuid}>
                                                    {cellar.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {formik.errors.cellar && formik.touched.cellar ?
                                        <div className={'container-fluid warning'}>
                                            <i className={'fas fa-exclamation'}/> {formik.errors.cellar}
                                        </div> : null
                                    }
                                </div>
                                <div className={'col-md-6'}>
                                    <div className={'input-gro'}>
                                        <div className={'input-group-prepend'}>
                                            <label><i className={'fas fa-handshake'}/> Proveedor:</label>
                                        </div>
                                        <select
                                            name={'provider'}
                                            onChange={formik.handleChange}
                                            className={'custom-select'}
                                            aria-label={'Default select example'}
                                            value={formik.values.provider}
                                            disabled={isAssociate}
                                        >
                                            <option selected disabled value={'1'}>Seleccionar</option>
                                            {!!providers && providers.map((provider) => (
                                                <option key={provider.uuid} value={provider.uuid}>
                                                    {provider.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {formik.errors.provider && formik.touched.provider ?
                                        <div className={'container-fluid warning'}>
                                            <i className={'fas fa-exclamation'}/> {formik.errors.provider}
                                        </div> : null
                                    }
                                </div>
                            </div>
                            <div className={'row mtop16'}>
                                <div className={'col-md-4'}>
                                    <label>Costo:</label>
                                    <div className={'input-group'}>
                                        <div className={'input-group-prepend'}>
                                            <span className={'input-group-text'}><i
                                                className={'fas fa-dollar-sign'}/></span>
                                        </div>
                                        <input
                                            type={'number'}
                                            name={'cost'}
                                            className={'form-control'}
                                            placeholder={'Escriba un costo'}
                                            onChange={formik.handleChange}
                                            value={formik.values.cost}
                                            min={'0'}
                                            disabled={isAssociate}
                                        />
                                    </div>
                                    {formik.errors.cost && formik.touched.cost ?
                                        <div className={'container-fluid warning'}>
                                            <i className={'fas fa-exclamation'}/> {formik.errors.cost}
                                        </div> : null
                                    }
                                </div>
                                <div className={'col-md-4'}>
                                    <label>Cnatidad ingresada:</label>
                                    <div className={'input-group'}>
                                        <div className={'input-group-prepend'}>
                                            <span className={'input-group-text'}><i className={'fas fa-dolly'}/></span>
                                        </div>
                                        <input
                                            type={'number'}
                                            name={'quantity_entered'}
                                            className={'form-control'}
                                            placeholder={'Escriba una cantidad '}
                                            onChange={formik.handleChange}
                                            value={formik.values.quantity_entered}
                                            min={'0'}
                                            disabled={isAssociate}
                                        />
                                    </div>
                                    {formik.errors.quantity_entered && formik.touched.quantity_entered ?
                                        <div className={'container-fluid warning'}>
                                            <i className={'fas fa-exclamation'}/> {formik.errors.quantity_entered}
                                        </div> : null
                                    }
                                </div>
                                <div className={'col-md-4'}>
                                    <label>Stop:</label>
                                    <div className={'input-group'}>
                                        <div className={'input-group-prepend'}>
                                            <span className={'input-group-text'}><i
                                                className={'fas fa-exclamation-triangle'}/></span>
                                        </div>
                                        <input
                                            type={'number'}
                                            name={'stop'}
                                            className={'form-control'}
                                            placeholder={'Escriba una cantidad '}
                                            onChange={formik.handleChange}
                                            value={formik.values.stop}
                                            min={'0'}
                                            disabled={isAssociate}
                                        />
                                    </div>
                                    {formik.errors.stop && formik.touched.stop ?
                                        <div className={'container-fluid warning'}>
                                            <i className={'fas fa-exclamation'}/> {formik.errors.stop}
                                        </div> : null
                                    }
                                </div>
                            </div>
                            <div className={'row mtop16'}>
                                <div className={'col-md-12'}>
                                    <label>Descripción:</label>
                                    <textarea
                                        rows={'4'}
                                        type={'text'}
                                        name={'description'}
                                        className={'form-control'}
                                        placeholder={'Escriba una descripcón'}
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        disabled={isAssociate}
                                    />
                                </div>
                            </div>
                            {formik.errors.description && formik.touched.description ?
                                <div className={'container-fluid warning'}>
                                    <i className={'fas fa-exclamation'}/> {formik.errors.description}
                                </div> : null
                            }
                            <div className={'row mtop16'}>
                                <div className={'col-md-12'}>
                                    <button
                                        type={'submit'}
                                        className={'btn btn-success'}
                                        title={!isEdit ? 'Ingresar producto en bodega' : 'Guardar cambios'}
                                        disabled={isAssociate}
                                    >
                                        {!isEdit ? 'Ingresar producto' : 'Guardar cambios'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={'col-md-6'}>
                {isAssociate ? <ProductInCellarDetailForm data={data}/> : <></>}
            </div>
        </div>
    );
};

export default ProductInCellarForm;