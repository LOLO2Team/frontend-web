import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { BrowserRouter as Router } from 'react-router-dom'

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}>
    <Router>
        {/* <Login /> */}
        <App />
    </Router>
</Provider>, document.getElementById('root'));

