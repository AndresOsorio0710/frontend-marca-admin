import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {patchCollectionAction, getCollectionActionId, postCollectionAction} from "../../../redux/collectionDucks";
import CollectionList from "./collectionList";
import CollectionForm from "./collectionForm";

export const CollectionContent = () => {

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

    const handeEdit = async (data) => {
        setData(data);
        setIsEdit(true);
        history.push(`/admin/collection/${data.uuid}`);
        await dispacth(getCollectionActionId(data.uuid));
    };

    const handleAddOrEdit = async (data) => {
        if (!isEdit) {
            await dispacth(postCollectionAction(data));
        } else {
            await dispacth(patchCollectionAction(data.uuid, data));
            setIsEdit(false);
            history.push(`/admin/collection/`);
        }
        clearData();
    };

    return (
        <div className={'container-fluid'}>
            <div className={'row'}>
                <div className={'col-md-4'}>
                    <CollectionForm
                        data={data}
                        isEdit={isEdit}
                        handleAddOrEdit={handleAddOrEdit}
                    />
                </div>
                <div className={'col-md-8'}>
                    <CollectionList handleEdit={handeEdit}/>
                </div>
            </div>
        </div>
    );
};