import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button,
	IconButton,
	CircularProgress,
} from '@mui/material';
import useTable from '../../../utils/useTable';
import {
	postProduct,
	getProducts,
} from '../../../store/actions/product-actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../../css/SellerProducts.module.css';

const SellerProducts = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let products = useSelector((state) => state.products);
	let isLoading = useSelector((state) => state.products?.isLoading);

	const [filteredSearch, setFilteredSearch] = useState({
		fn: (items) => {
			return items;
		},
	});

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => products?.products, [products?.products]);

	const {
		CustomTable,
		CustomHead,
		CustomPagination,
		recordsAfterPagingAndSorting,
	} = useTable(data, columns, filteredSearch);

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
				<CustomTable>
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
									{isLoading ? (
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
				</CustomTable>
				<CustomPagination />
			</TableContainer>
		</div>
	);
};

export default SellerProducts;

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
