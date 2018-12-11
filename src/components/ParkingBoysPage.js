import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, } from 'antd';
import { connect } from "react-redux";
import ParkingBoyList from './ParkingBoyList'
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ParkingBoysPage extends Component {
  onAddParkingBoy = () => {
    this.props.onCreateParkingBoy(this.props.form.getFieldValue('name'),
      this.props.form.getFieldValue('username'),
      this.props.form.getFieldValue('password'),
      this.props.form.getFieldValue('email'),
      this.props.form.getFieldValue('phone'),
      this.props.form.getFieldValue('role'));
    const dummy = this.props.refreshData();
    this.props.form.setFields({
      ['name']: { value: '' }, 
      ['username']: { value: '' },
      ['password']: { value: '' }, 
      ['email']: { value: '' },
      ['phone']: { value: '' },
      ['role']: { value: '' },
    })
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    const nameError = isFieldTouched('name') && getFieldError('name');
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    const roleError = isFieldTouched('role') && getFieldError('role');


    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <h3>Create Parking Boy</h3>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: "Please input employee's name!" }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
              )}
            </FormItem>
            <FormItem validateStatus={usernameError ? 'error' : ''}
            help={usernameError || ''}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: "Please input employee's username!" }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: "Please input employee's email!" }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </FormItem>
            <FormItem validateStatus={phoneError ? 'error' : ''}
            help={phoneError || ''}>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: "Please input employee's phone!" }],
              })(
                <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />
              )}
            </FormItem>
            <FormItem validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: "Please input employee's password!" }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" type="password" />
              )}
            </FormItem>
            <FormItem validateStatus={roleError ? 'error' : ''}
            help={roleError || ''}>
              {getFieldDecorator('role', {
                rules: [{ required: true, message: "Please input employee's role!" }],
              })(
                <Input prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Role" />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                onClick={this.onAddParkingBoy}
              >
                Create
          </Button>
            </FormItem>
          </Form>
          <hr />
          <ParkingBoyList />
        </Content>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  onCreateParkingBoy: (name, username, password, email, phone, role) => fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      "name": name,
      "username": username,
      "password": password,
      "phone": phone,
      "email": email,
      "role": role
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }),
  refreshData: () => fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
    //getInitData: fetch("http://localhost:8081/orders", {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: "SET_PARKING_BOYS",
        payload: res
      });
    })
    .then(console.log("added"))
});

ParkingBoysPage = Form.create({})(ParkingBoysPage);

export default connect(null, mapDispatchToProps)(ParkingBoysPage);