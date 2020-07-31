import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import './index.scss';
import Page404 from './components/Page404/Page404';
import Layout from './components/layout';
import Orders from './containers/Sales/orders';
import CreateOrder from './containers/Sales/create-order';
import Login from './containers/Login/Login';

function Routes() {
	return (
		<Layout>
			<ScrollContext>
				<Switch>				
					<Route path={`${process.env.PUBLIC_URL}/`} exact component={Orders} />
					<Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />
					<Route path={`${process.env.PUBLIC_URL}/sales/create`} component={CreateOrder} />
					<Route path={`${process.env.PUBLIC_URL}/auth/login`} component={Login} />
					<Route component={Page404} />					
				</Switch>
			</ScrollContext>
		</Layout>
	);
}

export default Routes;