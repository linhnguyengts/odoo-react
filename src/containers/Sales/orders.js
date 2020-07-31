import React, { Component, Fragment } from 'react'
import Breadcrumb from '../../components/common/breadcrumb';
import { Datatable } from '../../components/common/datatable';
import axios from 'axios';
import { baseapi } from '../../constants/config';
import { Store } from '../../Store';

function Orders(props){
	const { state, dispatch } = React.useContext(Store);
	const { session_id } = state.session;    
    const [orders, setOrders] = React.useState(null);
    const routeChange = () => {
        props.history.push(`${process.env.PUBLIC_URL}/sales/create`);
    }

    React.useEffect(() => {
        const params = {
            jsonrpc: '2.0', 
            id: new Date().getUTCMilliseconds(), 
            method: 'call', 
            params: {
                domain: [],
                fields: ["message_needaction", "name", "date_order", "partner_id", "related_partner_phone", "user_id", 'amount_total', "currency_id", "state"],
                limit: 80,
                model: "sale.order",
                sort: ""               
            }
        };
        axios({
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json', 
                'Accept': 'application/json',
                'Cookie': `session_id=${session_id};`
            },    
            withCredentials: true, 
            url: `${baseapi}/web/dataset/search_read`,
            data: JSON.stringify(params),         
      
        }).then(response => {
           const { data } = response;          
           if(data.result && data.result.records){
                const state = {
                    'draft': <span className="badge badge-secondary">Báo giá</span>,
                    'paid': <span className="badge badge-success">Đã trả tiền</span>,
                    'sale': <span className="badge badge-warning">Đã bán</span>,
                    'cancel': <span className="badge badge-danger">Đã hủy</span>,
                    'sent': <span className="badge badge-primary">Đã gửi</span>
                };               
                const orders = data.result.records.map(order => ({ ...order, state: state[order.state], price: new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(order.amount_total) }));
               setOrders([...orders]);
           }
        });
    }, []);

    return (
        <Fragment>
            <Breadcrumb title="Orders" parent="Sales" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Manage Order</h5>
                                <div className="actions">
                                    <button type="button" className="btn btn-primary" onClick={routeChange}>Create Order</button>
                                </div>
                            </div>
                            <div className="card-body order-datatable">
                                {
                                    !orders ? <div>Loading...</div> : <Datatable data={orders} />
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Orders

