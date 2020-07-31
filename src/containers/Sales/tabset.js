import React, { Fragment } from 'react';
import { TableOrderLine } from './table-order-line';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Store} from '../../Store';
import axios from 'axios';
import { baseapi } from '../../constants/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultProductRow = {
    product: '',
    amount: '',
    price: '',
    promotion: '',
    subtotal: ''
}

const initialState = {
    selectedCustomer: null,
    selectedAddress: null,
    street: '',
    phone: '',
    productRows: []
};

const reducer = (state, action) => {
    switch(action.type){
        case 'reset':
            return {
                ...initialState,
                productRows: [{...defaultProductRow}]
            };
        case 'customer_changed': // load thông tin khách hàng khi chọn khách hàng
            return {
                ...state,
                ...action.value
            };
        case 'select_customer': // set khách hàng được chọn
            return {
                ...state,
                selectedCustomer: action.value
            };
        case 'add_product': // thêm sản phẩm
            return {
                ...state,
                productRows: [...state.productRows, {...defaultProductRow}]
            }; 
        case 'change_product': // sửa sản phẩm
            return {
                ...state,
                productRows: [...action.value]
            };   
        case 'remove_product': // xóa sản phẩm
            return {
                ...state,
                productRows: [...action.value]
            };  
        case 'change_area': // thay đổi khu vực
            return {
                ...state,
                selectedAddress: action.value
            };
        default: // mặc định khi thay đổi textinput
            return {
                ...state,
                [action.type]: action.value
            }                           
    }
};

function Tabset(){
    const [ stateReducer, dispatchReducer] = React.useReducer(reducer, {...initialState});
	const { state, dispatch } = React.useContext(Store);
    const { customers, address, session } = state; 

    const { phone, street, selectedAddress, selectedCustomer, productRows } = stateReducer;

    React.useEffect(() => {
        dispatchReducer({ type: 'add_product' });
    }, []);

    React.useEffect(() => {
       const objAddress = selectedCustomer && selectedCustomer.vn_location_id ? address.find(item => item.id == selectedCustomer.vn_location_id[0]) : null;
        dispatchReducer({ type: 'customer_changed', value: { 
            phone: selectedCustomer ? selectedCustomer.phone : '',
            street: selectedCustomer ? selectedCustomer.street : '',
            selectedAddress: objAddress
        } });
    }, [selectedCustomer]);

    const handleChange = (newValue) => {
        dispatchReducer({ type: 'select_customer', value: newValue });
    };

    const handleChangeArea = newValue => {
        dispatchReducer({ type: 'change_area', value: newValue });
    };

    const handleInputChange = (inputValue, actionMeta) => {
        if( actionMeta.action == 'set-value' || actionMeta.action == 'menu-close' ){
            dispatchReducer({ type: 'select_customer', value: selectedCustomer });
        }
    };   

    const filterAddress = (option, searchText) => {
        if (
            option.data.display_name.toLowerCase().includes(searchText.toLowerCase()) ||
            option.data.short_code.toLowerCase().includes(searchText.toLowerCase()) 
          ) {
            return true;
        } 
        return false;
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        dispatchReducer({ type: name, value });
    };

    const onChangeRow = (index, product) => {
        productRows[index] = product;
        dispatchReducer({ type: 'change_product', value: productRows });
    };

    const onRemoveProduct = (index) => {
        productRows.splice(index, 1);
        dispatchReducer({ type: 'remove_product', value: productRows });
    };

    const onClickAddPRoduct = () => {
        dispatchReducer({ type: 'add_product' });
    };

    const validateOrder = () => {
        if(!phone || !street || !selectedCustomer || !selectedAddress){
            toast.error('Vui lòng nhập đầy đủ thông tin khách hàng');
            return false;
        }      
        var flag = true;
        productRows.map(row => {
            if(flag && !row.product.id){
                flag = false;
                toast.error('Vui lòng kiểm tra lại sản phẩm đã chọn');
                return
            }
        });       
        return true;
    };

    const onCreateOrder = () => {
        if (!validateOrder()) return;
        const rows = productRows.map(row => {
            return {
                id: row.product.id,
                name: row.product.name,
                quantity: row.amount,
                price: row.price
            };
        });
        
        const params = {
            partner: {
                ...selectedCustomer,
                name: selectedCustomer.label,
                phone,
                street,
                vn_location_id: selectedAddress.id
            },
            orders: [{
                'rows': rows,
                'note': ''
            }]
        };
        const options = {
            jsonrpc: '2.0', 
            id: new Date().getUTCMilliseconds(), 
            method: 'call', 
            params: {
				params             
            }
        };
        axios({
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json', 
                'Accept': 'application/json',
                'Cookie': `session_id=${session.session_id};`
            },    
            withCredentials: true,
            url: `${baseapi}/web/dataset/create_order`,
            data: JSON.stringify(options),         
      
        }).then(response => {
            const { data } = response;          
            if(data.result){
                toast.success('Đơn hàng đã tạo thành công!');
                dispatchReducer({ type: 'reset' });               
            } else {
                toast.error(data.error.data.message);
            }
        });        
    };

    return (
        <Fragment>
            <div className="row needs-validation">
                <h4>Thông tin khách hàng</h4>
                <div className="row col-md-12">
                    <div className="col-md-6">
                        <div className="form-group row">
                            <label className="col-xl-3 col-md-4"><span>*</span> Khách hàng</label>
                            <div className="col-md-7">
                                <CreatableSelect
                                    isClearable
                                    //getOptionLabel={getCustomerOptionLabel}
                                    onChange={handleChange}
                                    onInputChange={handleInputChange}                                 
                                    options={customers}
                                    value={selectedCustomer}
                                    className="form-select-2"
                                    placeholder="Chọn khách hàng"
                                />
                            </div>

                            <div className="valid-feedback">Vui lòng chọn khách hàng</div>
                        </div>
                        <div className="form-group row">
                            <label className="col-xl-3 col-md-4"><span>*</span> Số điện thoại</label>
                            <input 
                                className="form-control col-md-7" 
                                type="text" required="" 
                                value={phone} 
                                onChange={onChangeInput} 
                            />
                            <div className="valid-feedback">Vui lòng nhập số điện thoại</div>
                        </div>                                               
                    </div>
                    <div className="col-md-6">
                        <div className="form-group row">
                            <label className="col-xl-3 col-md-4"><span>*</span> Khu vực</label>
                            <div className="col-md-7">
                                <Select
                                    isClearable
                                    onChange={handleChangeArea}
                                    options={address}
                                    value={selectedAddress}
                                    getOptionLabel={option => option.display_name}
                                    filterOption={filterAddress}
                                    className="form-select-2"
                                    placeholder="Chọn khu vực"
                                />
                            </div>

                            <div className="valid-feedback">Vui lòng chọn khu vực</div>
                        </div>                         
                        <div className="form-group row">
                            <label className="col-xl-3 col-md-4"><span>*</span> Địa chỉ</label>
                            <input 
                                className="form-control col-md-7" 
                                type="text" 
                                required="" 
                                value={street} 
                                onChange={onChangeInput} 
                            />                            
                            <div className="valid-feedback">Vui lòng nhập địa chỉ</div>
                        </div>                                                
                    </div>
                </div>
            </div>
            <div className="row needs-validation">
                <h4>Thông tin đơn hàng</h4>
                <table className="table table-bordernone table-order-lines">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Chiết khấu (%)</th>
                            <th>Tổng phụ</th>
                            <th></th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            productRows.map((row, index) => (
                                <TableOrderLine 
                                    key={index + 1} 
                                    data={row} 
                                    onChangeRow={(product) => onChangeRow(index, product)} 
                                    onRemoveProduct={() => onRemoveProduct(index)}
                                />
                            ))
                        }
                    </tbody>   
                    <tfoot>
                        <tr>
                            <td colSpan="6">
                                <button className="btn btn-primary btn-sm" onClick={onClickAddPRoduct}>Thêm sản phẩm</button>
                            </td>
                        </tr>
                    </tfoot>            
                </table>                
                
            </div>
            <div className="pull-right">
                <button type="button" className="btn btn-primary" onClick={onCreateOrder}>Save</button>
            </div>
            <ToastContainer />
        </Fragment>
    )
};

export default Tabset;

