import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../../css/SellerProfile.module.css';

const SellerProfile = () => {
	let navigate = useNavigate();

	return (
		<div className={styles.sellers_container}>
			<IconButton
				style={{ marginTop: '1rem' }}
				onClick={() => navigate('/sellers')}
			>
				<ArrowBackIcon />
			</IconButton>
			<div className={styles.seller_details}>
				<div className={styles.upperHeader}>
					<div className={styles.sellerLogoCard}>
						<h4>Seller Logo</h4>
					</div>
				</div>
				<div className={styles.sellerInfo}>
					<h2>Adidas sports shop</h2>
					<p style={{ marginTop: '1rem', color: '#20203C' }}>
						3891 Ranchview Dr. Richardson, California 62639
					</p>
				</div>
				<div className={styles.sellerInfoLower}>
					<div className={styles.sellerSales}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<h4 style={{ color: '#B2B9C1', fontWeight: '200' }}>Revenue</h4>
							<span
								style={{
									marginTop: '.3rem',
									fontSize: '1.5rem',
									fontWeight: '550',
									color: '#00B520',
								}}
							>
								$2380
							</span>
						</div>
						<div
							style={{
								marginTop: '1rem',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<h4 style={{ color: '#B2B9C1', fontWeight: '200' }}>
								Total Sales
							</h4>
							<span
								style={{
									marginTop: '.3rem',
									fontSize: '1.5rem',
									color: '#00B520',
								}}
							>
								238
							</span>
						</div>
					</div>
					<div className={styles.sellerContact}>
						<h4 style={{ color: '#20203C' }}>Contacts</h4>
						<div>
							<p style={{ marginTop: '1rem', color: '#141432' }}>
								Manager: Jerome Bell info@example.com
							</p>
							<p style={{ marginTop: '1rem', color: '#141432' }}>
								(229) 555-0109, (808) 555-0111
							</p>
						</div>
					</div>
					<div className={styles.sellerContact}>
						<h4 style={{ color: '#20203C' }}>Address</h4>
						<div>
							<p style={{ marginTop: '1rem', color: '#141432' }}>
								Country: California
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								Address: Ranchview Dr. Richardson
							</p>
							<p style={{ marginTop: '.5rem', color: '#141432' }}>
								Postal code: 62639
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.sellerProducts}>
				<h3>{data.length} Products By Seller</h3>
				<div className={styles.products}>
					{data.map((product, index) => {
						const { url, title } = product;
						return (
							<div className={styles.productCard}>
								<div className={styles.productImageCard}>
									<img
										className={styles.productImage}
										src={`${url}`}
										alt="product-img"
									/>
								</div>
								<h4
									style={{
										color: '#141432',
										marginTop: '1rem',
										fontSize: '1rem',
									}}
								>
									{title}
								</h4>
								<h4 style={{ color: '#141432', marginTop: '.5rem' }}>
									$179.00
								</h4>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SellerProfile;

const data = [
	{
		title: 'Anise Aroma Art Bazar',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/4873_vv32wo.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 1,
	},
	{
		title: 'Wired Headphones',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843145/samples/ecommerce/wired_20headphones_my2zia.png',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 2,
	},
	{
		title: 'Noise Cancelling',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/NoiseCanceling_atzjnn.png',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Laptop Bag',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394323/samples/ecommerce/leather-bag-gray.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Watch',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394315/samples/ecommerce/analog-classic.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Watch',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394315/samples/ecommerce/analog-classic.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Laptop Bag',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394323/samples/ecommerce/leather-bag-gray.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Noise Cancelling',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/NoiseCanceling_atzjnn.png',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Anise Aroma Art Bazar',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/4873_vv32wo.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 1,
	},
	{
		title: 'Wired Headphones',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843145/samples/ecommerce/wired_20headphones_my2zia.png',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 2,
	},
];
