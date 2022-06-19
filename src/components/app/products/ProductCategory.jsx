import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Fragment,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Popover,
	Tooltip,
	Paper,
	Grid,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	CardActions,
	Collapse,
	Avatar,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
	Button,
	IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useForm } from 'react-hook-form';
import { orange } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVert from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import ViewDay from '@mui/icons-material/ViewDay';
import useTable from '../../../utils/useTable';
import {
	postProductCategory,
	updateProductCategory,
	getProductCategories,
	getTotalProducts,
} from '../../../store/actions/product-actions';
import AdornedButton from '../../../utils/AdornedButton';
import styles from '../../../css/ProductCategory.module.css';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const ProductCategory = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let auth = useSelector((state) => state.auth);
	let productCategories = useSelector((state) => state.products);
	let loading = useSelector((state) => state.products?.isLoading);
	const totalProductCategories = useSelector(
		(state) => state.products?.totalProductCategories
	);

	const [files, setFiles] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [openEditPopup, setOpenEditPopup] = useState(false);
	const [updatedCategory, setUpdatedCategory] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [selectedRole, setSelectedRole] = useState('Administrator');
	const [expanded, setExpanded] = useState(false);
	const [toggleView, setToggleView] = useState(false);

	const [filteredSearch, setFilteredSearch] = useState({
		fn: (items) => {
			return items;
		},
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	const onDrop = useCallback((acceptedFiles) => {
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop,
		accept: 'image/jpeg, image/png',
		maxFiles: 1,
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	useEffect(() => {
		dispatch(getTotalProducts());
	}, []);

	useEffect(() => {
		dispatch(getProductCategories());
	}, []);

	useEffect(() => {
		reset({
			name: '',
			email: '',
			phone: '',
		});
		// eslint-disable-next-line
	}, [openPopup]);

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(
		() => productCategories?.productCategories,
		[productCategories?.productCategories]
	);

	const {
		CustomTable,
		CustomHead,
		CustomPagination,
		recordsAfterPagingAndSorting,
	} = useTable(totalProductCategories, data, columns, filteredSearch);

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

	const handleChange = (event) => {
		setSelectedRole(event.target.value);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleToggleClick = () => {
		setToggleView(!toggleView);
	};

	const handleClickOpen = () => {
		setOpenPopup(true);
	};

	const handleEditPopup = (data, e) => {
		e.preventDefault();
		const { name, description } = data;

		reset({
			name,
			description,
		});

		setUpdatedCategory(data);
		setOpenEditPopup(true);
	};

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const handleCloseEditDialog = () => {
		reset({
			name: '',
			description: '',
		});
		setOpenEditPopup(false);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);
		const { name, description } = data;

		const newData = {
			name,
			file: files[0],
			description,
		};

		await dispatch(postProductCategory(newData));
		await dispatch(getProductCategories());

		setButtonLoading(false);
		handleCloseDialog();
	};

	const onSubmitEdit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);
		const { name, description } = data;

		const newData = {
			_id: updatedCategory._id,
			name,
			file: files[0],
			description,
		};

		await dispatch(updateProductCategory(newData));
		await dispatch(getProductCategories());

		setButtonLoading(false);
		handleCloseEditDialog();
	};

	const thumbs = files.map((file) => (
		<div
			key={file.name}
			onClick={() => onDelete(file)}
			style={{ cursor: 'pointer' }}
		>
			<img
				style={{ width: '100px', marginRight: '.8rem' }}
				src={file.preview}
				alt={file.name}
			/>
		</div>
	));

	const onDelete = (image) => {
		const currentIndex = files.indexOf(image);

		let newImages = [...files];
		newImages.splice(currentIndex, 1);

		setFiles(newImages);
	};

	// clean up
	useEffect(
		() => () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	return (
		<div className={styles.product_container}>
			<Grid
				container
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				style={{ marginTop: '1rem' }}
			>
				<IconButton onClick={() => navigate('/products')}>
					<ArrowBackIcon />
				</IconButton>
				<Grid
					item
					style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
				>
					<Typography>View</Typography>
					<IconButton onClick={handleToggleClick}>
						{toggleView ? <ViewDay /> : <GridViewOutlined />}
					</IconButton>
				</Grid>
			</Grid>
			{toggleView ? (
				<Grid container spacing={2} style={{ marginTop: '.5rem' }}>
					{productCategories?.productCategories?.length > 0 ? (
						recordsAfterPagingAndSorting()?.map((category) => {
							const { _id, name, description, admin, imageUrl, updatedAt } =
								category;
							return (
								<Grid item xs={3} key={_id}>
									<Card>
										<CardHeader
											avatar={
												<Avatar
													sx={{ bgcolor: orange[500] }}
													aria-label="recipe"
												>
													{admin?.name.charAt(0)}
												</Avatar>
											}
											action={
												<>
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
																			onClick={(e) =>
																				handleEditPopup(category, e)
																			}
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
												</>
											}
											title={admin?.name}
											subheader={format(new Date(updatedAt), 'do MMM yyyy')}
										/>

										<Paper elevation={0} sx={{ padding: '.5rem' }}>
											<CardMedia
												component="img"
												image={imageUrl}
												alt="Product Category Images"
											/>
										</Paper>

										<CardContent>
											<Typography>{name}</Typography>
										</CardContent>
										<CardActions disableSpacing>
											<ExpandMore
												expand={expanded}
												onClick={handleExpandClick}
												aria-expanded={expanded}
												aria-label="show more"
											>
												<ExpandMoreIcon />
											</ExpandMore>
										</CardActions>
										<Collapse in={expanded} timeout="auto" unmountOnExit>
											<CardContent>
												<Typography paragraph>Description:</Typography>
												<Typography paragraph>{description}</Typography>
											</CardContent>
										</Collapse>
									</Card>
								</Grid>
							);
						})
					) : (
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
						>
							<Grid item>
								{loading ? (
									<CircularProgress
										variant="indeterminate"
										disableShrink
										size={25}
										thickness={4}
									/>
								) : (
									<p>You have no product categories</p>
								)}
							</Grid>
						</Grid>
					)}
				</Grid>
			) : (
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
						<h3>{totalProductCategories} Product Categories</h3>
						<Button variant="contained" onClick={handleClickOpen}>
							Add Category
						</Button>
					</div>
					<CustomTable>
						<CustomHead />
						<TableBody>
							{productCategories?.productCategories?.length > 0 ? (
								recordsAfterPagingAndSorting()?.map((category) => {
									const {
										_id,
										name,
										description,
										admin,
										imageUrl,
										createdAt,
										updatedAt,
									} = category;

									return (
										<Fragment key={_id}>
											<TableRow>
												<TableCell>
													<img
														style={{ width: '50px' }}
														src={imageUrl}
														alt={name}
													/>
												</TableCell>
												<TableCell>{name}</TableCell>
												<TableCell align="left">{description}</TableCell>
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
																			onClick={(e) =>
																				handleEditPopup(category, e)
																			}
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
										{loading ? (
											<CircularProgress
												variant="indeterminate"
												disableShrink
												size={25}
												thickness={4}
											/>
										) : (
											<p>You have no product categories</p>
										)}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</CustomTable>
					<CustomPagination />
				</TableContainer>
			)}

			<Dialog open={openEditPopup ? openEditPopup : openPopup}>
				<DialogTitle>
					{openEditPopup ? 'Edit Product Category' : 'Add Product Category'}{' '}
				</DialogTitle>
				<form
					onSubmit={
						openEditPopup ? handleSubmit(onSubmitEdit) : handleSubmit(onSubmit)
					}
				>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							{openEditPopup
								? 'Edit product category to allow easy management of products.'
								: 'Create product category to allow easy management of products.'}
						</DialogContentText>

						<TextField
							autoFocus
							{...register('name', {
								required: 'Product Category is required!',
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="name"
							fullWidth
							autoComplete="off"
							label="Category Name"
							placeholder="Baby Products"
							error={errors?.name ? true : false}
							helperText={errors?.name?.message}
						/>
						<Card sx={{ marginBottom: '.8rem' }}>
							<CardMedia
								component="img"
								image={updatedCategory?.imageUrl}
								alt="Product Category Images"
							/>
						</Card>

						<div {...getRootProps({ style })}>
							<input {...getInputProps()} />
							<div>Drag and drop your images here.</div>
							<em>(1 file is the maximum number of file you can drop here)</em>
						</div>
						<aside
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'center',
								marginTop: '.8rem',
							}}
						>
							{thumbs}
						</aside>

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
							label="Product category description"
							placeholder="Type your description"
							error={errors?.description ? true : false}
							helperText={errors?.description?.message}
						/>
					</DialogContent>
					<DialogActions sx={{ marginRight: '1rem', marginBottom: '1rem' }}>
						<Button
							onClick={
								openEditPopup ? handleCloseEditDialog : handleCloseDialog
							}
						>
							Cancel
						</Button>
						<AdornedButton
							type="submit"
							disabled={buttonLoading ? true : false}
							loading={buttonLoading}
							variant="contained"
						>
							{openEditPopup ? 'Update' : 'Create'}
						</AdornedButton>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

export default ProductCategory;

const roles = [
	{
		value: 'Administrator',
		label: 'Administrator',
	},
	{
		value: 'Normal staff',
		label: 'Normal staff',
	},
	{
		value: 'Seller',
		label: 'Seller',
	},
	{
		value: 'Customer',
		label: 'Customer',
	},
];

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

const baseStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	transition: 'border .3s ease-in-out',
};

const activeStyle = {
	borderColor: '#2196f3',
};

const acceptStyle = {
	borderColor: '#00e676',
};

const rejectStyle = {
	borderColor: '#ff1744',
};
