import React from "react";
import {useFormik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Escribe al menos 3 caracteres.").required('Nombre requerido.'),
    address: Yup.string().min(10, "Escriba una dirección válida.").required('Dirección requerida.'),
    phone_number: Yup.string().min(7, 'Escriba un número télefonico válido.').required('Número teléfonico requerido.'),
    email: Yup.string().email("Ingrese un email válido.").required("Correo Requerido."),
    max_capacity: Yup.number().min(1, 'Ingrese una capacidad válida').required('Capacidad requerida.')
})

function CellarForm({data, handleAddOrEdit, isEdit}) {

    const handleSubmit = (dataCellar, {resetForm}) => {
        handleAddOrEdit(dataCellar);
        alert(dataCellar);
        resetForm({});
    }

    const formik = useFormik({
        initialValues: {
            name: !!data && data.name ? data.name : '',
            address: '',
            phone_number: '',
            email: '',
            max_capacity: '',
            description: 'Bodega',
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className={"panel shadow"}>
            <div className={"header"}>
                {isEdit ? (
                    <h2 className={"title"}>
                        <i className="fas fa-edit"/> Editar Bodega
                    </h2>
                ) : (
                    <h2 className={"title"}>
                        <i className="fas fa-plus"/> Agregar Bodega
                    </h2>
                )}
            </div>
            <div className={"inside"}>
                <form onSubmit={formik.handleSubmit}>
                    <label>Nombre de la bodega:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="far fa-keyboard"/>
                          </span>
                        </div>
                        <input
                            id="validationDefault01"
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Escriba un nombre"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            maxLength="50"
                        />
                    </div>
                    {formik.errors.name && formik.touched.name ?
                        <div className={"container-fluid warning"}>
                            <i className="fas fa-exclamation"/> {formik.errors.name}
                        </div> : null}
                    <label className="mtop16">Dirección:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-map-marker-alt"/>
                          </span>
                        </div>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Agregue una dirección"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            maxLength="80"
                            id="validationDefault01"
                        />
                    </div>
                    {formik.errors.address && formik.touched.address ?
                        <div className={"container-fluid warning"}>
                            <i className="fas fa-exclamation"/> {formik.errors.address}
                        </div> : null}
                    <label className="mtop16">Número telefónico:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-phone"/>
                          </span>
                        </div>
                        <input
                            type="text"
                            name="phone_number"
                            className="form-control"
                            placeholder="Agregue un número telefónico"
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                            maxLength="10"
                            id="validationDefault01"
                        />
                    </div>
                    {formik.errors.phone_number && formik.touched.phone_number ?
                        <div className={"container-fluid warning"}>
                            <i className="fas fa-exclamation"/> {formik.errors.phone_number}
                        </div> : null}
                    <label className="mtop16">Correo elèctronico:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="far fa-envelope"/>
                          </span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Agregue un correo elèctronico"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    {formik.errors.email && formik.touched.email ?
                        <div className={"container-fluid warning"}>
                            <i className="fas fa-exclamation"/> {formik.errors.email}
                        </div> : null}
                    <label className="mtop16">
                        Capacidad maxima de la bodega (Und. Prendas):
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <i className="fas fa-cubes"/>
                            </span>
                        </div>
                        <input
                            type="number"
                            min="1"
                            name="max_capacity"
                            className="form-control"
                            placeholder="Agregue un correo elèctronico"
                            onChange={formik.handleChange}
                            value={formik.values.max_capacity}
                            id="validationDefault01"
                        />
                    </div>
                    {formik.errors.max_capacity && formik.touched.max_capacity ?
                        <div className={"container-fluid warning"}>
                            <i className="fas fa-exclamation"/> {formik.errors.max_capacity}
                        </div> : null}
                    <div className="row mtop16">
                        <div className="col-md-12">
                            <label>Descripcíon:</label>
                            <textarea
                                rows="4"
                                type="text"
                                name="description"
                                className="form-control"
                                id="editor"
                                placeholder="Escriba una descripcón"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                    </div>
                    <div className="row mtop16">
                        <div className="col-md-12">
                            <button
                                type="submit"
                                className="btn btn-success"
                                title={!isEdit ? "Agregar nueva Sección" : "Editar Sección"}
                            >
                                {!isEdit ? "Agregar" : "Editar"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CellarForm;