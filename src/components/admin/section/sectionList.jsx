import React, {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteSectionAction, getSectionAction} from "../../../redux/sectionDucks";

function SectionList({handleEdit}) {

    const dispatch = useDispatch();
    const sections = useSelector((store) => store.sections.array);

    useEffect(() => {
        dispatch(getSectionAction());
    }, [dispatch]);

    const onDelete = async (event, section) => {
        event.preventDefault();
        await dispatch(deleteSectionAction(section));
    };

    return (
        <div className={'panel shadow'}>
            <div className={'header'}>
                <h2 className={'title'}>
                    <i className={'far fa-folder'}/> Secciones
                </h2>
            </div>
            <div className={'inside'}>
                <table className={'table mtop16'}>
                    <thead>
                    <tr>
                        <th width={'30%'}>Nombre</th>
                        <th width={'50%'}>Descripción</th>
                        <th width={'10%'}></th>
                        <th width={'10%'}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!sections && sections.map((section) => (
                        <tr key={section.uuid}>
                            <td><i className={section.icon}/> {section.name}</td>
                            <td>{section.description}</td>
                            <td>
                                <div className={'opts'}>
                                    <a
                                        data-toggle={'tooltip'}
                                        data-placement={'top'}
                                        onClick={() => handleEdit(section)}
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
                                        onClick={(e) => onDelete(e, section.uuid)}
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
export default SectionList;