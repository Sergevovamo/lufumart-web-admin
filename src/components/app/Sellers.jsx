import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	Paper,
	Popover,
	Tooltip,
	Table,
	MenuItem,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	IconButton,
	Toolbar,
	AppBar,
	Typography,
	Autocomplete,
	CircularProgress,
} from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreVert from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import { getSellers, adminCreateUser } from '../../store/actions/auth-actions';
import { useForm } from 'react-hook-form';
import useTable from '../../utils/useTable';
import styles from '../../css/Sellers.module.css';
import AdornedButton from '../../utils/AdornedButton';

const Sellers = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let sellers = useSelector((state) => state.auth.sellers?.sellers);
	let isLoading = useSelector((state) => state.auth?.isLoading);

	const [openPopup, setOpenPopup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [selectedRole, setSelectedRole] = useState('Seller');
	const [selectedGender, setSelectedGender] = useState('Female');

	const [filteredSearch, setFilteredSearch] = useState({
		fn: (items) => {
			return items;
		},
	});

	const columns = useMemo(() => COLUMNS, []);

	const {
		CustomTable,
		CustomHead,
		CustomPagination,
		recordsAfterPagingAndSorting,
	} = useTable(sellers, columns, filteredSearch);

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

	useEffect(() => {
		dispatch(getSellers());
	}, []);

	const handleChange = (event) => {
		setSelectedRole(event.target.value);
	};

	const handleChangeGender = (event) => {
		setSelectedGender(event.target.value);
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

		await dispatch(adminCreateUser(data));
		await dispatch(getSellers());

		setButtonLoading(false);
		handleCloseDialog();
	};

	return (
		<div className={styles.sellers_container}>
			<div className={styles.sellers_header}>
				<h4 style={styles.title}>Sellers list</h4>
				<Button variant="contained" onClick={handleClickOpen}>
					Create New
				</Button>
			</div>
			<TableContainer component={Paper} className={styles.sellers_content}>
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
					<h3>{sellers?.length} Sellers</h3>
				</div>
				<CustomTable>
					<CustomHead />
					<TableBody>
						{sellers?.length > 0 ? (
							recordsAfterPagingAndSorting()?.map((user, index) => {
								const {
									_id,
									name,
									email,
									phone,
									gender,
									isUserActive,
									createdAt,
								} = user;

								return (
									<Fragment key={index}>
										<TableRow>
											<TableCell>
												<Table>
													<TableBody>
														<TableRow>
															<TableCell
																sx={{ borderBottom: 'none' }}
																className={styles.image_header_1}
															>
																<img src="" alt="" />
															</TableCell>
															<TableCell
																sx={{ borderBottom: 'none' }}
																className={styles.seller_info}
															>
																<p>{name}</p>
																<p style={{ color: '#B2B9C1' }}>
																	Seller ID: #{_id.substring(3, length)}
																</p>
															</TableCell>
														</TableRow>
													</TableBody>
												</Table>
											</TableCell>
											<TableCell>{email}</TableCell>
											<TableCell>{phone}</TableCell>
											<TableCell>{gender}</TableCell>
											<TableCell>
												{isUserActive ? 'Active' : 'Inactive'}
											</TableCell>
											<TableCell>
												{format(
													new Date(createdAt),
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
										<p>You have no sellers</p>
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</CustomTable>
				<CustomPagination />
			</TableContainer>
			<Dialog open={openPopup} onClose={handleCloseDialog}>
				<DialogTitle>Add Seller</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							Create a new seller
						</DialogContentText>
						<TextField
							autoFocus
							{...register('name', {
								required: 'Seller name is required!',
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="name"
							fullWidth
							autoComplete="off"
							label="Seller name"
							placeholder="John Doe"
							error={errors?.name ? true : false}
							helperText={errors?.name?.message}
						/>
						<TextField
							{...register('email', {
								required: 'Email address is required!',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
								shouldFocus: true,
							})}
							name="email"
							fullWidth
							autoComplete="off"
							label="Email address"
							placeholder="johndoe@example.com"
							error={errors?.email ? true : false}
							helperText={errors?.email?.message}
						/>

						<TextField
							{...register('phone', {
								required: 'Phone is required!',
								pattern: {
									value: /^(\+243|0)[1-9]\d{8}$/i,
									message: 'Please enter a valid mobile number',
								},
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							label="Mobile number"
							placeholder="07xxxxxxxx"
							name="phone"
							type="number"
							margin="normal"
							autoComplete="off"
							fullWidth
							error={errors?.phone ? true : false}
							helperText={errors.phone && errors.phone.message}
						/>

						<TextField
							{...register('gender', {
								required: 'Gender is required!',
							})}
							style={{ marginBottom: '.8rem' }}
							fullWidth
							select
							label="Gender"
							value={selectedGender}
							onChange={handleChangeGender}
							helperText="Please select user gender"
						>
							{gender.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>

						<TextField
							{...register('role', {
								required: 'Role is required!',
							})}
							style={{ marginBottom: '.8rem' }}
							fullWidth
							select
							label="Role"
							value={selectedRole}
							onChange={handleChange}
							helperText="Please select user role"
						>
							{roles.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>

						<TextField
							{...register('password', {
								required: 'Password is required!',
								minLength: {
									value: 8,
									message: 'Password should be atleast 8 characters',
								},
							})}
							fullWidth
							name="password"
							type={showPassword ? 'text' : 'password'}
							label="Password"
							autoComplete="off"
							error={errors?.password ? true : false}
							helperText={errors?.password?.message}
						/>

						<TextField
							{...register('password_confirmation', {
								required: 'Please confirm password!',
								validate: (value) =>
									value === getValues('password') || 'Passwords do not match',
							})}
							name="password_confirmation"
							type={showPassword ? 'text' : 'password'}
							label="Confirm password"
							margin="normal"
							fullWidth
							autoComplete="off"
							error={errors?.password_confirmation ? true : false}
							helperText={errors?.password_confirmation?.message}
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

export default Sellers;

const gender = [
	{
		value: 'Male',
		label: 'Male',
	},
	{
		value: 'Female',
		label: 'Female',
	},
];

const roles = [
	{
		value: 'Seller',
		label: 'Seller',
	},
];

const COLUMNS = [
	{
		id: 'name',
		label: 'Seller Name',
	},
	{
		id: 'email',
		label: 'Email',
	},
	{
		id: 'phone',
		label: 'Phone',
	},
	{
		id: 'gender',
		label: 'Gender',
	},
	{
		id: 'status',
		label: 'Status',
	},
	{
		id: 'date',
		label: 'Date Registered',
	},
	{
		id: 'action',
		label: 'Action',
	},
];

const data = [
	{
		id: 901,
		name: 'Marvin McKinney',
		email: 'marvin@example.com',
		total: 9.0,
		status: 'Active',
		date: '03/12/2020',
	},
	{
		id: 2323,
		name: 'Leslie Alexander',
		email: 'leslie@example.com',
		total: 46.61,
		status: 'Active',
		date: '21/02/2020',
	},
	{
		id: 1233,
		name: 'Esther Howard',
		email: 'esther@example.com',
		total: 12.0,
		status: 'Inactive',
		date: '	03/07/2020',
	},
	{
		id: 1333,
		name: 'Esther Howard',
		email: 'esther@example.com',
		total: 12.0,
		status: 'Active',
		date: '03/07/2020',
	},
	{
		id: 7897,
		name: 'Albert Flores',
		email: 'albert@example.com',
		total: 10.0,
		status: 'Inactive',
		date: '23/04/2020',
	},
	{
		id: 2324,
		name: 'Jane Cooper',
		email: 'jane@example.com',
		total: 710.68,
		status: 'Active',
		date: '28/04/2020',
	},
];
