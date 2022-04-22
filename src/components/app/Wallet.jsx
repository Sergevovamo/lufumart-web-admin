import React, { useState, useEffect, useMemo, Fragment } from 'react';
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
	CircularProgress,
} from '@mui/material';
import useTable from '../../utils/useTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../css/Transactions.module.css';

const Wallet = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [filteredSearch, setFilteredSearch] = useState({
		fn: (items) => {
			return items;
		},
	});

	const columns = useMemo(() => COLUMNS, []);

	const { CustomHead, CustomPagination, recordsAfterPagingAndSorting } =
		useTable(data, columns, filteredSearch);

	return (
		<div className={styles.transactions_container}>
			<h1 className={styles.title}>Transactions</h1>
			<TableContainer component={Paper}>
				<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
					{data.length} Transactions
				</h3>
				<Table aria-label="simple table">
					<CustomHead />

					<TableBody>
						{data?.length > 0 ? (
							recordsAfterPagingAndSorting()?.map((item) => {
								const { id, paid, paymentMethod, date } = item;

								return (
									<Fragment key={id}>
										<TableRow>
											<TableCell>{id}</TableCell>
											<TableCell>{paid}</TableCell>
											<TableCell>{paymentMethod}</TableCell>
											<TableCell>{date}</TableCell>
											<TableCell>
												<Button color="default" variant="contained">
													Details
												</Button>
											</TableCell>
										</TableRow>
									</Fragment>
								);
							})
						) : (
							<TableRow>
								{/* <TableCell
									colSpan={12}
									style={{ padding: '1rem', textAlign: 'center' }}
								>
									{loading ? (
										<CircularProgress
											variant="indeterminate"
											disableShrink
											size={25}
											thickness={4}
										/>
									) : (
										<p>You have no products</p>
									)}
								</TableCell> */}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Wallet;

const COLUMNS = [
	{
		id: 'id',
		label: 'Transaction ID',
	},
	{
		id: 'paid',
		label: 'Paid',
	},
	{
		id: 'method',
		label: 'Method',
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
		id: '456667',
		paid: 294,
		paymentMethod: 'Master Card',
		date: '16.12.2020, 14:21',
	},
	{
		id: '156667',
		paid: 894,
		paymentMethod: 'PayPal',
		date: '16.12.2020, 14:21',
	},
	{
		id: '356667',
		paid: 694,
		paymentMethod: 'Visa',
		date: '16.12.2020, 14:21',
	},
];
