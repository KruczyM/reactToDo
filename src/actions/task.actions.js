import { ROOT_URL, taskConstans } from './type';

import axios from 'axios';

const API_KEY = '?apiKey=3bMGmgDbiAElHIMmsM0filej7frNsuQ-';


const start = (action) => ({
    type: action,
  });

  const success = (action,posts) => ({
    type: action,
    payload: posts,
  });

  const fail = (action,error) => ({
    type: action,
    payload: error,
  });

export const fetchList = () => (dispatch) =>{
    dispatch(start(taskConstans.FETCH_LIST_START));
    const request = axios.get( `${ROOT_URL}`) //${API_KEY}
    return request.then( res => {
        dispatch(success(taskConstans.FETCH_LIST_SUCCESS,res.data));
        return res;
    })
    .catch(error => {
        dispatch(fail(taskConstans.FETCH_LIST_ERROR,error));
        return error;
    })

}

export const addTask = (task) => (dispatch) =>{

    dispatch(start(taskConstans.ADD_TASK_START));
    return axios.post( `${ROOT_URL}`,task) //${API_KEY}
    .then( res => {
        dispatch(success(taskConstans.ADD_TASK_SUCCESS,res.data));
        return res;
    })
    .catch(error => {
        dispatch(fail(taskConstans.ADD_TASK_ERROR,error));
        return error;
    })

}

export const addToDone = (listOfTasks,task) => (dispatch) =>{
    dispatch(start(taskConstans.ADD_TASK_DONE_START));
    return axios.put( `${ROOT_URL}`,Object.values(listOfTasks)) //${API_KEY}
    .then( res => {
        dispatch(success(taskConstans.ADD_TASK_DONE_SUCCESS,res.data));
        return res;
    })
    .catch(error => {
        dispatch(fail(taskConstans.ADD_TASK_DONE_ERROR,error));
        return error;
    })

}

export const deleteTask = (task) => (dispatch) => {
    dispatch(start(taskConstans.DELETE_TASK_START));
    return axios.delete( `${ROOT_URL}/${task._id.$oid}`) //${API_KEY}
    .then( res => {
        dispatch(success(taskConstans.DELETE_TASK_SUCCESS,res.data));
        return res;
    })
    .catch(error => {
        dispatch(fail(taskConstans.DELETE_TASK_ERROR,error));
        return error;
    })
}