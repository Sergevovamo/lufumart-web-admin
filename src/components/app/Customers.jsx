import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	Paper,
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
import { format } from 'date-fns';
import { getUsers, adminCreateUser } from '../../store/actions/auth-actions';
import { useForm } from 'react-hook-form';
import useTable from '../../utils/useTable';
import styles from '../../css/Customers.module.css';
import AdornedButton from '../../utils/AdornedButton';

const Customers = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let users = useSelector((state) => state.auth.users?.customers);
	let isLoading = useSelector((state) => state.auth?.isLoading);

	console.log(users);

	const [openPopup, setOpenPopup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [selectedRole, setSelectedRole] = useState('Customer');
	const [selectedGender, setSelectedGender] = useState('Female');

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

	const columns = useMemo(() => COLUMNS, []);

	const {
		CustomTable,
		CustomHead,
		CustomPagination,
		recordsAfterPagingAndSorting,
	} = useTable(users, columns, filteredSearch);

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
		dispatch(getUsers());
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

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);

		await dispatch(adminCreateUser(data));
		await dispatch(getUsers());

		setButtonLoading(false);
		handleCloseDialog();
	};

	return (
		<div className={styles.customers_container}>
			<div className={styles.customers_header}>
				<h4 style={styles.title}>Customers list</h4>
				<Button variant="contained" onClick={handleClickOpen}>
					Create New
				</Button>
			</div>
			<TableContainer component={Paper} className={styles.orders_content}>
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
					<h3>{users?.length} Customers</h3>
				</div>
				<CustomTable>
					<CustomHead />
					<TableBody>
						{users?.length > 0 ? (
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
											<TableCell>{name}</TableCell>
											<TableCell>{email}</TableCell>
											<TableCell>{phone}</TableCell>
											<TableCell>{gender}</TableCell>
											<TableCell>
												{isUserActive ? 'active' : 'inactive'}
											</TableCell>
											<TableCell>
												{format(
													new Date(createdAt),
													"do MMM yyyy, h:mm:ss aaaaa'm'"
												)}
											</TableCell>
											<TableCell></TableCell>
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
										<p>You have no customers</p>
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</CustomTable>
				<CustomPagination />
			</TableContainer>
			<Dialog open={openPopup} onClose={handleCloseDialog}>
				<DialogTitle>Add Customer</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							Create a new customer
						</DialogContentText>
						<TextField
							autoFocus
							{...register('name', {
								required: 'Customer name is required!',
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="name"
							fullWidth
							autoComplete="off"
							label="Customer name"
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

export default Customers;

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
		value: 'Customer',
		label: 'Customer',
	},
];

const COLUMNS = [
	{
		id: 'name',
		label: 'Name',
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
		label: 'Date',
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
		status: 'Inactive',
		date: '03/07/2020',
	},
	{
		id: 7897,
		name: 'Albert Flores',
		email: 'albert@example.com',
		total: 10.0,
		status: 'Active',
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
