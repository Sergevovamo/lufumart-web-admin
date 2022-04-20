import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../../css/OrderDetails.module.css';

const OrderDetail = () => {
	let navigate = useNavigate();

	return (
		<div className={styles.orders_container}>
			<IconButton
				style={{ marginTop: '1rem' }}
				onClick={() => navigate('/orders')}
			>
				<ArrowBackIcon />
			</IconButton>
			<div className={styles.order_details}>
				<h2>OrderDetail</h2>
			</div>
		</div>
	);
};

export default OrderDetail;
