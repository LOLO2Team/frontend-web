import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, Modal } from 'antd';
import { connect } from "react-redux";
import ParkingBoyList from './ParkingBoyList'
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

class CreateParkingBoy extends Component {
  onAddParkingBoy = () => {
      this.props.onCreateParkingBoy(this.props.form.getFieldValue('name'),
      this.props.form.getFieldValue('username'),
      this.props.form.getFieldValue('password'),
      this.props.form.getFieldValue('email'),
      this.props.form.getFieldValue('phone'),
      // this.props.form.getFieldValue('role'),
      this.props.token
    );
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.onAddParkingBoy();
      }
    });
  }
  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    return (
      <div>
        <Modal
          visible={visible}
          title="Create a new Parking Boy"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem
              label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: "Please input employee's name!" }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
              )}
            </FormItem>
            <FormItem

              label="Username">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: "Please input employee's username!" }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem
              label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: "Please input employee's email!" }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </FormItem>
            <FormItem
              label="Phone">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: "Please input employee's phone!" }],
              })(
                <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />
              )}
            </FormItem>
            <FormItem
              label="Password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: "Please input employee's password!" }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" type="password" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  onCreateParkingBoy: (name, username, password, email, phone, token) => 
  fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      "name": name,
      "username": username,
      "password": password,
      "phone": phone,
      "email": email
      // "role": role
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  }),
  refreshData: (token) => fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
    //getInitData: fetch("http://localhost:8081/orders", {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
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

CreateParkingBoy = Form.create({})(CreateParkingBoy);

export default connect(mapStateToProps, mapDispatchToProps)(CreateParkingBoy);
