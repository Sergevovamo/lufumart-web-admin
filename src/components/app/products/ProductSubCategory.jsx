import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Fragment,
} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
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
	Popover,
	Tooltip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button,
	IconButton,
	Toolbar,
	AppBar,
	Typography,
	Autocomplete,
	CircularProgress,
} from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVert from '@mui/icons-material/MoreVert';
import useTable from '../../../utils/useTable';
import { tokenConfig } from '../../../store/actions/auth-actions';
import {
	postProductSubCategory,
	getProductSubCategories,
	getTotalProducts,
} from '../../../store/actions/product-actions';
import AdornedButton from '../../../utils/AdornedButton';
import styles from '../../../css/ProductSubCategory.module.css';

const ProductSubCategory = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = tokenConfig();

	let productSubCategories = useSelector((state) => state.products);
	let isLoading = useSelector((state) => state.products?.isLoading);
	const totalProductSubCategories = useSelector(
		(state) => state.products?.totalProductSubCategories
	);

	const [openPopup, setOpenPopup] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);

	const loading = open && options.length === 0;

	const [filteredSearch, setFilteredSearch] = useState({
		fn: (items) => {
			return items;
		},
	});

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	useEffect(() => {
		dispatch(getTotalProducts());
	}, []);

	useEffect(() => {
		dispatch(getProductSubCategories());
	}, []);

	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}
		(async () => {
			const response = await axios.get(
				'https://api-v1.lufumart.com/api/v1/product-categories',
				token
			);
			const categories = await response.data;

			if (active) {
				setOptions(categories);
			}
		})();
		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	const selectedOption = (value) => {
		setSelectedCategory(value);
	};

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(
		() => productSubCategories?.productSubCategories,
		[productSubCategories?.productSubCategories]
	);

	const {
		CustomTable,
		CustomHead,
		CustomPagination,
		recordsAfterPagingAndSorting,
	} = useTable(totalProductSubCategories, data, columns, filteredSearch);

	const handleSearch = (e) => {
		let target = e.target;
		setFilteredSearch({
			fn: (items) => {
				if (target.value === '') return items;
				else
					return items.filter((x) => {
						return (
							x.name.toLowerCase().indexOf(target.value.toLowerCase()) > -1 ||
							x.description.toLowerCase().indexOf(target.value.toLowerCase()) >
								-1
						);
					});
			},
		});
	};

	const handleClickOpen = () => {
		setOpenPopup(true);
	};

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);
		const { name, description } = data;

		const newData = {
			name,
			description,
			categoryId: selectedCategory?._id,
		};

		console.log(newData);

		await dispatch(postProductSubCategory(newData));
		await dispatch(getProductSubCategories());

		setButtonLoading(false);
		handleCloseDialog();
	};

	return (
		<div className={styles.product_container}>
			<IconButton
				style={{ marginTop: '1rem' }}
				onClick={() => navigate('/products')}
			>
				<ArrowBackIcon />
			</IconButton>
			<TableContainer sx={{ marginTop: '.5rem' }} component={Paper}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: '1rem',
						marginLeft: '1rem',
						marginRight: '1rem',
					}}
				>
					<h3>{totalProductSubCategories} Product Sub Categories</h3>
					<Button variant="contained" onClick={handleClickOpen}>
						Add Sub Category
					</Button>
				</div>
				<CustomTable>
					<CustomHead />
					<TableBody>
						{productSubCategories?.productSubCategories?.length > 0 ? (
							recordsAfterPagingAndSorting()?.map((item) => {
								const {
									_id,
									name,
									description,
									category,
									admin,
									createdAt,
									updatedAt,
								} = item;

								return (
									<Fragment key={_id}>
										<TableRow>
											<TableCell>{name}</TableCell>
											<TableCell align="left">{description}</TableCell>
											<TableCell align="left">{category?.name}</TableCell>
											<TableCell align="left">{admin?.name}</TableCell>
											<TableCell align="left">
												{format(
													new Date(updatedAt),
													"do MMM yyyy, h:mm:ss aaaaa'm'"
												)}
											</TableCell>
											<TableCell>
												<PopupState
													variant="popover"
													popupId="demo-popup-popover"
												>
													{(popupState) => (
														<>
															<IconButton {...bindTrigger(popupState)}>
																<Tooltip
																	title="More actions"
																	placement="right"
																	arrow
																>
																	<MoreVert />
																</Tooltip>
															</IconButton>
															<Popover
																{...bindPopover(popupState)}
																anchorOrigin={{
																	vertical: 'top',
																	horizontal: 'right',
																}}
																transformOrigin={{
																	vertical: 'top',
																	horizontal: 'right',
																}}
																elevation={1}
															>
																<Typography
																	sx={{
																		display: 'flex',
																		flexDirection: 'column',
																		padding: 2,
																	}}
																>
																	<Link
																		to="#"
																		style={{
																			textDecoration: 'none',
																			color: '#000',
																		}}
																		sx={{ padding: 2 }}
																	>
																		View
																	</Link>
																	<Link
																		to="#"
																		style={{
																			textDecoration: 'none',
																			color: '#000',
																			marginTop: 5,
																		}}
																	>
																		Update
																	</Link>
																	<Link
																		to="#"
																		style={{
																			textDecoration: 'none',
																			color: '#000',
																			marginTop: 5,
																		}}
																	>
																		Suspend
																	</Link>
																	<Link
																		to="#"
																		style={{
																			textDecoration: 'none',
																			color: '#000',
																			marginTop: 5,
																		}}
																	>
																		Unsuspend
																	</Link>
																</Typography>
															</Popover>
														</>
													)}
												</PopupState>
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
										<p>You have no product sub categories</p>
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</CustomTable>
				<CustomPagination />
			</TableContainer>
			<Dialog open={openPopup} onClose={handleCloseDialog}>
				<DialogTitle>Add Product Sub Category</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							Create product sub category to allow easy management of products.
						</DialogContentText>
						<Autocomplete
							id="category"
							style={{ marginBottom: '1rem' }}
							open={open}
							onOpen={() => {
								setOpen(true);
							}}
							onClose={() => {
								setOpen(false);
							}}
							onChange={(event, value) => selectedOption(value)}
							isOptionEqualToValue={(option, value) => {
								return option.name === value.name;
							}}
							getOptionLabel={(option) => option.name}
							options={options}
							loading={loading}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									{...register('category', {
										required: 'Product category is required!',
										shouldFocus: true,
									})}
									sx={{ marginBottom: '.8rem' }}
									label="Select Product Category"
									variant="outlined"
									InputProps={{
										...params.InputProps,
										endAdornment: (
											<>
												{loading ? (
													<CircularProgress color="inherit" size={20} />
												) : null}
												{params.InputProps.endAdornment}
											</>
										),
									}}
									error={errors?.category ? true : false}
									helperText={errors?.category?.message}
								/>
							)}
						/>

						<TextField
							{...register('name', {
								required: 'Product Sub Category is required!',
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="name"
							fullWidth
							autoComplete="off"
							label="Sub Category Name"
							placeholder="Fashion"
							error={errors?.name ? true : false}
							helperText={errors?.name?.message}
						/>

						<TextField
							{...register('description', {
								required: 'Description is required!',
								shouldFocus: true,
							})}
							sx={{ marginBottom: '.8rem', marginTop: '.8rem' }}
							name="description"
							fullWidth
							multiline
							rows={4}
							autoComplete="off"
							label="Product sub category description"
							placeholder="Type your description"
							error={errors?.description ? true : false}
							helperText={errors?.description?.message}
						/>
					</DialogContent>
					<DialogActions sx={{ marginRight: '1rem', marginBottom: '1rem' }}>
						<Button onClick={handleCloseDialog}>Cancel</Button>
						<AdornedButton
							type="submit"
							disabled={buttonLoading ? true : false}
							loading={buttonLoading}
							variant="contained"
						>
							Create
						</AdornedButton>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

export default ProductSubCategory;

const COLUMNS = [
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
		id: 'admin',
		label: 'Admin',
	},
	{
		id: 'updatedAt',
		label: 'Last Update',
	},
	{
		id: 'action',
		label: 'Action',
	},
];
