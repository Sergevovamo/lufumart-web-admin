import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
	IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../../css/SellerProducts.module.css';

const SellerProducts = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.product_container}>
			<IconButton
				style={{ marginTop: '1rem' }}
				onClick={() => navigate('/products')}
			>
				<ArrowBackIcon />
			</IconButton>
			<TableContainer sx={{ marginTop: '.5rem' }} component={Paper}>
				<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
					Seller Products
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
		</div>
	);
};

export default SellerProducts;
