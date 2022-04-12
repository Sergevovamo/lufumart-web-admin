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
						<TableRow>
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
				<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
					{products?.products?.length} Total Products
				</h3>
				<Table aria-label="simple table">
					<CustomHead />
					<TableBody>
						{products?.products?.length > 0 ? (
							recordsAfterPagingAndSorting()?.map((product) => {
								const {
									_id,
									name,
									description,
									owner,
									category,
									imageUrl,
									price,
									updatedAt,
								} = product;

								return (
									<Fragment key={_id}>
										<TableRow>
											<TableCell>
												<img
													style={{ width: '50px' }}
													src={imageUrl[0]}
													alt={name}
												/>
											</TableCell>
											<TableCell>{name}</TableCell>
											<TableCell align="left">{description}</TableCell>
											<TableCell align="left">{category?.name}</TableCell>
											<TableCell align="left">{owner?.name}</TableCell>
											<TableCell align="left">{price}</TableCell>
											<TableCell align="left">
												{format(
													new Date(updatedAt),
													"do MMM yyyy, h:mm:ss aaaaa'm'"
												)}
											</TableCell>
										</TableRow>
									</Fragment>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={12}
									style={{ padding: '1rem', textAlign: 'center' }}
								>
									{loading ? (
										<CircularProgress
											variant="indeterminate"
											disableShrink
											size={25}
											thickness={4}
										/>
									) : (
										<p>You have no products</p>
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<CustomPagination />
			</TableContainer>
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
