import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteCellarAction, getCellarAction} from "../../../redux/cellarDucks";
import {ProgressBar} from "react-bootstrap";

function CellarList({handleEdit}) {

    const dispatch = useDispatch();
    const cellars = useSelector((store) => store.cellars.array);


    useEffect(() => {
        dispatch(getCellarAction());
    }, [dispatch]);

    const onDelete = async (event, uuid) => {
        event.preventDefault();
        await dispatch(deleteCellarAction(uuid))
    };

    return (
        <div className={'panel shadow'}>
            <div className={'header'}>
                <h2 className={'title'}>
                    <i className={'fas fa-store'}> Bodegas</i>
                </h2>
            </div>
            <div className={'inside'}>
                <table className={'table mtop16'}>
                    <thead>
                    <tr>
                        <th width={'35%'}>Nombre</th>
                        <th width={'55%'}>Capacidad</th>
                        <th width={'5%'}></th>
                        <th width={'5%'}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!cellars && cellars.map((cellar) => (
                        <tr key={cellar.uuid}>
                            <td>{cellar.name}</td>
                            <td>
                                <ProgressBar
                                    now={
                                        ((cellar.max_capacity - cellar.free_capacity) * 100) /
                                        cellar.max_capacity
                                    }
                                    label={
                                        ((cellar.max_capacity - cellar.free_capacity) * 100) /
                                        cellar.max_capacity +
                                        "%"
                                    }
                                    title={
                                        "Bodega al " +
                                        ((cellar.max_capacity - cellar.free_capacity) * 100) /
                                        cellar.max_capacity +
                                        "%\nCapcidad maxima: " +
                                        cellar.max_capacity +
                                        " Unds. \nCapacidad disponible: " +
                                        cellar.free_capacity +
                                        " Unds. \nEspacio usado: " +
                                        (cellar.max_capacity - cellar.free_capacity) +
                                        " Unds."
                                    }
                                />
                            </td>
                            <td>
                                <div className="opts">
                                    <a
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        onClick={() => handleEdit(cellar)}
                                        title="Editar"
                                    >
                                        <i className="fas fa-edit"/>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div className="opts">
                                    <a
                                        href="/admin/cellar/"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        onClick={(e) => onDelete(e, cellar.uuid)}
                                        title="Borrar"
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

export default CellarList;