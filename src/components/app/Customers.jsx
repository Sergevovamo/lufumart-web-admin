import React, { useState, useEffect, useMemo, Fragment } from 'react';
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
import { useForm } from 'react-hook-form';
import useTable from '../../utils/useTable';
import styles from '../../css/Customers.module.css';

const Customers = () => {
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

	return (
		<div className={styles.customers_container}>
			<div className={styles.customers_header}>
				<h4 style={styles.title}>Customers list</h4>
				<Button variant="contained">Create New</Button>
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
					<h3>{recordsAfterPagingAndSorting()?.length} Customers</h3>
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
										<TableCell>{status}</TableCell>
										<TableCell>{date}</TableCell>
										<TableCell></TableCell>
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

export default Customers;

const COLUMNS = [
	{
		id: 'id',
		label: '#ID',
	},
	{
		id: 'name',
		label: 'Name',
	},
	{
		id: 'email',
		label: 'Email',
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
