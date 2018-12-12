import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import Login from './components/Login';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { Switch, Route } from 'react-router-dom';
import Container from './Container';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>, document.getElementById('root'));