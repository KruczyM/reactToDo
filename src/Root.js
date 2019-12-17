import { applyMiddleware, createStore } from 'redux';

import { Provider } from 'react-redux';
import React from 'react';
import reducers from './reducers';
import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

export default ( { children, initialState = {} } ) =>{
    const store = createStore(reducers,initialState,applyMiddleware(reduxPromise,thunk));
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}