import {
  ADD_TASK,
  DONE_TASK,
  FETCH_TASKS
} from "../actions/dragDropList.actions";

import _ from "lodash";

export function tasks(state = {}, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return _.mapKeys(action.payload.data, "id");
    case ADD_TASK:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case DONE_TASK:
      return action.payload.data? { ...state, [action.payload.data.id]: action.payload.data } : state;
    default:
      return state;
  }
}
