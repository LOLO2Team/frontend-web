import React, { Component } from 'react'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ParkingLotDashboard from './ParkingLotDashboard';
const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.clickLogin();
        console.log('Received values of form: ', values);
      }
    });
  }
  clickLogin = () => {
    const password = this.props.form.getFieldValue('password');
    const name = this.props.form.getFieldValue('username');
    this.props.login(name, password);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form" id="login-form">
          <h2> LOLO2's COMPANY</h2>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>

            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
Login = Form.create()(Login);

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  login: (name, password) => {
    const identity = { username: name, password: password };
    fetch("https://parking-lot-backend.herokuapp.com/login", {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(identity),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(res => {
        const token = res.headers.get("Authorization")
        console.log(res.headers.get("Authorization"))
        if (res.status === 200) {
          dispatch({
            type: "SET_TOKEN",
            payload: res.headers.get("Authorization")
          });
          return token
        } else {
          // Toast.fail("Username/password incorrect!", 1, null, false);
          alert("Username/password incorrect!");
          return false;
        }
      })
      .then(token => {
        if (!token) {
          return false;
        }
        return fetch("https://parking-lot-backend.herokuapp.com/employees?username=" + name, {
          mode: 'cors',
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        })
      })
      .then(res => {
        if (!res) {
          return false;
        }
        if (res.status !== 200) {
          return false;
        }
        return res.json();
      })
      .then(res => {
        if (!res) {
          return false;
        }
        const rolesList = res.rolesList;
        if (rolesList.includes("ROLE_ADMIN") || rolesList.includes("ROLE_MANAGER") || rolesList.includes("ROLE_HR")) {
          dispatch({
            type: "SET_AUTHORIZED",
            payload: ''
          });
          dispatch({
            type: "SET_ROLE",
            payload: rolesList
          });
          dispatch({
            type: "SET_MY_ROLE",
            payload: rolesList
          })
        } else {
          alert("You are not authorized.");
        }
      })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);