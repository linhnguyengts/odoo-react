import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { Store} from '../../Store';

export const TableOrderLine =  ({data, onChangeRow, onRemoveProduct}) => {
    const { state, dispatch } = React.useContext(Store);
    const { products } = state; 
    const [product, setProduct] = React.useState({...data});

    const onChangeInput = (e) => {
      const { name, value } = e.target;
      const newProduct = {...data, [name]:value}
      onChangeRow(newProduct);
    };

    const onChangeProduct = newValue => {
      const amount = product.amount ? product.amount : 1;
      const promotion = product.promotion ? product.promotion : 0;
      const price = newValue && newValue.price ? newValue.price : 0;
      const subtotal = amount * price;
      const newProduct = {
        ...product, 
        product: {
          ...newValue
        }, 
        price,
        amount,
        promotion,
        subtotal 
      };
      onChangeRow(newProduct);
    };
    /**
    React.useEffect(() => {
      onChangeRow(product);
    }, [product]);

    const onChangeInput = (value, field) => {
      setProduct(product => ({...product, [field]:value}));
    };

    const onChangeProduct = (newValue) => {
      const amount = product.amount ? product.amount : 1;
      const promotion = product.promotion ? product.promotion : 0;
      const price = newValue && newValue.price ? newValue.price : 0;
      const subtotal = amount * price;
      setProduct(row => (
        {
          ...row, 
          product: {
            ...newValue
          }, 
          price,
          amount,
          promotion,
          subtotal 
        }
      ));
    };
    **/

    return (
      <tr>
        <td>
          <Select
              isClearable
              onChange={onChangeProduct}
              options={products}
              value={data.product}
              getOptionLabel={option => option.name}
              placeholder="Chọn sản phẩm"
          />
        </td>
        <td>
          <input 
              className="form-control" 
              type="text" 
              required="" 
              name="amount"
              value={data.amount} 
              onChange={onChangeInput} 
          />            
        </td>
        <td>
          <input 
              className="form-control" 
              type="text" 
              required="" 
              name="price"
              value={data.price} 
              onChange={onChangeInput} 
          />           
        </td>
        <td>
          <input 
              className="form-control" 
              type="text" 
              required="" 
              name="promotion"
              value={data.promotion} 
              onChange={onChangeInput} 
          />           
        </td>
        <td>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(data.subtotal)}</td>
        <td>
          <span onClick={onRemoveProduct}><i className="fa fa-trash"></i></span>
        </td>
      </tr>
    )
}
