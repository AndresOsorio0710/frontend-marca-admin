import {useState} from "react";
import {Route, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    editPostProductoInCellarAction,
    getProductoInCellarActionId,
    postProductoInCellarAction
} from "../../../../redux/productInCellarDucks";
import PICForm from "./productInCellarForm";
import PICList from "./productInCellarList";
import Switch from "react-bootstrap/Switch";
import ProductInCellarList from "./productInCellarList";
import ProductInCellarForm from "./productInCellarForm";

export const ProductInCellarContent = () => {

    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isAssociate, setIsAssociate] = useState(false);
    const dispacth = useDispatch();
    const history = useHistory();

    const clearData = () => {
        setData({
            'name': '',
            'cellar': '1',
            'provider': '1',
            'cost': 0,
            'price': 0,
            'quantity_entered': 0,
            'stop': 0,
            'description': 'Product'
        });
    };

    const handeEdit = async (data) => {
        setData(data);
        setIsEdit(true);
        history.push(`/admin/product/cellar/form/${data.uuid}`);
        await dispacth(getProductoInCellarActionId(data.uuid));
    };

    const handleAssociate = async (data) => {
        setData(data);
        setIsAssociate(true);
        history.push(`/admin/product/cellar/form/${data.uuid}`);
        await dispacth(getProductoInCellarActionId(data.uuid));
    };

    const handleAddOrEdit = async (data) => {
        if (!isEdit) {
            await dispacth(postProductoInCellarAction(data));
        } else {
            await dispacth(editPostProductoInCellarAction(data.uuid, data));
            setIsEdit(false);
            history.push(`/admin/product/list/`);
        }
    };

    return (
        <div className={'container-fluid'}>
            <Route path={'/admin/product/cellar/form/'}>
                <ProductInCellarForm
                    isEdit={isEdit}
                    isAssociate={isAssociate}
                    data={data}
                    handleAddOrEdit={handleAddOrEdit}/>
            </Route>
            <Route exact path={'/admin/product/cellar/list/'}>
                <ProductInCellarList handleAssociate={handleAssociate}/>
            </Route>
        </div>
    );
};