import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
	Table,
	MenuItem,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button,
} from '@mui/material';
import useTable from '../../utils/useTable';
import { getProducts } from '../../store/actions/product-actions';
import styles from '../../css/Products.module.css';

const Products = () => {
	const dispatch = useDispatch();

	let products = useSelector((state) => state.products);

	let loading = useSelector((state) => state.products?.isLoading);

	const [filteredSearch, setFilteredSearch] = useState({
		fn: (items) => {
			return items;
		},
	});

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => products?.products, [products?.products]);

	const {
		CustomTable,
		CustomHead,
		CustomPagination,
		recordsAfterPagingAndSorting,
	} = useTable(data, columns, filteredSearch);

	useEffect(() => {
		dispatch(getProducts());
	}, []);
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
					<h4 className={styles.card_title}>Product Sub Category</h4>
					<div className="card-inner">
						<Link
							style={{ textDecoration: 'none', textAlign: 'center' }}
							to="/products-sub-category"
						>
							<Button>View</Button>
						</Link>
					</div>
				</div>
				{/* <div className={styles.card_detail}>
					<h4 className={styles.card_title}>Popular Products</h4>
					<div className="card-inner">
						<Link
							style={{ textDecoration: 'none', textAlign: 'center' }}
							to="/popular-products"
						>
							<Button>View</Button>
						</Link>
					</div>
				</div> */}
				<div className={styles.card_detail}>
					<h4 className={styles.card_title}>Official Products</h4>
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
		</div>
	);
};

export default Products;

const COLUMNS = [
	{
		id: 'photo',
		label: 'Photo',
	},
	{
		id: 'name',
		label: 'Name',
	},
	{
		id: 'description',
		label: 'Description',
	},
	{
		id: 'category',
		label: 'Category',
	},
	{
		id: 'owner',
		label: 'Owner',
	},
	{
		id: 'price',
		label: 'Price',
	},
	{
		id: 'updatedAt',
		label: 'Last Update',
	},
];
