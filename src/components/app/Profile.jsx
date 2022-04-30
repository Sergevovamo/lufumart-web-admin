import React from 'react';
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
import { useForm } from 'react-hook-form';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from '../../css/Profile.module.css';

const Profile = () => {
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

	return (
		<div className={styles.profile_container}>
			<div className={styles.profile_header}>
				<h4>User Settings</h4>
			</div>
			<Paper>
				<div className={styles.user_header}>
					<IconButton>
						<SettingsIcon />
					</IconButton>
					<h3>Account Settings</h3>
				</div>
				<div className={styles.user_desc}>
					<h4>Configure credentials, secrets, and more in account settings.</h4>
				</div>
			</Paper>
			<Paper sx={{ marginTop: '1rem', padding: '1rem', minHeight: '50vh' }}>
				<div className={styles.user_header}>
					<IconButton>
						<AccountCircleOutlinedIcon />
					</IconButton>
					<h3>About You</h3>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<div className={styles.image_header_1}>
						<img src="" alt="" />
					</div>
					<div style={{ padding: '1rem' }}>
						<p>
							Your avatar is the Gravatar linked to allistermugaisi@gmail.com
						</p>
						<Button>Update at Gravatar</Button>
					</div>
				</div>
				<div
					style={{
						marginTop: '1rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						gap: 8,
					}}
				>
					<TextField
						{...register('name', {
							required: 'Your name is required!',
							shouldFocus: true,
						})}
						fullWidth
						name="name"
						autoComplete="off"
						label="Your name"
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
						fullWidth
						name="email"
						autoComplete="off"
						label="Email address"
						placeholder="johndoe@example.com"
						error={errors?.email ? true : false}
						helperText={errors?.email?.message}
					/>
				</div>
				<div
					style={{
						marginTop: '1rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						gap: 8,
					}}
				>
					<TextField
						{...register('phone', {
							required: 'Phone is required!',
							pattern: {
								value: /^(\+243|0)[1-9]\d{8}$/i,
								message: 'Please enter a valid mobile number',
							},
							shouldFocus: true,
						})}
						label="Mobile number"
						placeholder="07xxxxxxxx"
						name="phone"
						type="number"
						autoComplete="off"
						fullWidth
						error={errors?.phone ? true : false}
						helperText={errors.phone && errors.phone.message}
					/>
					<TextField
						{...register('location', {
							required: 'Location is required!',
							shouldFocus: true,
						})}
						fullWidth
						name="location"
						autoComplete="off"
						label="Location"
						placeholder="Nairobi CBD"
						error={errors?.name ? true : false}
						helperText={errors?.location?.message}
					/>
				</div>
				<div
					style={{ marginTop: '.5rem', display: 'flex', justifyContent: 'end' }}
				>
					<Button variant="contained">Save</Button>
				</div>
			</Paper>
			<Paper sx={{ marginTop: '1rem', padding: '1rem', minHeight: '50vh' }}>
				<div className={styles.user_header}>
					<IconButton>
						<PasswordOutlinedIcon />
					</IconButton>
					<h3>Change Password</h3>
				</div>
				<div
					style={{
						width: '50%',
						marginTop: '1rem',
						display: 'flex',
						gap: 8,
					}}
				>
					<TextField
						{...register('current_password', {
							required: 'Current Password is required!',
							minLength: {
								value: 8,
								message: 'Password should be atleast 8 characters',
							},
						})}
						fullWidth
						name="current_password"
						label="Current Password"
						autoComplete="off"
						error={errors?.current_password ? true : false}
						helperText={errors?.current_password?.message}
					/>
				</div>
				<div
					style={{
						width: '50%',
						marginTop: '1rem',
						display: 'flex',
						gap: 8,
					}}
				>
					<TextField
						{...register('new_password', {
							required: 'Current Password is required!',
							minLength: {
								value: 8,
								message: 'Password should be atleast 8 characters',
							},
						})}
						fullWidth
						name="new_password"
						label="New Password"
						autoComplete="off"
						error={errors?.new_password ? true : false}
						helperText={errors?.new_password?.message}
					/>
				</div>
				<div
					style={{
						width: '50%',
						marginTop: '1rem',
						display: 'flex',
						gap: 8,
					}}
				>
					<TextField
						{...register('password_confirmation', {
							required: 'Please confirm password!',
							validate: (value) =>
								value === getValues('new_password') || 'Passwords do not match',
						})}
						name="password_confirmation"
						label="Confirm password"
						fullWidth
						autoComplete="off"
						error={errors?.password_confirmation ? true : false}
						helperText={errors?.password_confirmation?.message}
					/>
				</div>
				<div
					style={{ marginTop: '.5rem', display: 'flex', justifyContent: 'end' }}
				>
					<Button variant="contained">Change</Button>
				</div>
			</Paper>
		</div>
	);
};

export default Profile;
