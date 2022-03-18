import {
	PRODUCT_LOADING,
	POST_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORIES,
	DELETE_PRODUCT_CATEGORY,
	POST_PRODUCT,
	GET_PRODUCT,
	GET_PRODUCTS,
} from '../../constants/types';

const initialState = {
	isAuthenticated: !!localStorage.getItem('userToken'),
	productCategory: null,
	productCategories: null,
	product: null,
	products: null,
};

export default function IdeaReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategory: action.payload,
			};
		case GET_PRODUCT_CATEGORIES:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategories: action.payload,
			};
		case POST_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategory: action.payload,
			};
		case GET_PRODUCT:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				product: action.payload,
			};
		case GET_PRODUCTS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				products: action.payload,
			};
		case POST_PRODUCT:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				product: action.payload,
			};
		case DELETE_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategories: state.productCategories?.filter(
					(product) => product._id !== action.payload
				),
			};
		default:
			return state;
	}
}
