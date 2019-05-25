import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

import App from './components/App';
import reducer from './reducers/index';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(),
    // other store enhancers if any
    );


const store = createStore(reducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
)