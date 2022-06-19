import {
	PRODUCT_LOADING,
	POST_PRODUCT_CATEGORY,
	EDIT_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORIES,
	GET_PRODUCT_SUB_CATEGORIES,
	POST_PRODUCT_SUB_CATEGORY,
	DELETE_PRODUCT_CATEGORY,
	POST_PRODUCT,
	GET_PRODUCT,
	GET_PRODUCTS,
	PRODUCT_METRIC,
} from '../../constants/types';

const initialState = {
	isLoading: false,
	isAuthenticated: !!localStorage.getItem('userToken'),
	productCategory: null,
	productSubCategory: null,
	productCategories: null,
	productSubCategories: null,
	product: null,
	products: null,
	totalProducts: null,
	totalOrders: null,
	totalProductCategories: null,
	totalProductSubCategories: null,
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
		case GET_PRODUCT_SUB_CATEGORIES:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productSubCategories: action.payload,
			};
		case POST_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategory: action.payload,
			};
		case EDIT_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategory: action.payload,
			};
		case POST_PRODUCT_SUB_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productSubCategory: action.payload,
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
		case PRODUCT_METRIC:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				totalProducts: action.payload.totalProducts,
				totalProductCategories: action.payload.totalProductCategories,
				totalProductSubCategories: action.payload.totalProductSubCategories,
				totalOrders: action.payload.totalOrders,
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
