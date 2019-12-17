import { userConstants } from '../actions/type';

export function login(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { loging: true };
    case userConstants.LOGIN_SUCCESS:
      return {};
    case userConstants.LOGIN_FAILURE:
      return {loging: false};
    default:
      return state
  }
}