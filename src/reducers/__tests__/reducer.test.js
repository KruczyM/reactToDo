import _ from 'lodash';
import {taskConstans as actionsType}  from '../../actions/type';
import taskReducer from '../reducer_task';

const mockResponseList = [
  { name: "Fetched #1", isDone: false, _id: { $oid: 1 } },
  { name: "Fetched #2", isDone: false, _id: { $oid: 2 } }
];

const mockResponseOneItem = { name: "Fetched #3", isDone: false, _id: { $oid: 3 } };

describe('taskReducer', () => {
    it('should return initial state', () => {
        expect(taskReducer(undefined,{})).toEqual({});
    });

    it('should handle FETCH_LIST_SUCCESS', () => {
        const successAction = {
            type: actionsType.FETCH_LIST_SUCCESS,
            payload: mockResponseList
        };
        expect(taskReducer({}, successAction)).toEqual(_.mapKeys(mockResponseList,'name'));
    });

    it('should handle ADD_TASK_DONE_SUCCESS', () => {
        const successAction = {
            type: actionsType.ADD_TASK_SUCCESS,
            payload: mockResponseOneItem
        };
        expect(taskReducer(_.mapKeys(mockResponseList,'name'), successAction)).toEqual({...(_.mapKeys(mockResponseList,'name')),[successAction.payload.name]: successAction.payload});
    });

    it('should handle DELETE_TASK_SUCCESS', () => {
        const successAction = {
            type: actionsType.DELETE_TASK_SUCCESS,
            payload: { name: "Fetched #2", isDone: false, _id: { $oid: 2 } }
        };
        expect(taskReducer(_.mapKeys(mockResponseList,'name'), successAction)).toEqual(_.omit(_.mapKeys(mockResponseList,'name'), successAction.payload.name));
    });

    it('should handle ADD_TASK_SUCCESS', () => {
        const successAction = {
            type: actionsType.ADD_TASK_SUCCESS,
            payload: mockResponseOneItem
        };
        expect(taskReducer(_.mapKeys(mockResponseList,'name'), successAction)).toEqual({...(_.mapKeys(mockResponseList,'name')), [successAction.payload.name]: successAction.payload});
    });

});
