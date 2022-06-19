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
import { useForm } from 'react-hook-form';
import useTable from '../../utils/useTable';
import styles from '../../css/Orders.module.css';

const Orders = () => {
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
	} = useTable(data?.length, data, columns, filteredSearch);

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

	return (
		<div className={styles.orders_container}>
			<div className={styles.orders_header}>
				<h4 style={styles.title}>Orders</h4>
				{/* <Button variant="contained">Create New</Button> */}
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
					<h3>{recordsAfterPagingAndSorting()?.length} Orders</h3>
				</div>
				<CustomTable>
					<CustomHead />
					<TableBody>
						{recordsAfterPagingAndSorting()?.map((order) => {
							const { id, name, email, total, status, date } = order;
							return (
								<Fragment key={id}>
									<TableRow
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
										}}
									>
										<TableCell>{id}</TableCell>
										<TableCell>{name}</TableCell>
										<TableCell>{email}</TableCell>
										<TableCell>${total}</TableCell>
										<TableCell>{status}</TableCell>
										<TableCell>{date}</TableCell>
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
																	to="/order-details"
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
						})}
					</TableBody>
				</CustomTable>
				<CustomPagination />
			</TableContainer>
		</div>
	);
};

export default Orders;

const COLUMNS = [
	{
		id: 'id',
		label: '#ID',
	},
	{
		id: 'name',
		label: 'Customer Name',
	},
	{
		id: 'email',
		label: 'Email',
	},
	{
		id: 'total',
		label: 'Total',
	},
	{
		id: 'status',
		label: 'Status',
	},
	{
		id: 'date',
		label: 'Date',
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
		status: 'Pending',
		date: '03/12/2020',
	},
	{
		id: 2323,
		name: 'Leslie Alexander',
		email: 'leslie@example.com',
		total: 46.61,
		status: 'Pending',
		date: '21/02/2020',
	},
	{
		id: 1233,
		name: 'Esther Howard',
		email: 'esther@example.com',
		total: 12.0,
		status: 'Cancelled',
		date: '	03/07/2020',
	},
	{
		id: 1333,
		name: 'Esther Howard',
		email: 'esther@example.com',
		total: 12.0,
		status: 'Cancelled',
		date: '03/07/2020',
	},
	{
		id: 7897,
		name: 'Albert Flores',
		email: 'albert@example.com',
		total: 10.0,
		status: 'Received',
		date: '23/04/2020',
	},
	{
		id: 2324,
		name: 'Jane Cooper',
		email: 'jane@example.com',
		total: 710.68,
		status: 'Received',
		date: '28/04/2020',
	},
];
