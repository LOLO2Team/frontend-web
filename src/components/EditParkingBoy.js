import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, Modal, Select } from 'antd';
import { connect } from "react-redux";
import ParkingBoyList from './ParkingBoyList'
import ParkingBoysResource from '../resources/parkingBoyResource';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class EditParkingBoy extends Component {
  state = {
    value: this.props.status,
    role: this.props.role
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({ value:{
      ...this.state.value,
      status: value
    } });
  }

  handleRoleChange = (role) => {
    console.log(`selected ${role}`);
    // this.setState({ role:value });
    this.setState({ value:{
      ...this.state.value,
      role: role
    } });
  }

  showRole = () =>{
    console.log("myRole"+this.props.myRole)
    if(this.props.myRole=='ROLE_ADMIN'){
      return <FormItem
      label="Role">
      <Select defaultValue={this.props.rolesList} style={{ width: 200 }} onChange={this.handleRoleChange}>
        <Option value="ROLE_EMPLOYEE">EMPLOYEE</Option>
        <Option value="ROLE_PARKING_CLERK">PARKING CLERK</Option>
        <Option value="ROLE_MANAGER">MANAGER</Option>
        <Option value="ROLE_ADMIN" >ADMIN</Option>
        <Option value="ROLE_HR">HR</Option>
      </Select>
    </FormItem>
    }
  }

  showStatus = () =>{
    if(this.props.myRole=='ROLE_MANAGER'){
      return <FormItem
      label="Status">
      <Select defaultValue={this.props.status} style={{ width: 200 }} onChange={this.handleChange}>
        <Option value="WORKING">WORKING</Option>
        <Option value="LEAVE">LEAVE</Option>
        <Option value="OFFDUTY">OFFDUTY</Option>
        <Option value="FROZEN" >FROZEN</Option>
        <Option value="QUIT">QUIT</Option>
      </Select>
    </FormItem>
    }
  }
  

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //       this.onAddParkingBoy();
  //     }
  //   });
  // }

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
          title="Edit Employee"
          okText="Save"
          onCancel={onCancel}
          onOk={() => this.props.onCreate(this.state.value)}
        >
          <Form layout="vertical">
            <FormItem
              label="Name"><span>{this.props.name}</span>

            </FormItem>
            <FormItem
              label="Username"><span>{this.props.username}</span>

            </FormItem>
            <FormItem
              label="Email">
              <span>{this.props.email}</span>
            </FormItem>
            <FormItem
              label="Phone">
              <span>{this.props.phone}</span>
            </FormItem>
            {this.showRole()}
            {this.showStatus()}
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  myRole: state.rolesList
})

const mapDispatchToProps = dispatch => ({
  // editEmployee: (id, token) => {
  //   ParkingBoysResource.editEmployee(id, token)
  // },
  
});

EditParkingBoy = Form.create({})(EditParkingBoy);

export default connect(mapStateToProps, mapDispatchToProps)(EditParkingBoy);
