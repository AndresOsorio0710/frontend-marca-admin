import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteProviderAction, getProviderAction} from "../../../redux/providerDucks";
import {Modal} from "react-bootstrap";
import {combineReducers} from "redux";

function ProviderList({handleEdit}) {

    const dispatch = useDispatch();
    const providers = useSelector((store) => store.providers.array);
    const [show, setShow] = useState(false);
    const [dataShow, setDataShow] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getProviderAction());
    }, [dispatch]);

    const onDelete = async (event, uuid) => {
        event.preventDefault();
        await dispatch(deleteProviderAction(uuid));
    };

    const onShow = (provider) => {
        if (!show) {
            setDataShow(provider);
            handleShow();
        } else {
            handleClose();
        }
    }

    return (
        <div className={'panel shadow'}>
            <div className={'header'}>
                <h2 className={'title'}>
                    <i className={'fas fa-handshake'}/> Proveedores
                </h2>
            </div>
            <div className={'inside'}>
                <Modal
                    show={show}
                    onHide={() => onShow(dataShow)}
                    backdrop={'static'}
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {dataShow.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5><i className={'far fa-id-card'}/> {dataShow.identification}</h5>
                        <h5><i className={'fas fa-phone'}/> {dataShow.phone_number}</h5>
                        <h5><i className={'far fa-envelope'}/> {dataShow.email}</h5>
                        <h5><i className={'fas fa-map-marker-alt'}/> {dataShow.address}</h5>
                        <ul><h6>{dataShow.description}</h6></ul>
                    </Modal.Body>
                </Modal>
                <table className={'table mtop16'}>
                    <thead>
                    <tr>
                        <th width={'30%'}>Nombre</th>
                        <th width={'40%'}>Descripción</th>
                        <th width={'10%'}></th>
                        <th width={'10%'}></th>
                        <th width={'10%'}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!providers && providers.map((provider) => (
                        <tr key={provider.uuid}>
                            <td>{provider.name}</td>
                            <td>{provider.description}</td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        onClick={() => onShow(provider)}
                                        title={'Ver'}
                                    >
                                        <i className={'fas fa-eye'}/>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        onClick={() => handleEdit(provider)}
                                        title={'Ediatr'}
                                    >
                                        <i className={'fas fa-edit'}/>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        href={'/admin/provider/'}
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        onClick={(e) => onDelete(e, provider.uuid)}
                                        title={'Eliminar'}
                                    >
                                        <i className="fas fa-trash"/>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProviderList;