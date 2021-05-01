import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {patchSectionAction, getSectionActionId, postSectionAction} from "../../../redux/sectionDucks";
import SectionForm from "./sectionForm";
import SectionList from "./sectionList";

export const SectionContent = () => {

    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const dispacth = useDispatch();
    const history = useHistory();

    const clearData = () => {
        setData({
            'name': '',
            'icon': '',
            'description': ''
        });
    };

    const handleEdit = async (data) => {
        setData(data);
        setIsEdit(true);
        history.push(`/admin/section/${data.uuid}`);
        await dispacth(getSectionActionId(data.uuid));
    };

    const handleAddOrEdit = async (data) => {
        if (!isEdit) {
            await dispacth(postSectionAction(data));
        } else {
            await dispacth(patchSectionAction(data.uuid, data));
            setIsEdit(false);
            history.push(`/admin/section/`);
        }
        clearData();
    };

    return (
        <div className={'container-fluid'}>
            <div className={'row'}>
                <div className={'col-md-4'}>
                    <SectionForm
                        data={data}
                        isEdit={isEdit}
                        handleAddOrEdit={handleAddOrEdit}
                    />
                </div>
                <div className={'col-md-8'}>
                    <SectionList handleEdit={handleEdit}/>
                </div>
            </div>
        </div>
    );
};