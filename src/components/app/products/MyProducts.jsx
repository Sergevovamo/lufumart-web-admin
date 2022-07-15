import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Fragment,
} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
	MenuItem,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Popover,
	Tooltip,
	Paper,
	Grid,
	CardHeader,
	Avatar,
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
	TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useForm } from 'react-hook-form';
import { orange } from '@mui/material/colors';
import MoreVert from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import ViewDay from '@mui/icons-material/ViewDay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import useTable from '../../../utils/useTable';
import { tokenConfig } from '../../../store/actions/auth-actions';
import {
	postProduct,
	updateProduct,
	getProducts,
	getTotalProducts,
} from '../../../store/actions/product-actions';
import AdornedButton from '../../../utils/AdornedButton';
import { numberWithCommas } from '../../../utils/NumberWithCommas';
import styles from '../../../css/MyProducts.module.css';

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

const MyProducts = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = tokenConfig();

	let auth = useSelector((state) => state.auth);
	let products = useSelector((state) => state.products);
	let isLoading = useSelector((state) => state.products?.isLoading);
	const totalProducts = useSelector((state) => state.products?.totalProducts);

	const [files, setFiles] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [openEditPopup, setOpenEditPopup] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const [open, setOpen] = useState(false);
	const [openSub, setOpenSub] = useState(false);

	const [options, setOptions] = useState([]);
	const [optionsSub, setOptionsSub] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedSubCategory, setSelectedSubCategory] = useState([]);

	// On edit mode
	const [updatedProduct, setUpdatedProduct] = useState([]);
	const [updatedCategory, setUpdatedCategory] = useState('');
	const [updatedSubCategory, setUpdatedSubCategory] = useState('');

	const [availabilityDate, setAvailabilityDate] = useState(new Date());
	const [startDateValue, setStartDateValue] = useState(new Date());
	const [endDateValue, setEndDateValue] = useState(new Date());

	const [salePrice, setSalePrice] = useState(0);
	const [size, setSize] = useState('0 * 0 * 0');

	const [length, setLength] = useState('0');
	const [width, setWidth] = useState('0');
	const [height, setHeight] = useState('0');
	const [weight, setWeight] = useState('0');

	const [selectedGender, setSelectedGender] = useState('Unisex');
	const [selectedSizeUnit, setSelectedSizeUnit] = useState('cm');
	const [selectedLocality, setSelectedLocality] = useState('International');
	const [selectedCurrency, setSelectedCurrency] = useState('KES');
	const [selectedWeightUnit, setSelectedWeightUnit] = useState('g');
	const [selectedAgeGroup, setSelectedAgeGroup] = useState('Child');
	const [selectedCondition, setSelectedCondition] = useState('Brand New');
	const [selectedAvailability, setSelectedAvailability] = useState('In Stock');
	const [expanded, setExpanded] = useState(false);
	const [toggleView, setToggleView] = useState(false);

	const pages = [20, 50, 100, 250];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

	const loading = open && options.length === 0;
	const loadingSub = openSub && optionsSub.length === 0;

	const [filteredSearch, setFilteredSearch] = useState({
		fn: (items) => {
			return items;
		},
	});

	const {
		register,
		getValues,
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
		accept: 'image/jpeg, image/png, image/webp',
		// accept: {
		// 	'image/jpeg': ['.jpeg', '.jpg'],
		// 	'image/png': ['.png'],
		// 	'image/webp': ['.webp'],
		// },
		maxFiles: 5,
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
		const payload = {
			page,
			limit: rowsPerPage,
		};

		dispatch(getProducts(payload));
	}, [page, rowsPerPage]);

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
		let active = true;

		if (!loadingSub) {
			return undefined;
		}
		(async () => {
			if (selectedCategory?._id) {
				const response = await axios.get(
					`https://api-v1.lufumart.com/api/v1/product-sub-categories/get-sub-category-by-category?categoryId=${selectedCategory?._id}`,
					token
				);
				const subCategories = await response.data;

				if (active) {
					setOptionsSub(subCategories);
				}
			}
		})();
		return () => {
			active = false;
		};
	}, [loadingSub]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	useEffect(() => {
		if (!openSub) {
			setOptionsSub([]);
		}
	}, [openSub]);

	const selectedOption = (value) => {
		setSelectedCategory(value);
	};

	const selectedOptionSub = (value) => {
		setSelectedSubCategory(value);
	};

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => products?.products, [products?.products]);

	const {
		CustomTable,
		CustomHead,
		CustomPagination,
		recordsAfterPagingAndSorting,
	} = useTable(totalProducts, data, columns, filteredSearch);

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

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
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

		const {
			ageGroup,
			availability,
			availabilityDate,
			brand,
			category,
			cloudinaryId,
			color,
			condition,
			createdAt,
			currency,
			description,
			gender,
			globalTradeItemNumber,
			imageUrl,
			inventoryThreshold,
			locality,
			manufactererPartNumber,
			name,
			model,
			owner,
			price,
			quantity,
			salePrice,
			salePriceEffectiveStartDate,
			salePriceEffectiveEndDate,
			size,
			subCategory,
			updatedAt,
			weight,
		} = data;

		setUpdatedProduct(data);

		let weightUnit = weight.replace(/(\d)/g, ''); // retrieve unit in weight kg/g
		let weightValue = weight.replace(/(\D)/g, ''); // retrieve value in weight

		reset({
			name,
			model,
			brand,
			color,
			price,
			quantity,
			description,
			inventoryThreshold,
			manufactererPartNumber,
			category: category.name,

			// form field only
			weight_quantity: weightValue,
		});

		if (weightUnit == ' g') {
			// remove space ' g' to 'g'
			setSelectedWeightUnit(weightUnit.replace(/\s/g, ''));
		}

		setSelectedCategory(category);
		setSelectedSubCategory(subCategory);
		setUpdatedCategory(category);
		setUpdatedSubCategory(subCategory);
		setSize(size);
		setWeight(weight);
		setSalePrice(salePrice);
		setSelectedGender(gender);
		setSelectedAgeGroup(ageGroup);
		setSelectedLocality(locality);
		setSelectedCurrency(currency);
		setSelectedCondition(condition);
		setSelectedAvailability(availability);
		setAvailabilityDate(availabilityDate);
		setStartDateValue(salePriceEffectiveStartDate);
		setEndDateValue(salePriceEffectiveEndDate);

		setOpenEditPopup(true);
	};

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const handleCloseEditDialog = () => {
		reset({
			name: '',
			model: '',
			brand: '',
			color: '',
			price: '',
			quantity: '',
			description: '',
			inventoryThreshold: '',
			manufactererPartNumber: '',
			// form field only
			weight_quantity: '',
		});

		setUpdatedProduct([]);

		setSelectedWeightUnit('g');
		setUpdatedCategory('');
		setUpdatedSubCategory('');

		setSelectedCategory([]);
		setSelectedSubCategory([]);

		setSize('0 * 0 * 0');
		setWeight('0');
		setSalePrice(0);
		setSelectedGender('Unisex');
		setSelectedAgeGroup('Child');
		setSelectedLocality('International');
		setSelectedCurrency('KES');
		setSelectedCondition('Brand New');
		setSelectedAvailability('In Stock');
		setAvailabilityDate(new Date());
		setStartDateValue(new Date());
		setEndDateValue(new Date());

		setOpenEditPopup(false);
	};

	const handleChangeCondition = (event) => {
		setSelectedCondition(event.target.value);
	};

	const handleChangePrice = (event) => {
		let price = parseInt(event.target.value);
		let deliveryFee = price * 0.1;
		let profit = price * 0.1;

		let newPrice = price + deliveryFee + profit;
		setSalePrice(newPrice.toFixed(2));
	};

	const handleChangeWeight = (event) => {
		setWeight(`${event.target.value} ${selectedWeightUnit}`);
	};

	const handleChangeLength = (event) => {
		let productLength = event.target.value;

		setSize(
			`${productLength}${selectedSizeUnit} * ${width}${selectedSizeUnit} * ${height}${selectedSizeUnit}`
		);
		setLength(`${productLength ? productLength : 0}`);
	};

	const handleChangeWidth = (event) => {
		let productWidth = event.target.value;

		setSize(
			`${length}${selectedSizeUnit} * ${productWidth}${selectedSizeUnit} * ${height}${selectedSizeUnit}`
		);
		setWidth(`${productWidth ? productWidth : 0}`);
	};

	const handleChangeHeight = (event) => {
		let productHeight = event.target.value;

		setSize(
			`${length}${selectedSizeUnit} * ${width}${selectedSizeUnit} * ${productHeight}${selectedSizeUnit}`
		);
		setHeight(`${productHeight ? productHeight : 0}`);
	};

	const handleChangeGender = (event) => {
		setSelectedGender(event.target.value);
	};

	const handleChangeLocality = (event) => {
		setSelectedLocality(event.target.value);
	};

	const handleChangeCurrency = (event) => {
		setSelectedCurrency(event.target.value);
	};

	const handleChangeSizeUnit = (event) => {
		setSelectedSizeUnit(event.target.value);
	};

	const handleChangeWeightUnit = (event) => {
		setSelectedWeightUnit(event.target.value);
	};

	const handleChangeAgeGroup = (event) => {
		setSelectedAgeGroup(event.target.value);
	};

	const handleChangeStock = (event) => {
		setSelectedAvailability(event.target.value);
	};

	const handleAvailabilityChange = (newValue) => {
		setAvailabilityDate(newValue);
	};

	const handleStartDateChange = (newValue) => {
		setStartDateValue(newValue);
	};

	const handleEndDateChange = (newValue) => {
		setEndDateValue(newValue);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);

		const {
			name,
			model,
			brand,
			color,
			locality,
			gender,
			ageGroup,
			// size, use the one from state
			price,
			currency,
			// salePrice, use the one from state
			quantity,
			description,
			condition,
			inventoryThreshold,
			availability,
			manufactererPartNumber,
		} = data;

		if (files?.length == 0) {
			return toast.error('Error! Please upload product images.');
		}

		let today = new Date();

		if (availabilityDate < today) {
			return toast.error(
				`Error! Availaibility date must be 1 day ahead current date.`
			);
		}

		if (startDateValue < availabilityDate) {
			return toast.error(
				`Error! Sale start date can't be less than availability date.`
			);
		}

		if (endDateValue < startDateValue) {
			return toast.error(`Error! Sale end date can't be less than start date.`);
		}

		const newData = {
			name,
			brand,
			model,
			color,
			locality,
			gender,
			ageGroup,
			size,
			weight,
			currency,
			price: parseInt(price),
			salePrice: parseInt(salePrice),
			quantity: parseInt(quantity),
			files,
			categoryId: selectedCategory?._id,
			subCategoryId: selectedSubCategory?._id,
			description,
			condition,
			inventoryThreshold: parseInt(inventoryThreshold),
			availability,
			availabilityDate: availabilityDate,
			salePriceEffectiveStartDate: startDateValue,
			salePriceEffectiveEndDate: endDateValue,
			manufactererPartNumber,
			globalTradeItemNumber: '',
		};

		// console.log(newData);

		await dispatch(postProduct(newData));
		await dispatch(getProducts());

		setButtonLoading(false);
		handleCloseDialog();
	};

	const onSubmitEdit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);

		const {
			name,
			model,
			brand,
			color,
			locality,
			gender,
			ageGroup,
			// size, use the one from state
			price,
			currency,
			// salePrice, use the one from state
			quantity,
			description,
			condition,
			inventoryThreshold,
			availability,
			manufactererPartNumber,
		} = data;

		let today = new Date();

		if (availabilityDate < today) {
			return toast.error(
				`Error! Availaibility date must be 1 day ahead current date.`
			);
		}

		if (startDateValue < availabilityDate) {
			return toast.error(
				`Error! Sale start date can't be less than availability date.`
			);
		}

		if (endDateValue < startDateValue) {
			return toast.error(`Error! Sale end date can't be less than start date.`);
		}

		const newData = {
			_id: updatedProduct?._id,
			name: name ? name : updatedProduct?.name,
			brand: brand ? brand : updatedProduct?.brand,
			model: model ? model : updatedProduct?.model,
			color: color ? color : updatedProduct?.color,
			locality: locality ? locality : updatedProduct?.locality,
			gender: gender ? gender : updatedProduct?.gender,
			ageGroup: ageGroup ? ageGroup : updatedProduct?.ageGroup,
			size: size ? size : updatedProduct?.size,
			weight: weight ? weight : updatedProduct?.weight,
			currency: currency ? currency : updatedProduct?.currency,
			price: parseInt(price) ? parseInt(price) : updatedProduct?.price,
			salePrice: parseInt(salePrice)
				? parseInt(salePrice)
				: updatedProduct?.salePrice,
			quantity: parseInt(quantity)
				? parseInt(quantity)
				: updatedProduct?.quantity,
			files: files?.length > 0 && files, // not necessary to upload files in edit
			categoryId: selectedCategory?._id
				? selectedCategory?._id
				: updatedProduct?.category?._id,
			subCategoryId: selectedSubCategory?._id
				? selectedSubCategory?._id
				: updatedProduct?.subCategory?._id,
			description: description ? description : updatedProduct?.description,
			condition: condition ? condition : updatedProduct?.condition,
			inventoryThreshold: parseInt(inventoryThreshold),
			availability: availability ? availability : updatedProduct?.availability,
			availabilityDate: availabilityDate
				? availabilityDate
				: updatedProduct?.availabilityDate,
			salePriceEffectiveStartDate: startDateValue
				? startDateValue
				: updatedProduct?.startDateValue,
			salePriceEffectiveEndDate: endDateValue
				? endDateValue
				: updatedProduct?.endDateValue,
			manufactererPartNumber: manufactererPartNumber
				? manufactererPartNumber
				: updatedProduct?.manufactererPartNumber,
			globalTradeItemNumber: '',
		};

		await dispatch(updateProduct(newData));
		await dispatch(getProducts());

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
				<div className={styles.products}>
					{products?.products?.length > 0 ? (
						recordsAfterPagingAndSorting()?.map((product) => {
							const {
								_id,
								name,
								description,
								owner,
								currency,
								category,
								imageUrl,
								price,
								salePrice,
								updatedAt,
							} = product;

							return (
								<div className={styles.productCard} key={_id}>
									<CardHeader
										avatar={
											<Avatar sx={{ bgcolor: orange[500] }} aria-label="recipe">
												{owner?.name.charAt(0)}
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
																		onClick={(e) => handleEditPopup(product, e)}
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
										title={owner?.name}
										subheader={format(new Date(updatedAt), 'do MMM yyyy')}
									/>
									<div className={styles.productImageCard}>
										<img
											className={styles.productImage}
											src={`${imageUrl[0]}`}
											alt="product-img"
										/>
									</div>
									<div className={styles.productName}>
										<h4>{name}</h4>
									</div>
									<h4
										style={{
											color: '#02AB55',
											marginTop: '.5rem',
											fontSize: '1rem',
										}}
									>
										USD ${salePrice}
									</h4>
								</div>
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
				</div>
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
						<h3>{totalProducts} Products</h3>
						<Button variant="contained" onClick={handleClickOpen}>
							Add Product
						</Button>
					</div>
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
										currency,
										category,
										imageUrl,
										price,
										salePrice,
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
												<TableCell align="left">
													{currency} {numberWithCommas(price)}
												</TableCell>
												<TableCell align="left">
													USD ${numberWithCommas(salePrice)}
												</TableCell>
												{/* <TableCell align="left">{owner?.name}</TableCell> */}
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
																			onClick={(e) =>
																				handleEditPopup(product, e)
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
					<TablePagination
						sx={{ overflow: 'hidden' }}
						component="div"
						page={page}
						rowsPerPageOptions={pages}
						rowsPerPage={rowsPerPage}
						count={totalProducts ? totalProducts : 0}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handleRowsPerPageChange}
					/>
				</TableContainer>
			)}

			<Dialog
				fullScreen
				open={openEditPopup ? openEditPopup : openPopup}
				onClose={handleCloseDialog}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={
								openEditPopup ? handleCloseEditDialog : handleCloseDialog
							}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							{openEditPopup ? 'Edit Product Category' : 'Add Product'}
						</Typography>
					</Toolbar>
				</AppBar>
				<form
					onSubmit={
						openEditPopup ? handleSubmit(onSubmitEdit) : handleSubmit(onSubmit)
					}
				>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							{`${
								openEditPopup ? `Edit` : `Create`
							} product to specific category to allow easy classification.`}
						</DialogContentText>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								flexWrap: 'wrap',
								marginBottom: '1rem',
							}}
						>
							{openEditPopup ? (
								<Autocomplete
									defaultValue={updatedCategory}
									id="category"
									style={{ marginBottom: '1rem' }}
									open={open}
									onOpen={() => {
										setOpen(true);
									}}
									onClose={() => {
										setOpen(false);
									}}
									options={options}
									onChange={(event, value) => selectedOption(value)}
									isOptionEqualToValue={(option, value) => {
										return option.name === value.name;
									}}
									getOptionLabel={(option) => option.name}
									loading={loading}
									fullWidth
									sx={{ width: '91%' }}
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
							) : (
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
									options={options}
									onChange={(event, value) => selectedOption(value)}
									isOptionEqualToValue={(option, value) => {
										return option.name === value.name;
									}}
									getOptionLabel={(option) => option.name}
									loading={loading}
									fullWidth
									sx={{ width: '91%' }}
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
							)}

							{openEditPopup ? (
								<Autocomplete
									defaultValue={updatedSubCategory}
									id="sub_category"
									style={{ marginBottom: '1rem' }}
									open={openSub}
									onOpen={() => {
										setOpenSub(true);
									}}
									onClose={() => {
										setOpenSub(false);
									}}
									onChange={(event, value) => selectedOptionSub(value)}
									isOptionEqualToValue={(option, value) => {
										return option.name === value.name;
									}}
									getOptionLabel={(option) => option.name}
									options={optionsSub}
									loading={loadingSub}
									fullWidth
									sx={{ width: '91%' }}
									renderInput={(params) => (
										<TextField
											{...params}
											{...register('subCategory', {
												required: !openEditPopup
													? 'Product sub category is required!'
													: false, // to avoid error
												shouldFocus: true,
											})}
											sx={{ marginBottom: '.8rem' }}
											label="Select Product Sub Category"
											variant="outlined"
											InputProps={{
												...params.InputProps,
												endAdornment: (
													<>
														{loadingSub ? (
															<CircularProgress color="inherit" size={20} />
														) : null}
														{params.InputProps.endAdornment}
													</>
												),
											}}
											error={errors?.subCategory ? true : false}
											helperText={errors?.subCategory?.message}
										/>
									)}
								/>
							) : (
								<Autocomplete
									id="sub_category"
									style={{ marginBottom: '1rem' }}
									open={openSub}
									onOpen={() => {
										setOpenSub(true);
									}}
									onClose={() => {
										setOpenSub(false);
									}}
									onChange={(event, value) => selectedOptionSub(value)}
									isOptionEqualToValue={(option, value) => {
										return option.name === value.name;
									}}
									getOptionLabel={(option) => option.name}
									options={optionsSub}
									loading={loadingSub}
									fullWidth
									sx={{ width: '91%' }}
									renderInput={(params) => (
										<TextField
											{...params}
											{...register('subCategory', {
												required: 'Product sub category is required!',
												shouldFocus: true,
											})}
											sx={{ marginBottom: '.8rem' }}
											label="Select Product Sub Category"
											variant="outlined"
											InputProps={{
												...params.InputProps,
												endAdornment: (
													<>
														{loadingSub ? (
															<CircularProgress color="inherit" size={20} />
														) : null}
														{params.InputProps.endAdornment}
													</>
												),
											}}
											error={errors?.subCategory ? true : false}
											helperText={errors?.subCategory?.message}
										/>
									)}
								/>
							)}

							<TextField
								{...register('name', {
									required: 'Product name is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="name"
								autoComplete="off"
								label="Product Name"
								placeholder="Baby shoes"
								error={errors?.name ? true : false}
								helperText={errors?.name?.message}
							/>
							<TextField
								{...register('brand', {
									required: 'Product brand is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="brand"
								autoComplete="off"
								label="Brand Name"
								placeholder="Baby converse"
								error={errors?.brand ? true : false}
								helperText={errors?.brand?.message}
							/>
							<TextField
								{...register('model')}
								style={{ marginBottom: '.8rem' }}
								name="model"
								autoComplete="off"
								label="Product Model"
								placeholder="Gucci"
							/>
							<TextField
								{...register('color', {
									required: 'Product color is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="color"
								autoComplete="off"
								label="Product Color"
								placeholder="Blue"
								error={errors?.color ? true : false}
								helperText={errors?.color?.message}
							/>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								flexWrap: 'wrap',
								marginBottom: '1rem',
							}}
						>
							<TextField
								{...register('quantity', {
									required: 'Product quantity is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="quantity"
								type="number"
								autoComplete="off"
								label="Product Quantity"
								placeholder="80"
								error={errors?.quantity ? true : false}
								helperText={errors?.quantity?.message}
							/>

							<TextField
								{...register('inventoryThreshold', {
									required: 'Product inventory is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="inventoryThreshold"
								type="number"
								autoComplete="off"
								label="Inventory Threshold"
								placeholder="50"
								error={errors?.inventoryThreshold ? true : false}
								helperText={errors?.inventoryThreshold?.message}
							/>

							<TextField
								{...register('price', {
									required: 'Product price is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="price"
								type="number"
								autoComplete="off"
								onChange={handleChangePrice}
								label="Product Price"
								placeholder="899"
								error={errors?.price ? true : false}
								helperText={errors?.price?.message}
							/>
							<TextField
								{...register('salePrice')}
								style={{ marginBottom: '.8rem' }}
								name="salePrice"
								type="number"
								value={salePrice}
								autoComplete="off"
								label="Product Sale Price"
								placeholder="800"
							/>
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								flexWrap: 'wrap',
								marginBottom: '1rem',
							}}
						>
							<TextField
								{...register('weight_unit', {
									required: 'Product weight unit is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product Weight Unit"
								value={selectedWeightUnit}
								onChange={handleChangeWeightUnit}
								helperText="select product weight unit"
							>
								{weightUnit.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								{...register('weight_quantity', {
									required: 'Product weight quantity is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="weight_quantity"
								type="number"
								autoComplete="off"
								onChange={handleChangeWeight}
								label="Weight Quantity"
								error={errors?.weight_quantity ? true : false}
								helperText={errors?.weight_quantity?.message}
							/>

							<TextField
								{...register('weight', {
									required: 'Product length is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="weight"
								autoComplete="off"
								value={weight}
								label="Product Weight"
							/>
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								flexWrap: 'wrap',
								marginBottom: '1rem',
							}}
						>
							<TextField
								{...register('locality', {
									required: 'Product locality is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product Locality"
								value={selectedLocality}
								onChange={handleChangeLocality}
								helperText="select product locality"
							>
								{locality.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								{...register('currency', {
									required: 'Product currency is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product Currency"
								value={selectedCurrency}
								onChange={handleChangeCurrency}
								helperText="select product currency"
							>
								{currency.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								{...register('size_unit', {
									required: 'Product size unit is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product Size Unit"
								value={selectedSizeUnit}
								onChange={handleChangeSizeUnit}
								helperText="select product size unit"
							>
								{sizeUnit.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								flexWrap: 'wrap',
								marginBottom: '1rem',
							}}
						>
							<TextField
								{...register('length', {
									required: !openEditPopup
										? 'Product length is required!'
										: false,
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="length"
								type="number"
								autoComplete="off"
								onChange={handleChangeLength}
								label="Product Length"
								error={errors?.length ? true : false}
								helperText={errors?.length?.message}
							/>

							<TextField
								{...register('width', {
									required: !openEditPopup
										? 'Product width is required!'
										: false,
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="width"
								type="number"
								autoComplete="off"
								onChange={handleChangeWidth}
								label="Product Width"
								error={errors?.width ? true : false}
								helperText={errors?.width?.message}
							/>

							<TextField
								{...register('height', {
									required: !openEditPopup
										? 'Product width is required!'
										: false,
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="height"
								type="number"
								autoComplete="off"
								onChange={handleChangeHeight}
								label="Product Height"
								error={errors?.height ? true : false}
								helperText={errors?.height?.message}
							/>

							<TextField
								{...register('size', {
									required: 'Product size is required!',
									shouldFocus: true,
								})}
								style={{ marginBottom: '.8rem' }}
								name="size"
								autoComplete="off"
								value={size}
								label="Product size"
								placeholder="70cm * 30cm * 40cm"
							/>
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								flexWrap: 'wrap',
								marginBottom: '1rem',
							}}
						>
							<TextField
								{...register('gender', {
									required: 'Product gender is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product Gender"
								value={selectedGender}
								onChange={handleChangeGender}
								helperText="select product gender"
							>
								{gender.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								{...register('ageGroup', {
									required: 'Product ageGroup is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product Age Group"
								value={selectedAgeGroup}
								onChange={handleChangeAgeGroup}
								helperText="select product ageGroup"
							>
								{ageGroup.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								{...register('condition', {
									required: 'Product condition is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product condition"
								value={selectedCondition}
								onChange={handleChangeCondition}
								helperText="select product condition"
							>
								{condition.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								{...register('availability', {
									required: 'Product availability is required!',
								})}
								style={{ marginBottom: '.8rem' }}
								select
								label="Product Availability"
								value={selectedAvailability}
								onChange={handleChangeStock}
								helperText="select product availability"
							>
								{productAvailability.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</div>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									flexWrap: 'wrap',
									marginBottom: '1rem',
								}}
							>
								<MobileDatePicker
									label="Availability Date"
									inputFormat="MM/dd/yyyy"
									value={availabilityDate}
									onChange={handleAvailabilityChange}
									renderInput={(params) => (
										<TextField sx={{ marginBottom: '.8rem' }} {...params} />
									)}
								/>
								<MobileDatePicker
									label="Sale price effective start date"
									inputFormat="MM/dd/yyyy"
									value={startDateValue}
									onChange={handleStartDateChange}
									renderInput={(params) => (
										<TextField sx={{ marginBottom: '.8rem' }} {...params} />
									)}
								/>
								<MobileDatePicker
									label="Sale price effective end date"
									inputFormat="MM/dd/yyyy"
									value={endDateValue}
									onChange={handleEndDateChange}
									renderInput={(params) => (
										<TextField sx={{ marginBottom: '.8rem' }} {...params} />
									)}
								/>
								<TextField
									{...register('manufactererPartNumber')}
									style={{ marginBottom: '.8rem' }}
									name="manufactererPartNumber"
									autoComplete="off"
									label="Manufacterer Part No."
									placeholder="ABC123"
								/>
							</div>
						</LocalizationProvider>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '1rem',
							}}
						>
							{updatedProduct.imageUrl?.map((image, index) => {
								return (
									<div className={styles.imageCard} key={index}>
										<div className={styles.productImageCard}>
											<img
												className={styles.productImage}
												src={`${image}`}
												alt="product-img"
											/>
										</div>
									</div>
								);
							})}
						</div>

						<div {...getRootProps({ style })}>
							<input {...getInputProps()} />
							<div>Drag and drop your images here.</div>
							<em>
								(5 files is the maximum number of files you can drop here)
							</em>
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
							label="Product description"
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

export default MyProducts;

const gender = [
	{
		value: 'Male',
		label: 'Male',
	},
	{
		value: 'Female',
		label: 'Female',
	},
	{
		value: 'Unisex',
		label: 'Unisex',
	},
];

const locality = [
	{
		value: 'Local',
		label: 'Local',
	},
	{
		value: 'International',
		label: 'International',
	},
];

const currency = [
	{
		value: 'KES',
		label: 'Kenyan Shilling',
	},
	{
		value: 'USh',
		label: 'Ugandan Shilling',
	},
	{
		value: 'FC',
		label: 'Congolese Fanc',
	},
	{
		value: 'USD',
		label: 'United States Dollar',
	},
];

const sizeUnit = [
	{
		value: 'mm',
		label: 'millimeters',
	},
	{
		value: 'cm',
		label: 'centimeters',
	},
	{
		value: 'm',
		label: 'meters',
	},
];

const weightUnit = [
	{
		value: 'g',
		label: 'grams',
	},
	{
		value: 'kg',
		label: 'kilograms',
	},
];

const ageGroup = [
	{
		value: 'Child',
		label: 'Child',
	},
	{
		value: 'Adult',
		label: 'Adult',
	},
];

const condition = [
	{
		value: 'Brand New',
		label: 'Brand New',
	},
	{
		value: 'Used',
		label: 'Used',
	},
	{
		value: 'Refurbished',
		label: 'Refurbished',
	},
	{
		value: 'Custom Made',
		label: 'Custom Made',
	},
];

const productAvailability = [
	{
		value: 'In Stock',
		label: 'In Stock',
	},
	{
		value: 'Out of Stock',
		label: 'Out of Stock',
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
		id: 'category',
		label: 'Category',
	},
	{
		id: 'price',
		label: 'Price',
	},
	{
		id: 'salePrice',
		label: 'Sale Price',
	},
	// {
	// 	id: 'owner',
	// 	label: 'Owner',
	// },
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
