import React from "react";
import {useFormik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    identification: Yup.string().min(7, 'Escriba una identificacion válida.').required('Identificacion requerida.'),
    name: Yup.string().min(3, 'Escribe al menos 3 caracteres.').required('Nombre requerido.'),
    address: Yup.string().min(10, 'Escriba una dirección válida.').required('Dirección requerida.'),
    phone_number: Yup.string().min(7, 'Escriba un número télefonico válido.').required('Número teléfonico requerido.'),
    email: Yup.string().email('Ingrese un email válido.').required('Correo Requerido.'),
    description: Yup.string().min(1, 'Escriba una descripción.').required('Descripción requerida.')
});

function ProviderForm({data, handleAddOrEdit, isEdit}) {

    const handleSubmit = (dataProvider, {resetForm}) => {
        handleAddOrEdit(dataProvider);
        alert('Proveedor registrado exitosamente.');
        resetForm({});
    };

    const formik = useFormik({
        initialValues: {
            identification: '',
            name: '',
            address: '',
            phone_number: '',
            email: '',
            description: 'Proveedor',
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className={'panel shadow'}>
            <div className={'header'}>
                {isEdit ? (
                    <h2 className={'title'}>
                        <i className={'fas fa-edit'}/> Editar Proveedor
                    </h2>
                ) : (
                    <h2 className={'title'}>
                        <i className={'fas fa-plus'}/> Agregar Proveedor
                    </h2>
                )}
            </div>
            <div className={'inside'}>
                <form onSubmit={formik.handleSubmit}>
                    <label>Identificacion del proveedor:</label>
                    <div className={'input-group'}>
                        <div className={'input-group-prepend'}>
                          <span className={'input-group-text'}>
                            <i className={'far fa-id-card'}/>
                          </span>
                        </div>
                        <input
                            type={'text'}
                            name={'identification'}
                            className={'form-control'}
                            placeholder={'Escriba una identificación'}
                            onChange={formik.handleChange}
                            value={formik.values.identification}
                            maxLength={'15'}
                        />
                    </div>
                    {formik.errors.identification && formik.touched.identification ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.identification}
                        </div> : null}
                    <label className={'mtop16'}>Nombre del proveedor:</label>
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
                            maxLength={'100'}
                        />
                    </div>
                    {formik.errors.name && formik.touched.name ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.name}
                        </div> : null}
                    <label className={'mtop16'}>Dirección:</label>
                    <div className={'input-group'}>
                        <div className={'input-group-prepend'}>
                          <span className={'input-group-text'}>
                            <i className={'fas fa-map-marker-alt'}/>
                          </span>
                        </div>
                        <input
                            type={'text'}
                            name={'address'}
                            className={'form-control'}
                            placeholder={'Escriba una dirección'}
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            maxLength={'80'}
                        />
                    </div>
                    {formik.errors.address && formik.touched.address ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.address}
                        </div> : null}
                    <label className={'mtop16'}>Número teléfonico:</label>
                    <div className={'input-group'}>
                        <div className={'input-group-prepend'}>
                          <span className={'input-group-text'}>
                            <i className={'fas fa-phone'}/>
                          </span>
                        </div>
                        <input
                            type={'text'}
                            name={'phone_number'}
                            className={'form-control'}
                            placeholder={'Escriba un número teléfonico'}
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                            maxLength={'10'}
                        />
                    </div>
                    {formik.errors.phone_number && formik.touched.phone_number ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.phone_number}
                        </div> : null}
                    <label className={'mtop16'}>Correo eléctronico:</label>
                    <div className={'input-group'}>
                        <div className={'input-group-prepend'}>
                          <span className={'input-group-text'}>
                            <i className={'far fa-envelope'}/>
                          </span>
                        </div>
                        <input
                            type={'email'}
                            name={'email'}
                            className={'form-control'}
                            placeholder={'Escriba un correo eléctronico'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    {formik.errors.email && formik.touched.email ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.email}
                        </div> : null}
                    <div className={'row mtop16'}>
                        <div className={'col-md-12'}>
                            <label>Descripcíon:</label>
                            <textarea
                                rows={'4'}
                                type={'text'}
                                name={'description'}
                                className={'form-control'}
                                placeholder={'Escriba una descripcón'}
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                    </div>
                    <div className={'row mtop16'}>
                        <div className={'col-md-12'}>
                            <button
                                type={'submit'}
                                className={'btn btn-success'}
                                title={!isEdit ? 'Agregar nueva Sección' : 'Editar Sección'}
                            >
                                {!isEdit ? 'Agregar' : 'Editar'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProviderForm;