import React, { useReducer } from 'react';

export const Store = React.createContext();

const initialState = {
	session: null,
	products: [],
	customers: [],
	address: []
};

const globalReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SESSION':
			return { ...state, session: action.payload };
		case 'LOAD_PRODUCTS':
			return { ...state, products: action.payload };	
		case 'LOAD_CUSTOMERS':
			return { ...state, customers: action.payload };	
		case 'LOAD_ADDRESS':
			return { ...state, address: action.payload };	
		case 'logout':
			return initialState;
		default:
			return state;
	}
};

export function StoreProvider(props) {
	const [state, dispatch] = useReducer(globalReducer, initialState);
	const value = { state, dispatch };
	return <Store.Provider value={value}>{props.children}</Store.Provider>;
}