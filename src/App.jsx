import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import {
	Landing,
	// Sidebar components
	Home,
	Products,
	Orders,
	Wallet,
	Sellers,
	Customers,
	Staff,
	Profile,
	// Products components
	MyProducts,
	SellerProducts,
	ProductCategory,
	ProductSubCategory,
	PopularProducts,
	// Seller details
	SellerProfile,
	// Order details
	OrderDetail,
} from './components/app';
import { PrivateRoute } from './middleware';
import { ForgotPassword, Login, PageNotFound } from './components';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Landing />
						</PrivateRoute>
					}
				>
					{/* Sidebar details */}
					<Route
						index
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route
						path="products"
						element={
							<PrivateRoute>
								<Products />
							</PrivateRoute>
						}
					/>
					<Route
						path="orders"
						element={
							<PrivateRoute>
								<Orders />
							</PrivateRoute>
						}
					/>
					<Route
						path="wallet"
						element={
							<PrivateRoute>
								<Wallet />
							</PrivateRoute>
						}
					/>
					<Route
						path="sellers"
						element={
							<PrivateRoute>
								<Sellers />
							</PrivateRoute>
						}
					/>
					<Route
						path="customers"
						element={
							<PrivateRoute>
								<Customers />
							</PrivateRoute>
						}
					/>
					<Route
						path="staff"
						element={
							<PrivateRoute>
								<Staff />
							</PrivateRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
					{/* Product details */}
					<Route
						path="my-products"
						element={
							<PrivateRoute>
								<MyProducts />
							</PrivateRoute>
						}
					/>
					<Route
						path="products-category"
						element={
							<PrivateRoute>
								<ProductCategory />
							</PrivateRoute>
						}
					/>
					<Route
						path="products-sub-category"
						element={
							<PrivateRoute>
								<ProductSubCategory />
							</PrivateRoute>
						}
					/>
					<Route
						path="popular-products"
						element={
							<PrivateRoute>
								<PopularProducts />
							</PrivateRoute>
						}
					/>
					<Route
						path="seller-products"
						element={
							<PrivateRoute>
								<SellerProducts />
							</PrivateRoute>
						}
					/>
					{/* Seller details */}
					<Route
						path="sellers-profile"
						element={
							<PrivateRoute>
								<SellerProfile />
							</PrivateRoute>
						}
					/>
					{/* Order details */}
					<Route
						path="order-details"
						element={
							<PrivateRoute>
								<OrderDetail />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Toaster position="top-center" />
		</ThemeProvider>
	);
};

export default App;

const theme = createTheme({
	shape: {
		borderRadius: 7,
	},
	palette: {
		primary: {
			main: '#00ab55',
		},
		secondary: {
			main: '#f68b1e',
		},
		default: {
			main: '#F8F9FA',
		},
	},
});
