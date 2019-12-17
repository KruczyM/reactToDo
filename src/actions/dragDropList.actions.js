import _ from 'lodash';
import { authHeader } from '../helpers/auth-header';
import axios from 'axios';

export const FETCH_TASKS = 'fetch_tasks';
export const FETCH_USERS = 'fetch_users';
export const FETCH_ORDER = 'fetch_order';
export const CHANGE_ORDER = 'change_order';
export const DELETE_USER_TASK = 'delete_user_task';
export const ADD_TASK = 'add_task';
export const CHANGE_USER_TASKS = 'change_user_tasks';
export const GET_ID = 'get_id';
export const DONE_TASK = 'done_task';
const URL = `https://kruczym.pythonanywhere.com/api/`;

const headers = {headers:authHeader()};


// HTTP request about tasks
export const fetchList = () =>{

    const request = axios.get(`${URL}tasks/`,headers);
        return{
            type: FETCH_TASKS,
            payload: request
        }
}

export const deleteTask = (id) => {
    const request = axios.delete(`${URL}tasks/${id}/`,headers)
    return{
        type: DELETE_USER_TASK,
        payload: request
    }
}

export const addTask = (content) => {
    const request = axios.post(`${URL}tasks/`,{user: localStorage.getItem('userId'),content:content['task'],is_done:false},headers);

    return{
        type: ADD_TASK,
        payload: request
    }
}

export const doneTask = (id) =>{
    const request = axios.put(`${URL}tasks/${id}/isdone/`,headers);
    return{
        type: DONE_TASK,
        payload: request
    }
}

// HTTP request about user data
export const fetchUser = () =>{
    const request = axios.get(`${URL}users/all/`,headers);
    return{
        type: FETCH_USERS,
        payload: request
    }
}


export const getLogedUser = () => {
    const request = axios.get(`${URL}users/id/`,headers);
            return{
                type: GET_ID,
                payload: request
            }
}

export const changeUserTasks = (user) =>{
    const request = axios.put(`${URL}users/${user.id}/`,{taskIds:user.taskIds},headers);
    return{
        type: CHANGE_USER_TASKS,
        payload: request
    }
}


//HTTP request about task order data
export const fetchOrder = () =>{
    const request = axios.get(`${URL}user_order/`,headers);
    return{
        type: FETCH_ORDER,
        payload: request
    }
}

export const changeOrder = (orderList) => {
    const request = axios.post(`${URL}user_order/`,orderList,headers);
    return{
        type: CHANGE_ORDER,
        payload: request
    }
}



