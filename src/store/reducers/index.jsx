import { combineReducers } from 'redux';
import auth from './auth-reducer';
import products from './product-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	products,
	error,
});

export default rootReducer;
