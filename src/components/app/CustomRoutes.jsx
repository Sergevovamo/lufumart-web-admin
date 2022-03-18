import React from 'react';
import PrivateRoute from '../../middleware/PrivateRoute';
import {
	// Sidebar components
	Home,
	Products,
	Orders,
	Wallet,
	Sellers,
	Customers,
	// Products components
	MyProducts,
	SellerProducts,
	ProductCategory,
	PopularProducts,
} from './index';

const routes = [
	// Sidebar routes
	{
		path: ``,
		exact: true,
		content: () => <Home />,
	},
	{
		path: `products`,
		exact: false,
		content: () => <Products />,
	},
	{
		path: `orders`,
		exact: false,
		content: () => <Orders />,
	},
	{
		path: `wallet`,
		exact: false,
		content: () => <Wallet />,
	},
	{
		path: `sellers`,
		exact: false,
		content: () => <Sellers />,
	},
	{
		path: `customers`,
		exact: false,
		content: () => <Customers />,
	},
	// Products Routes
	{
		path: `my-products`,
		exact: false,
		content: () => <MyProducts />,
	},
	{
		path: `products-category`,
		exact: false,
		content: () => <ProductCategory />,
	},
	{
		path: `popular-products`,
		exact: false,
		content: () => <PopularProducts />,
	},
	{
		path: `seller-products`,
		exact: false,
		content: () => <SellerProducts />,
	},
];

const Routes = () => {
	return (
		<>
			{routes.map((route, index) => {
				const { path, exact, content } = route;
				return <PrivateRoute key={index} path={`/${path}`} element={content} />;
			})}
		</>
	);
};

export default Routes;
