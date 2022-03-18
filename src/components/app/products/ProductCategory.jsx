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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useTable from '../../../utils/useTable';
import {
	postProductCategory,
	getProductCategories,
} from '../../../store/actions/product-actions';
import AdornedButton from '../../../utils/AdornedButton';
import styles from '../../../css/ProductCategory.module.css';

const ProductCategory = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let auth = useSelector((state) => state.auth);
	let productCategories = useSelector((state) => state.products);

	const [files, setFiles] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [selectedRole, setSelectedRole] = useState('Administrator');

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
		dispatch(getProductCategories());
	}, []);

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
	} = useTable(data, columns, filteredSearch);

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
			file: files[0],
			description,
		};

		await dispatch(postProductCategory(newData));
		await dispatch(getProductCategories());

		setButtonLoading(false);
		handleCloseDialog();
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
					<h3>Product Categories</h3>
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
										<TableRow
											sx={{
												'&:last-child td, &:last-child th': { border: 0 },
											}}
										>
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
													new Date(createdAt),
													"do MMM yyyy, h:mm:ss aaaaa'm'"
												)}
											</TableCell>
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
									You have no product categories
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</CustomTable>
				<CustomPagination />
			</TableContainer>
			<Dialog open={openPopup} onClose={handleCloseDialog}>
				<DialogTitle>Add Product Category</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							Create product category to allow easy management of products.
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
							label="Product Category description"
							placeholder="Type your description"
							error={errors?.description ? true : false}
							helperText={errors?.description?.message}
						/>
						{/* {auth?.user?.current_user?.isAdmin && (
							<TextField
								{...register('role', {
									required: 'Role is required!',
								})}
								fullWidth
								select
								label="User role level"
								value={selectedRole}
								onChange={handleChange}
								helperText="Please select user role level"
							>
								{roles.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						)} */}
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
		id: 'createdAt',
		label: 'Date Created',
	},
	{
		id: 'updatedAt',
		label: 'Last Update',
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
