import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
			}}
		>
			<h1>404 Page Not Found.</h1>
			<h4>There's nothing here!</h4>
		</main>
	);
};

export default PageNotFound;
