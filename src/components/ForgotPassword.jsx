import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AdornedButton from '../utils/AdornedButton';
import { forgotPassword } from '../store/actions/auth-actions';
import '../css/ForgotPassword.css';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let auth = useSelector((state) => state.auth);
	let error = useSelector((state) => state.error);

	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

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

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const onSubmit = async (data, e) => {
		setButtonLoading(true);
		e.preventDefault();
		await dispatch(forgotPassword(data));
		// setButtonLoading(false);
	};

	useEffect(() => {
		if (auth.isResetPassword) {
			navigate('/login');
			// setButtonLoading(false);
		}
	}, [auth.isResetPassword]);

	return (
		<section className="forgot-section">
			<div className="forgot-container">
				<div className="wrapper">
					<div className="title">
						<div className="logo-container">
							{/* <img
								src="https://res.cloudinary.com/dgisuffs0/image/upload/v1641758237/logoz-trans_2_usrpz6.png"
								className="logo"
								alt=""
							/> */}
						</div>
						<span>Reset Password</span>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							{...register('email', {
								required: 'Email address is required!',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="email"
							fullWidth
							autoComplete="off"
							label="Email address"
							placeholder="johndoe@example.com"
							error={errors?.email ? true : false}
							helperText={errors?.email?.message}
						/>

						<TextField
							{...register('newPassword', {
								required: 'New Password is required!',
								minLength: {
									value: 8,
									message: 'Password should be atleast 8 characters',
								},
							})}
							style={{ marginBottom: '.8rem' }}
							fullWidth
							name="newPassword"
							type={showPassword ? 'text' : 'password'}
							label="New Password"
							autoComplete="off"
							error={errors?.new_password ? true : false}
							helperText={errors?.new_password?.message}
						/>

						<AdornedButton
							sx={{ background: '#00ab55' }}
							fullWidth
							disableElevation
							size="large"
							type="submit"
							color="primary"
							style={{ marginTop: '1rem' }}
							disabled={buttonLoading ? true : false}
							loading={buttonLoading}
							variant="contained"
						>
							Reset Password
						</AdornedButton>
						<div className="signup-link">
							Remember password? <Link to="/login">Back to Login</Link>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ForgotPassword;
