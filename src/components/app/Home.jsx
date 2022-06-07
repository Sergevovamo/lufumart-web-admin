import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CountUp from 'react-countup';
import PieChartM from './PieChartM';
import SalesChart from './SalesChart';
import AreaChart from './AreaChart';
import { getTotalProducts } from '../../store/actions/product-actions';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../css/Home.module.css';

const Home = () => {
	const dispatch = useDispatch();
	const totalProduct = useSelector((state) => state.products?.totalProducts);

	useEffect(() => {
		dispatch(getTotalProducts());
	}, []);

	return (
		<div className={styles.home_container}>
			<div className={styles.home_header}>
				<h4 style={styles.title}>Dashboard</h4>
				{/* <Button variant="contained">Create Report</Button> */}
			</div>
			<div className={styles.home_main_header}>
				<div className={styles.home_card_header}>
					<div className={styles.image_header_1}>
						<img src="" alt="" />
					</div>
					<div>
						<h4>Total Sales</h4>
						<p>
							<CountUp
								start={0}
								end={0}
								duration={2.75}
								decimals={2}
								decimal="."
								prefix="$"
								separator=","
							/>
						</p>
					</div>
				</div>
				<div className={styles.home_card_header}>
					<div className={styles.image_header_2}>
						<img src="" alt="" />
					</div>
					<div>
						<h4>Total Orders</h4>
						<p>
							<CountUp start={0} end={0} duration={2.75} separator="," />
						</p>
					</div>
				</div>
				<div className={styles.home_card_header}>
					<div className={styles.image_header_3}>
						<img src="" alt="" />
					</div>
					<div>
						<h4>Total Products</h4>
						<p>
							<CountUp
								start={0}
								end={totalProduct}
								duration={2.75}
								separator=","
							/>
						</p>
					</div>
				</div>
			</div>
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
								<Button style={{ fontSize: 40 }}>
									<CountUp start={0} end={0} duration={2} />
								</Button>
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
								<Button style={{ fontSize: 40 }}>
									<CountUp start={0} end={0} duration={2} />
								</Button>
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
								<Button style={{ fontSize: 40 }}>
									<CountUp start={0} end={0} duration={2} />
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.card_detail}>
						<h4 className={styles.card_title}>Total Products</h4>
						<div className="card-inner">
							<Link
								style={{ textDecoration: 'none', textAlign: 'center' }}
								to="/"
							>
								<Button style={{ fontSize: 40 }}>
									<CountUp start={0} end={totalProduct} duration={2} />
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.home_right_content}>
					<div className={styles.product_card}>
						<h4>Products</h4>
						<hr className={styles.hr} />
						<div className={styles.chart_content}>
							<PieChartM />
						</div>
					</div>
					<div className={styles.sellers_card}>
						<h4>Sellers</h4>
						<hr className={styles.hr} />
						<div className={styles.chart_content}>
							<PieChartM />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.home_analytics}>
				<div className={styles.sales_chart}>
					<h4>Category Wise Product Sale</h4>
					<SalesChart />
				</div>
				<div className={styles.stock_chart}>
					<h4>Category Wise Product Stock</h4>
					<SalesChart />
				</div>
			</div>
		</div>
	);
};

export default Home;
