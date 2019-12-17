import TasksReducer from './reducer_task';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { login } from './login.reducer';
import { registration } from './registration.reducer';
import { tasks } from './dropTask.reducer';
import { userOrder } from './userOrder.reducer';
import { users } from './dropUsers.reducer';

const rootReducer = combineReducers({
  listOfTasks: TasksReducer,
  form: formReducer,
  registration,
  login,
  tasks,
  users,
  userOrder

});

export default rootReducer;
