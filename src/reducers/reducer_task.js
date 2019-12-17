import _ from 'lodash'
import { taskConstans } from '../actions/type';

export default function (state = {}, action){
    switch (action.type){
        case taskConstans.FETCH_LIST_SUCCESS:
            return _.mapKeys(action.payload, 'name');
        case taskConstans.ADD_TASK_DONE_SUCCESS:
            return {...state,[action.payload.name]: action.payload};
        case taskConstans.DELETE_TASK_SUCCESS:
            return _.omit(state, action.payload.name);
        case taskConstans.ADD_TASK_SUCCESS:
            return {...state, [action.payload.name]: action.payload};
        default:
            return state;
    }
}