import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../Routes';
import { Store } from '../../Store';
import axios from 'axios';
import { baseapi } from '../../constants/config';

function Home() {
	const { state, dispatch } = React.useContext(Store);
    const { session_id } = state.session; 
    // load products
	React.useEffect(() => {
        const params = {
            jsonrpc: '2.0', 
            id: new Date().getUTCMilliseconds(), 
            method: 'call', 
            params: {
				args: [],
				kwargs: {
					args: [["sale_ok", "=", true]], 
					name: "", 
					operator: "ilike"
				},
				method: "name_search_live",
				model: "product.product"              
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
            url: `${baseapi}/web/dataset/call_kw/product.product`,
            data: JSON.stringify(params),         
      
        }).then(response => {
           const { data } = response;          
           if(data.result && data.result){
                const products = data.result.map(obj => ({...obj, label: obj.name, value: obj.id}));               
                dispatch({
                    type: 'LOAD_PRODUCTS',
                    payload: products
                });                  
               //setOrders([...data.result.records]);
           }
        });
    }, []);
    
    // load customers
	React.useEffect(() => {
        const params = {
            jsonrpc: '2.0', 
            id: new Date().getUTCMilliseconds(), 
            method: 'call', 
            params: {
                fields: ['id', 'name', 'phone',  'street', 'vn_location_id'],
                domain: [["customer", "=", 1], ["parent_id", "=", false]],
                model: "res.partner" ,
                limit: 80,
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
                const customers = data.result.records.map(obj => 
                    ({...obj, label: obj.name, value: obj.id, phone: obj.phone || '', street: obj.street || ''}
                ));
                dispatch({
                    type: 'LOAD_CUSTOMERS',
                    payload: customers
                });                  
            }
        });
    }, []);   
    
    // load address
	React.useEffect(() => {
        const params = {
            jsonrpc: '2.0', 
            id: new Date().getUTCMilliseconds(), 
            method: 'call', 
            params: {
                fields: ['id', "display_name", "short_code"],
                domain: [],
                model: "vn.location" ,
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
                const adress = data.result.records.map(obj => ({...obj, label: obj.display_name, value: obj.id}));
                dispatch({
                    type: 'LOAD_ADDRESS',
                    payload: adress
                });                  
            }
        });
	}, []);     

	return (
		<BrowserRouter basename={'/'}>
			<Routes />
		</BrowserRouter>
	);
}

export default Home;