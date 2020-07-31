import React, { useState, useContext } from 'react';
import logo from '../../assets/img/logo.png';
import userPhoto from '../../assets/img/user.png';
import { Store } from '../../Store';
import './Header.scss';

export const Context = React.createContext();

function Header() {
	const { state, dispatch } = useContext(Store);
	const { name } = state.session;

	const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
	const [userMenu, setUserMenu] = useState({
		open: false,
		anchorEl: null
	});

	const doLogout = () => {
		localStorage.clear();
		dispatch({
			type: 'SET_SESSION',
			payload: null
		});
	};

	const contextData = {
		openLeftDrawer,
		setOpenLeftDrawer: (arg) => setOpenLeftDrawer(arg)
	};

	return (
		<Context.Provider value={contextData}>
			<div>header</div>
		</Context.Provider >
	);
}

export default Header;