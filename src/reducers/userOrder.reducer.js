import { CHANGE_ORDER, FETCH_ORDER } from '../actions/dragDropList.actions'

import _ from 'lodash';

export function userOrder(state = {}, action) {
    switch (action.type) {
      case FETCH_ORDER:
         return action.payload.data;
      case CHANGE_ORDER:
         return action.payload.data;
      default:
        return state
    }
  }