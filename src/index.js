import { Route, Router, Switch } from 'react-router-dom';

import DragDrop from './beautiful-components/drag-drop';
import LoginForm from './components/LoginForm';
import AppJs from './components/App';
import {PrivateRoute} from './helpers/privateRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './components/RegisterForm';
import Root from './Root';
import history from './helpers/history';

ReactDOM.render(
  <Root>
    <Router history={history}>
      <div>
        <Switch>
        <PrivateRoute exact path="/ToDoList" component={DragDrop} />
          <Route path="/ToDoList2" component={AppJs} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </div>
    </Router>
  </Root>
  , document.querySelector('#root'));