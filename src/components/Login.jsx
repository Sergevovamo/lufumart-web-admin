import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import AdornedButton from '../utils/AdornedButton';
import { loginUser } from '../store/actions/auth-actions';
import '../css/Login.css';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	let auth = useSelector((state) => state.auth);
	let error = useSelector((state) => state.error);

	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const origin = location.state?.from?.pathname || '/';

	const {
		register,
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
		await dispatch(loginUser(data));
	};

	useEffect(() => {
		if (auth.isAuthenticated) {
			setButtonLoading(false);
			navigate(origin);
		}
	}, [auth.isAuthenticated]);

	useEffect(() => {
		// Check for login error
		if (error.id === 'LOGIN_FAIL') {
			setButtonLoading(false);
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<section className="login-section">
			<div className="login-container">
				<div className="wrapper">
					<div className="title">
						<div className="logo-container">
							{/* <img
								src="https://res.cloudinary.com/dgisuffs0/image/upload/v1641758237/logoz-trans_2_usrpz6.png"
								className="logo"
								alt=""
							/> */}
						</div>
						<span>Admin Login</span>
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
							{...register('password', {
								required: 'Password is required!',
								minLength: {
									value: 8,
									message: 'Password should be atleast 8 characters',
								},
							})}
							style={{ marginBottom: '.8rem' }}
							fullWidth
							name="password"
							type={showPassword ? 'text' : 'password'}
							label="Password"
							autoComplete="off"
							error={errors?.password ? true : false}
							helperText={errors?.password?.message}
						/>

						<div className="forgot">
							<Link to="/forgot-password">Forgot password?</Link>
						</div>
						<AdornedButton
							sx={{ background: '#00ab55' }}
							fullWidth
							disableElevation
							size="large"
							type="submit"
							style={{ marginTop: '1rem' }}
							disabled={buttonLoading ? true : false}
							loading={buttonLoading}
							variant="contained"
						>
							Login
						</AdornedButton>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
