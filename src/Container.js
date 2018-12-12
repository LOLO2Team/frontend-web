import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from "react-redux";
import App from './App';
import Login from './components/Login';

class Container extends Component {
  render() {
    if (this.props.authorized) {
        return (
            <Router>
                <App />
            </Router>
        );
    }
    return <Login />;
  }
}

const mapStateToProps = state => ({
    authorized: state.authorized
});

export default connect(mapStateToProps)(Container);