import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    getProductoInCellarAction,
    deleteProductoInCellarAction,
    getProductInCellarDetailForPICId
} from "../../../../redux/productInCellarDucks";
import {Modal} from "react-bootstrap";

function ProductInCellarList({handleAssociate}) {

    const dispatch = useDispatch();
    const pics = useSelector((store) => store.pics.array_product);
    const details = useSelector((store) => store.pics.array_detail);
    const [show, setShow] = useState(false);
    const [dataShow, setDataShow] = useState([]);

    useEffect(() => {
        dispatch(getProductoInCellarAction());
    }, [dispatch]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete = async (event, uuid) => {
        event.preventDefault();
        await dispatch(deleteProductoInCellarAction(uuid));
    };

    const onShow = async (pic) => {
        if (!show) {
            setDataShow(pic);
            await dispatch(getProductInCellarDetailForPICId(pic.uuid));
            handleShow();
        } else {
            handleClose();
        }
    }

    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });

    return (
        <div className={'panel shadow mtop16'}>
            <div className={'header'}>
                <h2 className={'title'}>
                    <i className={'fas fa-layer-group'}/> Productos en bodega
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
                        <h5>Bodega: {dataShow.cellarName}</h5>
                        {
                            <div>
                                <div className={'row'}>
                                    <div className={'col-md-6'}>
                                        <ul><h6>Cantidad ingresada:</h6>{dataShow.quantity_entered} Und.</ul>
                                    </div>
                                    <div className={'col-md-6'}>
                                        <ul><h6>Cantidad disponible:</h6>{dataShow.free_quantity} Und.</ul>
                                    </div>
                                </div>
                                <ul><h6>Cantidad minima permitida (Stop):</h6>{dataShow.stop} Und.</ul>
                                {!!details && details.map((detail) => (
                                    (detail.free <= dataShow.stop) ? (
                                        <div key={detail.size} className={'alert alert-danger'} role={'alert'}
                                             title={'Catidad critica, abastecer lo mas pronto posible.'}>
                                            <div className={'row'}>
                                                <div className={'col-md-4'}>
                                                    <h8>Talla: {detail.size}</h8>
                                                </div>
                                                <div className={'col-md-8'}>
                                                    <h8>Cantidad disponible: {detail.free}</h8>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={detail.size} className={'alert alert-info'} role={'info'}
                                             title={'Catidad critica, abastecer lo mas pronto posible.'}>
                                            <div key={detail.size} className={'row'}>
                                                <div className={'col-md-4'}>
                                                    <h8>Talla: {detail.size}</h8>
                                                </div>
                                                <div className={'col-md-8'}>
                                                    <h8>Cantidad disponible: {detail.free}</h8>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        }
                        <h5>Proveedor: {dataShow.providerName}</h5>
                        <div className={'row'}>
                            <div className={'col-md-6'}>
                                <ul><h6>Costo:</h6>{formatterPeso.format(dataShow.cost)}</ul>
                            </div>
                            <div className={'col-md-6'}>
                                <ul><h6>Costo por unidad:</h6>{formatterPeso.format(dataShow.unit_cost)}</ul>
                            </div>
                        </div>
                        <ul><h6>Descripción:</h6>{dataShow.description}</ul>
                    </Modal.Body>
                </Modal>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <td width={'30%'}>Nombre</td>
                        <td width={'50%'}>Descripcion</td>
                        <td width={'5%'}></td>
                        <td width={'5%'}></td>
                        <td width={'5%'}></td>
                        <td width={'5%'}></td>
                    </tr>
                    </thead>
                    <tbody>
                    {!!pics && pics.map((pic) => (
                        <tr key={pic.uuid}>
                            <td>{pic.name}</td>
                            <td>{pic.description}</td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        onClick={() => onShow(pic)}
                                        title={'Ver'}
                                    >
                                        <i className={'fas fa-eye'}/>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        onClick={(pic.free_quantity == pic.quantity_entered) ? (
                                            () => onShow(pic)
                                        ) : (
                                            () => handleAssociate(pic)
                                        )}
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        title={'Asociar'}
                                    >
                                        <i className={'fas fa-edit'}/>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        title={'Editar'}
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
                                        onClick={(e) => onDelete(e, pic.uuid)}
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

export default ProductInCellarList;