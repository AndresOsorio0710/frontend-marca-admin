import React, {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteCollectionAction, getCollectionAction} from "../../../redux/collectionDucks";

function CollectionList({handleEdit}) {

    const dispatch = useDispatch();
    const collections = useSelector((store) => store.collections.array);

    useEffect(() => {
        dispatch(getCollectionAction());
    }, [dispatch]);

    const onDelete = async (event, collection) => {
        event.preventDefault();
        await dispatch(deleteCollectionAction(collection));
    };

    return (
        <div className={'panel shadow'}>
            <div className={'header'}>
                <h2 className={'title'}>
                    <i className={'fas fa-boxes'}/> Colecciones
                </h2>
            </div>
            <div className={'inside'}>
                <table className={'table mtop16'}>
                    <thead>
                    <tr>
                        <th width={'30%'}>Nombre</th>
                        <th width={'58%'}>Descripción</th>
                        <th width={'6%'}></th>
                        <th width={'6%'}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!collections && collections.map((collection) => (
                        <tr key={collection.uuid}>
                            <td><i className={collection.icon}/>{collection.name}</td>
                            <td>{collection.description}</td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        onClick={() => handleEdit(collection)}
                                        title={'Ediatr'}
                                    >
                                        <i className={'fas fa-edit'}/>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        href={'/admin/collection/'}
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        onClick={(e) => onDelete(e, collection.uuid)}
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

};

export default CollectionList;