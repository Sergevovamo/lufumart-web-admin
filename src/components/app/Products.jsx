import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Table,
	MenuItem,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button,
} from '@mui/material';
import styles from '../../css/Products.module.css';

const Products = () => {
	return (
		<div className={styles.product_container}>
			<div className={styles.card_content}>
				<div className={styles.card_detail}>
					<h4 className={styles.card_title}>Product Category</h4>
					<div className="card-inner">
						<Link
							style={{ textDecoration: 'none', textAlign: 'center' }}
							to="/products-category"
						>
							<Button>View</Button>
						</Link>
					</div>
				</div>
				<div className={styles.card_detail}>
					<h4 className={styles.card_title}>Popular Products</h4>
					<div className="card-inner">
						<Link
							style={{ textDecoration: 'none', textAlign: 'center' }}
							to="/popular-products"
						>
							<Button>View</Button>
						</Link>
					</div>
				</div>
				<div className={styles.card_detail}>
					<h4 className={styles.card_title}>My Products</h4>
					<div className="card-inner">
						<Link
							style={{ textDecoration: 'none', textAlign: 'center' }}
							to="/my-products"
						>
							<Button>View</Button>
						</Link>
					</div>
				</div>
				<div className={styles.card_detail}>
					<h4 className={styles.card_title}>Seller Products</h4>
					<div className="card-inner">
						<Link
							style={{ textDecoration: 'none', textAlign: 'center' }}
							to="/seller-products"
						>
							<Button>View</Button>
						</Link>
					</div>
				</div>
			</div>
			<TableContainer component={Paper}>
				<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
					Recent Products
				</h3>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Photos</TableCell>
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">Category</TableCell>
							<TableCell align="left">Brand</TableCell>
							<TableCell align="left">Price</TableCell>
							<TableCell align="left">Status</TableCell>
							<TableCell align="left">Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
							}}
						>
							<TableCell>Image</TableCell>
							<TableCell>Baby Shoes</TableCell>
							<TableCell align="left">This is a premium baby shoe</TableCell>
							<TableCell align="left">Loive</TableCell>
							<TableCell align="left">899</TableCell>
							<TableCell align="left">Available</TableCell>
							<TableCell align="left">Today</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer sx={{ marginTop: '1rem' }} component={Paper}>
				<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>Products</h3>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Photos</TableCell>
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">Category</TableCell>
							<TableCell align="left">Brand</TableCell>
							<TableCell align="left">Price</TableCell>
							<TableCell align="left">Status</TableCell>
							<TableCell align="left">Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
							}}
						>
							<TableCell>Image</TableCell>
							<TableCell>Baby Shoes</TableCell>
							<TableCell align="left">This is a premium baby shoe</TableCell>
							<TableCell align="left">Loive</TableCell>
							<TableCell align="left">899</TableCell>
							<TableCell align="left">Available</TableCell>
							<TableCell align="left">Today</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Products;
