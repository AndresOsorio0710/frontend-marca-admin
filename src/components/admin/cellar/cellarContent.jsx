import {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {getCellarActionId, postCellarAction, patchCellarAction} from "../../../redux/cellarDucks";
import CellarList from "./cellarList";
import CellarForm from "./cellarForm";

export const CellarContent = () => {

    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const dispacth = useDispatch();
    const history = useHistory();

    const clearData = () => {
        setData({
            'name': '',
            'description': '',
            'address': '',
            'phone_number': '',
            'email': '',
            'max_capacity': ''
        });
    }

    const handleEdit = async (data) => {
        setData(data);
        history.push(`/admin/cellar/${data.uuid}/`);
        setIsEdit(true);
        await dispacth(getCellarActionId(data.uuid));
    }

    const handleAddOrEdit = async (data) => {
        if (!isEdit) {
            await dispacth(postCellarAction(data));
        } else {
            await dispacth(patchCellarAction(data.uuid, data));
            setIsEdit(false);
            history.push(`/admin/cellar/`);
        }
        clearData();
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <CellarForm data={data} handleAddOrEdit={handleAddOrEdit} isEdit={isEdit}/>
                </div>
                <div className="col-md-8">
                    <CellarList handleEdit={handleEdit}/>
                </div>
            </div>
        </div>
    );
}