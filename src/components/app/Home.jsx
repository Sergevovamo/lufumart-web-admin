import React from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
} from '@mui/material';
import styles from '../../css/Home.module.css';

const Home = () => {
	return (
		<div className={styles.home_container}>
			<div className={styles.home_main_content}>
				<div className={styles.home_left_content}>
					<div className={styles.card_detail}>
						<h4 className={styles.card_title}>Total Customer</h4>
						<div className="card-inner">
							<Link
								style={{
									textDecoration: 'none',
									textAlign: 'center',
								}}
								to="/"
							>
								<Button style={{ fontSize: 40 }}>12</Button>
							</Link>
						</div>
					</div>
					<div className={styles.card_detail}>
						<h4 className={styles.card_title}>Total Order</h4>
						<div className="card-inner">
							<Link
								style={{ textDecoration: 'none', textAlign: 'center' }}
								to="/"
							>
								<Button style={{ fontSize: 40 }}>36</Button>
							</Link>
						</div>
					</div>
					<div className={styles.card_detail}>
						<h4 className={styles.card_title}>Total Product Category</h4>
						<div className="card-inner">
							<Link
								style={{ textDecoration: 'none', textAlign: 'center' }}
								to="/"
							>
								<Button style={{ fontSize: 40 }}>349</Button>
							</Link>
						</div>
					</div>
					<div className={styles.card_detail}>
						<h4 className={styles.card_title}>Total Product Brand</h4>
						<div className="card-inner">
							<Link
								style={{ textDecoration: 'none', textAlign: 'center' }}
								to="/"
							>
								<Button style={{ fontSize: 40 }}>100</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
