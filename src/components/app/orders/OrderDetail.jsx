import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Select,
	Button,
	IconButton,
	InputLabel,
	MenuItem,
	FormControl,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../../css/OrderDetails.module.css';

const OrderDetail = () => {
	let navigate = useNavigate();

	const [status, setStatus] = useState('');

	const handleChange = (event) => {
		setStatus(event.target.value);
	};

	return (
		<div className={styles.orders_container}>
			<IconButton
				style={{ marginTop: '1rem' }}
				onClick={() => navigate('/orders')}
			>
				<ArrowBackIcon />
			</IconButton>
			<div className={styles.order_details}>
				<div className={styles.order_header}>
					<div>
						<div className={styles.order_date}>
							<i className="bx bxs-calendar" style={{ fontSize: '1.5rem' }}></i>
							<h4 style={{ paddingLeft: '.5rem', fontWeight: '500' }}>
								Wed, Aug 13, 2020, 4:34PM
							</h4>
						</div>
						<div>
							<h4
								style={{
									paddingTop: '.5rem',
									fontWeight: '400',
									fontSize: '1rem',
									color: '#B2B9C1',
								}}
							>
								Order ID: 3453012
							</h4>
						</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<FormControl sx={{ m: 1, minWidth: 220 }} size="small">
							<InputLabel id="demo-select-small">Change Status</InputLabel>
							<Select
								labelId="demo-select-small"
								id="demo-select-small"
								value={status}
								label="Change status"
								onChange={handleChange}
							>
								<MenuItem value={10}>Awaiting payment</MenuItem>
								<MenuItem value={20}>Awaiting confirmation</MenuItem>
								<MenuItem value={30}>Confirmed</MenuItem>
								<MenuItem value={40}>Shipped</MenuItem>
								<MenuItem value={50}>Delivered</MenuItem>
							</Select>
						</FormControl>
						<Button variant="contained">Save</Button>
					</div>
				</div>
				<div className={styles.orderInfo}>
					<div className={styles.customer}>
						<div className={styles.image_header_1}>
							<i
								className="bx bxs-user"
								style={{ fontSize: '1.2rem', color: '#3067EB' }}
							></i>
						</div>
						<div className={styles.details}>
							<h4 style={{ color: '#20203C' }}>Customer</h4>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								John Alexander
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								alex@example.com
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								+998 99 22123456
							</p>
						</div>
					</div>
					<div className={styles.customer}>
						<div className={styles.image_header_1}>
							<i
								className="bx bxs-user"
								style={{ fontSize: '1.2rem', color: '#3067EB' }}
							></i>
						</div>
						<div className={styles.details}>
							<h4 style={{ color: '#20203C' }}>Order Info</h4>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								Shipping: Fargo express
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								Payment method: card
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								Status: Confirmed
							</p>
						</div>
					</div>
					<div className={styles.customer}>
						<div className={styles.image_header_1}>
							<i
								className="bx bxs-user"
								style={{ fontSize: '1.2rem', color: '#3067EB' }}
							></i>
						</div>
						<div className={styles.details}>
							<h4 style={{ color: '#20203C' }}>Deliver to</h4>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								City: Tashkent, Uzbekistan
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								Block A, House 123, Floor 2
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								P O Box 10000
							</p>
						</div>
					</div>
				</div>

				<div className={styles.orderLowerContent}>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label="spanning table">
							<TableHead>
								<TableRow>
									<TableCell align="center" colSpan={4}>
										Items in Order
									</TableCell>
									<TableCell align="right">Price</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Image</TableCell>
									<TableCell>Product</TableCell>
									<TableCell>Unit Price</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell align="right">Total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>
										<img
											style={{ width: '50px', aspectRatio: '16/9' }}
											src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/4873_vv32wo.jpg"
											alt=""
										/>
									</TableCell>
									<TableCell>Headphones</TableCell>
									<TableCell>$44.25</TableCell>
									<TableCell>2</TableCell>
									<TableCell align="right">$99.50</TableCell>
								</TableRow>

								<TableRow>
									<TableCell rowSpan={3} />
									<TableCell rowSpan={3} />
									<TableCell colSpan={2}>Subtotal</TableCell>
									<TableCell align="right">$973.35</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Tax</TableCell>
									<TableCell align="right">16%</TableCell>
									<TableCell align="right">$10.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={2}>Total</TableCell>
									<TableCell align="right">$983.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={4}>Status</TableCell>
									<TableCell
										align="right"
										sx={{
											display: 'flex',
											justifyContent: 'center',
											backgroundColor: '#CCF0D1',
											fontSize: '1.2rem',
											fontWeight: '600',
											color: 'green',
											margin: '1rem',
										}}
									>
										Payment done
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<div>
						<div className={styles.paymentInfo}>
							<h4>Payment info</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
