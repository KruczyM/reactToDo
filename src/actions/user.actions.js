import { alertActions } from './alert.actions';
import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
import his from '../helpers/history';
import { userConstants } from './type';

export const login = (user) => {
    return dispatch => {
        dispatch(request({ user }));
        axios.post(`https://kruczym.pythonanywhere.com/auth/`,user)
            .then(
                user => {
                    if(user.data.token)
                    {
                        localStorage.setItem('user', user.data.token);
                    }
                    dispatch(success(user));
                    his.push("/ToDoList");
                },
                error => {
                    dispatch(failure(error.response));
                    dispatch(alertActions.error(error.response));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, payload:user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload:user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload:error } }
}

export const logout = () => {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}
export const getById = (id) => {
    return axios.get(`/users/${id}`,{headers:authHeader()});
}

export const register = (user) => {
    
    return dispatch => {
        dispatch(request(user));
       axios.post(`https://kruczym.pythonanywhere.com/api/users/`, user)
            .then(
                user => {
                    dispatch(success());
                    his.push("/login");
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.response));
                    dispatch(alertActions.error(error.response));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, payload:user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, payload:user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, payload:error } }
}
