import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import Profile from '../../assets/images/profile.jpg';
import { logOut } from '../../store/actions/auth-actions';

const Sidebar = ({ toggled, handleDrawerToggle }) => {
	let auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	const signOut = () => {
		dispatch(logOut());
	};

	// console.log(auth?.user);

	return (
		<>
			<div className={toggled ? 'sidebar active' : 'sidebar'}>
				<div className="logo_content">
					<div className="logo">
						{/* <img
							src="https://res.cloudinary.com/dgisuffs0/image/upload/v1641758237/logoz-trans_2_usrpz6.png"
							alt=""
							className="logo-img"
						/> */}
						<i className="bx bxl-c-plus-plus"></i>
						<div className="logo_name">Lufumart</div>
					</div>
					<i className="bx bx-menu" onClick={handleDrawerToggle} id="btn"></i>
				</div>
				<ul>
					<li>
						<NavLink to="/">
							<i className="bx bx-grid-alt"></i>
							<span className="links_name">Home</span>
						</NavLink>
						<span className="tooltip">Home</span>
					</li>
					<li>
						<NavLink
							to="/products"
							activeclassname="active"
							onClick={handleClick}
						>
							<i className="bx bxl-product-hunt"></i>
							<span className="links_name">Products</span>
						</NavLink>
						<span className="tooltip">Products</span>
					</li>
					<li>
						<NavLink
							to="/orders"
							activeclassname="active"
							onClick={handleClick}
						>
							<i className="bx bx-purchase-tag"></i>
							<span className="links_name">Orders</span>
						</NavLink>
						<span className="tooltip">Orders</span>
					</li>
					<li>
						<NavLink
							to="/wallet"
							activeclassname="active"
							onClick={handleClick}
						>
							<i className="bx bx-wallet-alt"></i>
							<span className="links_name">Transactions</span>
						</NavLink>
						<span className="tooltip">Transactions</span>
					</li>
					<li>
						<NavLink
							to="/sellers"
							activeclassname="active"
							onClick={handleClick}
						>
							<i className="bx bxs-user-detail"></i>
							<span className="links_name">Sellers</span>
						</NavLink>
						<span className="tooltip">Sellers</span>
					</li>
					<li>
						<NavLink
							to="/customers"
							activeclassname="active"
							onClick={handleClick}
						>
							<i className="bx bx-user-circle"></i>
							<span className="links_name">Customers</span>
						</NavLink>
						<span className="tooltip">Customers</span>
					</li>
					<li>
						<NavLink to="/staff" activeclassname="active" onClick={handleClick}>
							<i className="bx bxs-user-account"></i>
							<span className="links_name">Staff</span>
						</NavLink>
						<span className="tooltip">Staff</span>
					</li>
				</ul>
				<div className="profile_content">
					<div className="profile_dashboard">
						<div className="profile_details">
							<img
								src="https://res.cloudinary.com/yugillc/image/upload/q_auto/v1641770389/chat-app-profile/profile_b1qtok.png"
								alt="profile"
							/>
							<div className="name_job">
								<div className="name">{auth?.user?.current_user?.name}</div>
								<div className="job">{auth?.user?.current_user?.role}</div>
							</div>
						</div>
						<i className="bx bx-log-out" onClick={signOut} id="log_out"></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
