import React, { useState } from 'react';
import {
	Table,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	TablePagination,
} from '@mui/material';

export default function useTable(totalRecords, records, columns, search) {
	const pages = [20, 50, 100];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState();

	const CustomTable = (props) => <Table>{props.children}</Table>;

	const CustomHead = () => {
		const handleSortRequest = (property) => {
			const isAsc = orderBy === property && order === 'asc';
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(property);
		};

		return (
			<TableHead>
				<TableRow>
					{columns?.map((column) => {
						return (
							<TableCell
								key={column.id}
								sortDirection={orderBy === column.id ? order : false}
							>
								<TableSortLabel
									active={orderBy === column.id}
									direction={orderBy === column.id ? order : 'asc'}
									onClick={() => {
										handleSortRequest(column.id);
									}}
								>
									{column.label}
								</TableSortLabel>
							</TableCell>
						);
					})}
				</TableRow>
			</TableHead>
		);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const CustomPagination = () => (
		<TablePagination
			sx={{ overflow: 'hidden' }}
			component="div"
			page={page}
			rowsPerPageOptions={pages}
			rowsPerPage={rowsPerPage}
			count={records?.length ? totalRecords : 0}
			onPageChange={handlePageChange}
			onRowsPerPageChange={handleRowsPerPageChange}
		/>
	);

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	function stableSort(array, comparator) {
		const stabilizedThis = array?.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	const recordsAfterPagingAndSorting = () => {
		return stableSort(search.fn(records), getComparator(order, orderBy));
	};

	return {
		CustomTable,
		CustomHead,
		CustomPagination,
		records,
		recordsAfterPagingAndSorting,
	};
}
