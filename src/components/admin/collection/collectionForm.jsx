import React from "react";
import {useFormik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Escriba un nombre válido.').required('Nombre requerido'),
    icon: Yup.string().min(3, 'Escoja un icono válido, Font Awesome https://fontawesome.com/').required('El ícono es requerido.'),
    description: Yup.string().min(1, 'Escriba una descripción.').required('Descripción requerida.')
});

function CollectionForm({data, isEdit, handleAddOrEdit}) {

    const handleSubmit = (dataCollection, {resetForm}) => {
        handleAddOrEdit(dataCollection);
        alert('Colección registrada exitosamente.');
        resetForm({});
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            icon: '',
            description: 'Colección',
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className={'panel shadow'}>
            <div className={'header'}>
                {isEdit ? (
                    <h2 className={'title'}>
                        <i className={'fas fa-edit'}/> Editar Colección
                    </h2>
                ) : (
                    <h2 className={'title'}>
                        <i className={'fas fa-plus'}/> Agregar Colección
                    </h2>
                )}
            </div>
            <div className={'inside'}>
                <form onSubmit={formik.handleSubmit}>
                    <label>Nomber se la colección:</label>
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
                        />
                    </div>
                    {formik.errors.name && formik.touched.name ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.name}
                        </div> : null}
                    <label className={'mtop16'}>Icono:</label>
                    <div className={'input-group'}>
                        <div className={'input-group-prepend'}>
                          <span className={'input-group-text'}>
                            <i className={'fas fa-icons'}/>
                          </span>
                        </div>
                        <input
                            type={'text'}
                            name={'icon'}
                            className={'form-control'}
                            placeholder={'Ingrese un ícono'}
                            onChange={formik.handleChange}
                            value={formik.values.icon}
                            maxLength={'80'}
                        />
                    </div>
                    {formik.errors.icon && formik.touched.icon ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.icon}
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
                    {formik.errors.description && formik.touched.description ?
                        <div className={'container-fluid warning'}>
                            <i className={'fas fa-exclamation'}/> {formik.errors.description}
                        </div> : null}
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

export default CollectionForm;