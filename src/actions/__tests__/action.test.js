import * as actions from "../task.actions";

import {taskConstans as actionType} from "../type";
import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";

const mockResponseList = [
  { name: "Fetched #1", isDone: false, _id: { $oid: 1 } },
  { name: "Fetched #2", isDone: false, _id: { $oid: 2 } }
];

const mockResponseOneItem = { name: "Fetched #3", isDone: false, _id: { $oid: 3 } };

const createMockCall = (mockResponse) => {
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
};

//create array of dispatched actions; something like action log
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("testing actions", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("fetchList action", () => {
    it("creates FETCH_LIST_SUCCESS after successfuly fetching postse", () => {

    createMockCall(mockResponseList);

      const expectedActions = [
        { type: actionType.FETCH_LIST_START },
        { type: actionType.FETCH_LIST_SUCCESS, payload: mockResponseList }
      ];

      const store = mockStore({ payload: {} });

      return store.dispatch(actions.fetchList()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('addTask action ', () => {
    it('create ADD_TASK_SUCCESS after successful added task', () => {
        createMockCall(mockResponseOneItem);

        const expectedActions = [
          { type: actionType.ADD_TASK_START },
          { type: actionType.ADD_TASK_SUCCESS, payload: mockResponseOneItem }
        ];

        const store = mockStore({ payload: {} });

        return store.dispatch(actions.addTask(mockResponseOneItem)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  });

  describe('addTaskDone action ', () => {
    it('create ADD_TASK_DONE_SUCCESS after successful changed status of task ', () => {
        createMockCall(mockResponseOneItem);

        const expectedActions = [
          { type: actionType.ADD_TASK_DONE_START },
          { type: actionType.ADD_TASK_DONE_SUCCESS, payload: mockResponseOneItem }
        ];

        const store = mockStore({ payload: {} });

        return store.dispatch(actions.addToDone(mockResponseList)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  });

  // describe('deleteTask action ', () => {
  //   it('create DELETE_TASK_SUCCESS after successful deleted task', () => {
  //       createMockCall(mockResponseOneItem);

  //       const expectedActions = [
  //         { type: actionType.DELETE_TASK_START },
  //         { type: actionType.DELETE_TASK_SUCCES, payload: {mockResponseOneItem} }
  //       ];

  //       const store = mockStore({ payload: {} });

  //       return store.dispatch(actions.deleteTask(mockResponseOneItem)).then(() => {
  //         expect(store.getActions()).toEqual(expectedActions);
  //       });
  //   });

  // });
});
