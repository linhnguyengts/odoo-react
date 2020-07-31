import React, { Fragment, useContext, useState } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from 'react-feather';
import axios from 'axios';
import { baseapi, database } from '../../constants/config';
import { Store } from '../../Store';

export const LoginTabset = () => {

	const { dispatch } = useContext(Store);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

	const handleSubmit = (e) => {
        e.preventDefault();
        var params = {  
            db: database,
            login: email,
            password: password
          };
        
        var json = JSON.stringify({ params: params });

        axios({
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json', 
                'Accept': 'application/json',
                //'Content-Length': json.length          
            }, 
            withCredentials: true,   
            url: `${baseapi}/web/session/authenticate`,
            data: json,         
      
        }).then(response => {
            if(!response.data.error && response.data.result.uid){
                localStorage.setItem('odoo_react_sale', JSON.stringify(response.data.result));
                dispatch({
                    type: 'SET_SESSION',
                    payload: response.data.result
                });                
                //this.props.history.push(`${process.env.PUBLIC_URL}/sales/orders`);
            } else {
                toast.error("Kiểm tra lại thông tin đăng nhập");
            }
        });   
 
       /**
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
                'Cookie': `session_id=f7551a8d5dae0fa41a626d1ccff73a279cca2f0b;`
            },    
            withCredentials: true,
            url: `${baseapi}/web/dataset/search_read`,
            data: JSON.stringify(params),         
    
        }).then(response => {

        });        
        **/     
	};

    return (
        <div>
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User />Login</Tab>
                        
                    </TabList>

                    <TabPanel>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    required="" 
                                    className="form-control" 
                                    placeholder="Username" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    required="" 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-terms">
                                <div className="custom-control custom-checkbox mr-sm-2">

                                </div>
                            </div>
                            <div className="form-button">
                                <button className="btn btn-primary"  type="submit">Login</button>
                            </div>
                        </form>


                    </TabPanel>
                </Tabs>
                <ToastContainer />
            </Fragment>
        </div>
    )
}
