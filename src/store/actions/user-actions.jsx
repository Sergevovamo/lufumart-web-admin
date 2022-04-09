import axios from 'axios';
import toast from 'react-hot-toast';
import { GET_USERS } from '../../constants/types';
import {
	returnErrors,
	clearErrors,
	registerFail,
	loginFail,
	usersError,
	authError,
} from './error-actions';
