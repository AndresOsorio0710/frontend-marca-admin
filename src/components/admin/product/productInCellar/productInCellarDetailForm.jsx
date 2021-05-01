import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getProductoInCellarActionId, postProductoInCellarDetailAction} from "../../../../redux/productInCellarDucks";

const validationSchema = Yup.object().shape({
    size: Yup.string().min(2, 'Seleccione una talla.').required('Seleccione una talla.'),
    state: Yup.string().min(2, 'Seleccione un estado.').required('Seleccione un estado.'),
    info: Yup.string().min(1, 'Escriba un informacion relacionada.').required('Descripción requerida.')
});

function ProductInCellarDetailForm({data}) {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log('Cargar detalles.');
    }, dispatch);

    const handleSubmit = (dataCollection, {resetForm}) => {
        handleAdd(dataCollection);
        resetForm({});
    };

    const handleAdd = async (newData) => {
        await dispatch(postProductoInCellarDetailAction(newData));
        await dispatch(getProductoInCellarActionId(data.uuid));
        history.push(`/admin/product/`);
    }

    const formik = useFormik({
        initialValues: {
            product_in_cellar: !!data && data.uuid,
            state: '1',
            size: '1',
            info: ''
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className={'panel shadow'}>
            <div className={'header'}>
                <h2 className={'title'}>
                    <i className="fas fa-stream"/> Asociar producto
                </h2>
            </div>
            <div className={'inside'}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <div className={'input-gro'}>
                                <div className={'input-group-prepend'}>
                                    <label><i className="fas fa-ruler"/> Talla: </label>
                                </div>
                                <select
                                    name={'size'}
                                    onChange={formik.handleChange}
                                    className={'custom-select'}
                                    aria-label={'Default select example'}
                                    value={formik.values.size}
                                >
                                    <option selected disabled value={'1'}>Seleccionar</option>
                                    <option value={'0-2'}>0-2</option>
                                    <option value={'2-4'}>2-4</option>
                                    <option value={'6-8'}>6-8</option>
                                    <option value={'10-12'}>10-12</option>
                                    <option value={'14-16'}>14-16</option>
                                    <option value={'XS'}>XS</option>
                                    <option value={'S '}>S</option>
                                    <option value={'M '}>M</option>
                                    <option value={'L '}>L</option>
                                    <option value={'XL'}>XL</option>
                                    <option value={'XXL'}>XXL</option>
                                    <option value={'XXXL'}>XXXL</option>
                                </select>
                            </div>
                            {formik.errors.size && formik.touched.size ?
                                <div className={'container-fluid warning'}>
                                    <i className={'fas fa-exclamation'}/> {formik.errors.size}
                                </div> : null}
                        </div>
                        <div className={'col-md-6'}>
                            <div className={'input-gro'}>
                                <div className={'input-group-prepend'}>
                                    <label><i className="far fa-calendar-check"/> Estado del producto al ingresar:
                                    </label>
                                </div>
                                <select
                                    name={'state'}
                                    onChange={formik.handleChange}
                                    className={'custom-select'}
                                    aria-label={'Default select example'}
                                    value={formik.values.state}
                                >
                                    <option selected disabled value={'1'}>Seleccionar</option>
                                    <option value={'OK'}>OK</option>
                                    <option value={'Parcialmente dañado'}>Parcialmente dañado</option>
                                    <option value={'Completamente dañado'}>Completamente dañado</option>
                                </select>
                            </div>
                            {formik.errors.state && formik.touched.state ?
                                <div className={'container-fluid warning'}>
                                    <i className={'fas fa-exclamation'}/> {formik.errors.state}
                                </div> : null}
                        </div>
                    </div>
                    <div className={'row mtop16'}>
                        <div className={'col-md-12'}>
                            <label>Descripción:</label>
                            <textarea
                                rows={'4'}
                                type={'text'}
                                name={'info'}
                                className={'form-control'}
                                placeholder={'Escriba una descripcón que describa detalladamente el articulo que ingresa a bodega.'}
                                onChange={formik.handleChange}
                                value={formik.values.info}
                            />
                        </div>
                    </div>
                    {formik.errors.info && formik.touched.info ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.info}
                        </div> : null
                    }
                    <div className={'row mtop16'}>
                        <div className={'col-md-12'}>
                            <button
                                type={'submit'}
                                className={'btn btn-success'}
                                title='Asociar producto'
                            > Asociar producto
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductInCellarDetailForm;