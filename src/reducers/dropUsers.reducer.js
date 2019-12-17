import {
  CHANGE_USER_TASKS,
  DELETE_USER_TASK,
  FETCH_USERS,
  GET_ID
} from "../actions/dragDropList.actions";

import _ from "lodash";

export function users(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      const userList = _.map(action.payload.data, user => {
        user.title = user["username"];
        return user;
      });
      return _.mapKeys(userList, "id");
    case CHANGE_USER_TASKS:
      return !action.payload.data
        ? state
        : { ...state, [action.payload.data.id]: action.payload.data };
    case GET_ID:
      localStorage.setItem("userId", action.payload.data);
      return state;
    case DELETE_USER_TASK:
      const id = action.payload.data.split(" ");
      let userWithNewTask = state[id[1]];
      userWithNewTask.taskIds = userWithNewTask.taskIds.filter(
        el => el != id[0]
      );
      return { ...state, [id[1]]: userWithNewTask };
    default:
      return state;
  }
}
