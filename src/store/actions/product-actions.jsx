import axios from 'axios';
import toast from 'react-hot-toast';
import { batch } from 'react-redux';
import {
	PRODUCT_LOADING,
	POST_PRODUCT_CATEGORY,
	EDIT_PRODUCT_CATEGORY,
	POST_PRODUCT_SUB_CATEGORY,
	GET_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORIES,
	GET_PRODUCT_SUB_CATEGORIES,
	POST_PRODUCT,
	UPDATE_PRODUCT,
	GET_PRODUCT,
	GET_PRODUCTS,
	PRODUCT_METRIC,
} from '../../constants/types';
import { returnErrors, clearErrors } from './error-actions';

const PRODUCTS_CATEGORY_SERVER =
	'https://apis.lufumart.net/api/v1/product-categories';
const PRODUCTS_SUB_CATEGORY_SERVER =
	'https://apis.lufumart.net/api/v1/product-sub-categories';
const PRODUCTS_SERVER = 'https://apis.lufumart.net/api/v1/products';

export const tokenConfig = () => {
	// Get token from localStorage
	const token = localStorage.getItem('userToken');
	// console.log(token);

	// Headers
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

// Setup config headers and token for JSON bodies
export const tokenConfigJSON = () => {
	// Get token from localStorage
	const token = localStorage.getItem('userToken');
	// console.log(token);

	// Headers
	const config = {
		headers: {
			'content-Type': 'application/json',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

export const postProductCategory = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { name, file, description } = payload;

	try {
		let formData = new FormData();

		formData.append('name', name);
		formData.append('file', file);
		formData.append('description', description);

		const response = await axios.post(
			`${PRODUCTS_CATEGORY_SERVER}/create`,
			formData,
			token
		);
		const data = await response.data;
		// console.log(data);

		if (data) {
			batch(() => {
				dispatch({ type: PRODUCT_LOADING });
				dispatch({
					type: POST_PRODUCT_CATEGORY,
					payload: data,
				});
			});

			toast.success(`Success! New product category added.`);
		}

		dispatch(clearErrors());
	} catch (error) {
		console.log(error?.response);
		toast.error('Error! Something went wrong.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'CREATE_PRODUCT_CATEGORY'
			)
		);
	}
};

export const updateProductCategory = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, name, file, description } = payload;
	// console.log(payload);

	try {
		let formData = new FormData();

		formData.append('name', name);
		formData.append('file', file);
		formData.append('description', description);

		const response = await axios.put(
			`${PRODUCTS_CATEGORY_SERVER}/${_id}`,
			formData,
			token
		);
		const data = await response.data;
		// console.log(data);

		if (data) {
			batch(() => {
				dispatch({ type: PRODUCT_LOADING });
				dispatch({
					type: EDIT_PRODUCT_CATEGORY,
					payload: data,
				});
			});

			toast.success(`Success! Update product category.`);
		}

		dispatch(clearErrors());
	} catch (error) {
		console.log(error?.response);
		toast.error('Error! Product update unsuccessful');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'EDIT_PRODUCT_CATEGORY'
			)
		);
	}
};

export const postProductSubCategory = (payload) => async (dispatch) => {
	const token = tokenConfigJSON();
	const { name, description, categoryId } = payload;

	try {
		// Request body
		const body = JSON.stringify({ name, description, categoryId });

		// let formData = new FormData();

		// formData.append('name', name);
		// formData.append('categoryId', categoryId);
		// formData.append('description', description);
		// console.log(formData.get('categoryId'));

		const response = await axios.post(
			`${PRODUCTS_SUB_CATEGORY_SERVER}/create`,
			body,
			token
		);
		const data = await response.data;

		if (data) {
			batch(() => {
				dispatch({ type: PRODUCT_LOADING });
				dispatch({
					type: POST_PRODUCT_SUB_CATEGORY,
					payload: data,
				});
			});

			toast.success(`Success! New product sub category added.`);
		}

		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		toast.error('Error! Something went wrong.');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'CREATE_PRODUCT_SUB_CATEGORY'
			)
		);
	}
};

export const getProductCategories = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		dispatch({ type: PRODUCT_LOADING });
		const response = await axios.get(`${PRODUCTS_CATEGORY_SERVER}`, token);
		const data = await response.data;

		// console.log(data);
		await dispatch({
			type: GET_PRODUCT_CATEGORIES,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error.response.data);
		toast.error('Error. Something went wrong!');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_PRODUCT_CATEGORIES'
			)
		);
	}
};

export const getProductSubCategories = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		dispatch({ type: PRODUCT_LOADING });
		const response = await axios.get(`${PRODUCTS_SUB_CATEGORY_SERVER}`, token);
		const data = await response.data;

		console.log(data);
		await dispatch({
			type: GET_PRODUCT_SUB_CATEGORIES,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		// console.log(error.response.data);
		toast.error('Error. Something went wrong!');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_PRODUCT_SUB_CATEGORIES'
			)
		);
	}
};

export const postProduct = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const {
		name,
		model,
		brand,
		color,
		locality,
		gender,
		ageGroup,
		files, // Please provide it as file
		size,
		weight,
		currency,
		price,
		salePrice,
		quantity,
		description,
		categoryId,
		subCategoryId,
		condition,
		inventoryThreshold,
		availability,
		availabilityDate,
		salePriceEffectiveStartDate,
		salePriceEffectiveEndDate,
		manufactererPartNumber,
		globalTradeItemNumber,
	} = payload;
	// console.log(payload);

	try {
		let formData = new FormData();

		formData.append('name', name);
		formData.append('model', model);
		formData.append('brand', brand);
		formData.append('color', color);
		formData.append('locality', locality);
		formData.append('gender', gender);
		formData.append('ageGroup', ageGroup);
		// formData.append('file', files);
		formData.append('size', size);
		formData.append('weight', weight);
		formData.append('currency', currency);
		formData.append('price', price);
		formData.append('salePrice', salePrice);
		formData.append('quantity', quantity);
		formData.append('description', description);
		formData.append('categoryId', categoryId);
		formData.append('subCategoryId', subCategoryId);
		formData.append('condition', condition);
		formData.append('inventoryThreshold', inventoryThreshold);
		formData.append('availability', availability);
		formData.append('availabilityDate', availabilityDate);
		formData.append('salePriceEffectiveStartDate', salePriceEffectiveStartDate);
		formData.append('salePriceEffectiveEndDate', salePriceEffectiveEndDate);
		formData.append('manufactererPartNumber', manufactererPartNumber);
		formData.append('globalTradeItemNumber', globalTradeItemNumber);

		// upload multiple images
		files?.map((file) => {
			formData.append(`file`, file);
		});

		const response = await axios.post(
			`${PRODUCTS_SERVER}/create`,
			formData,
			token
		);
		const data = await response.data;
		// console.log(data);

		if (data) {
			batch(() => {
				dispatch({ type: PRODUCT_LOADING });
				dispatch({
					type: POST_PRODUCT,
					payload: data,
				});
			});

			toast.success(`Success! New product added.`);
		}

		dispatch(clearErrors());
	} catch (error) {
		// console.log(error?.response);
		toast.error('Error! Adding product was unsuccessful');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'POST_PRODUCT')
		);
	}
};

export const updateProduct = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const {
		_id,
		name,
		model,
		brand,
		color,
		locality,
		gender,
		ageGroup,
		files, // Please provide it as file
		size,
		weight,
		currency,
		price,
		salePrice,
		quantity,
		description,
		categoryId,
		subCategoryId,
		condition,
		inventoryThreshold,
		availability,
		availabilityDate,
		salePriceEffectiveStartDate,
		salePriceEffectiveEndDate,
		manufactererPartNumber,
		globalTradeItemNumber,
	} = payload;

	try {
		let formData = new FormData();

		formData.append('name', name);
		formData.append('model', model);
		formData.append('brand', brand);
		formData.append('color', color);
		formData.append('locality', locality);
		formData.append('gender', gender);
		formData.append('ageGroup', ageGroup);
		formData.append('size', size);
		formData.append('weight', weight);
		formData.append('currency', currency);
		formData.append('price', price);
		formData.append('salePrice', salePrice);
		formData.append('quantity', quantity);
		formData.append('description', description);
		formData.append('categoryId', categoryId);
		formData.append('subCategoryId', subCategoryId);
		formData.append('condition', condition);
		formData.append('inventoryThreshold', inventoryThreshold);
		formData.append('availability', availability);
		formData.append('availabilityDate', availabilityDate);
		formData.append('salePriceEffectiveStartDate', salePriceEffectiveStartDate);
		formData.append('salePriceEffectiveEndDate', salePriceEffectiveEndDate);
		formData.append('manufactererPartNumber', manufactererPartNumber);
		formData.append('globalTradeItemNumber', globalTradeItemNumber);

		// upload multiple images
		if (files !== false) {
			files?.map((file) => {
				formData.append(`file`, file);
			});
		}

		const response = await axios.put(
			`${PRODUCTS_SERVER}/${_id}`,
			formData,
			token
		);
		const data = await response.data;
		// console.log(data);

		if (data) {
			batch(() => {
				dispatch({ type: PRODUCT_LOADING });
				dispatch({
					type: UPDATE_PRODUCT,
					payload: data,
				});
			});

			toast.success(`Success! Product updated successfully.`);
		}

		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		toast.error('Error! Updating product was unsuccessful');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'UPDATE_PRODUCT')
		);
	}
};

export const getTotalProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LOADING });
		const response = await axios.get(`${PRODUCTS_SERVER}/total-products`);
		const data = await response.data;

		// console.log(data);
		await dispatch({
			type: PRODUCT_METRIC,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error.response.data);
		toast.error('Error. Something went wrong!');
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_TOTAL_PRODUCTS'
			)
		);
	}
};

export const getProducts = (payload) => async (dispatch) => {
	const token = tokenConfig();

	try {
		if (payload) {
			const { page, limit, order, orderBy } = payload;
			let currentPage = page + 1;

			dispatch({ type: PRODUCT_LOADING });

			const response = await axios.get(
				`${PRODUCTS_SERVER}?page=${currentPage}&limit=${limit}&order=${order}&orderBy=${orderBy}`,
				token
			);
			const data = await response.data;

			// console.log(data);
			await dispatch({
				type: GET_PRODUCTS,
				payload: data,
			});
			dispatch(clearErrors());
		} else {
			dispatch({ type: PRODUCT_LOADING });

			const response = await axios.get(`${PRODUCTS_SERVER}`, token);
			const data = await response.data;

			// console.log(data);
			await dispatch({
				type: GET_PRODUCTS,
				payload: data,
			});
			dispatch(clearErrors());
		}
	} catch (error) {
		console.log(error);
		toast.error('Error. Something went wrong!');
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_PRODUCTS')
		);
	}
};

export const searchProducts = (payload) => async (dispatch) => {
	const token = tokenConfig();
	try {
		if (payload) {
			const { page, limit, order, orderBy, searchTerm } = payload;
			let currentPage = page + 1;

			dispatch({ type: PRODUCT_LOADING });

			const response = await axios.get(
				`${PRODUCTS_SERVER}?page=${currentPage}&limit=${limit}&order=${order}&orderBy=${orderBy}&searchTerm=${searchTerm}`,
				token
			);
			const data = await response.data;

			await dispatch({
				type: GET_PRODUCTS,
				payload: data?.products,
				totalSearchProducts: data?.totalSearchProducts,
			});
			dispatch(clearErrors());
		}
	} catch (error) {
		console.log(error);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_PRODUCTS')
		);
	}
};
