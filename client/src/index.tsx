import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { InitialState } from './redux/state/InitialState'

function testReducer(state = {isUserValid:true}, action:any){
    switch(action.type) {
        case 'ENABLE_ERROR_PAGE':
            return {...state, isUserValid: false}
        default:
            return state
    }
}


ReactDOM.render(
<Provider store={createStore(testReducer)}>
<App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
