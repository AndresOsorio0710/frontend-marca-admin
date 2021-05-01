import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {getProviderActionId, patchProviderAction, postProviderAction} from "../../../redux/providerDucks";
import ProviderList from "./providerList";
import ProviderForm from "./providerForm";

export const ProviderContent = () => {

    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const clearData = () => {
        setData({
            "identification": "",
            "name": "",
            "description": "",
            "address": "",
            "phone_number": "",
            "email": ""
        });
    };

    const handleEdit = async (data) => {
        setData(data);
        setIsEdit(true);
        history.push(`/admin/provider/${data.uuid}`);
        await dispatch(getProviderActionId(data.uuid));
    };

    const handleAddOrEdit = async (data) => {
        if (!isEdit) {
            await dispatch(postProviderAction(data));
        } else {
            await dispatch(patchProviderAction(data.uuid, data));
            setIsEdit(false);
            history.push(`/admin/provider/`);
        }
        clearData();
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <ProviderForm data={data} isEdit={isEdit} handleAddOrEdit={handleAddOrEdit}/>
                </div>
                <div className="col-md-8">
                    <ProviderList handleEdit={handleEdit}/>
                </div>
            </div>
        </div>
    );
}