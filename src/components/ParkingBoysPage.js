import React, { Component } from 'react';
import { Layout, Form, Icon, Input, Button, } from 'antd';
import { connect } from "react-redux";
import ParkingBoyList from './ParkingBoyList';
import ParkingBoysResource from '../resources/parkingBoyResource';
import CreateParkingBoy from './CreateParkingBoy';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;



class ParkingBoysPage extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.props.createBoy(values, this.props.token);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  // onClickSwitchRoleButton = () => {
  //   if (this.props.myRole === "manager") {
  //     this.props.switchMyRole("HR");
  //   } else {
  //     this.props.switchMyRole("manager");
  //   }
  // }
  // renderIfHR = () => {
  //   if (this.props.myRole === "HR") {
  //     return <CreateParkingBoy />
  //   }
  // }

  render() {
    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
        <Button className="margin-bottom-15" type="primary" onClick={this.showModal}>Create Parking Boy</Button>
        <CreateParkingBoy
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
          {/* <Button
            type="primary"
            htmlType="submit"
            // disabled={hasErrors(getFieldsError())}
            onClick={this.onClickSwitchRoleButton}
          >
            Switch to {this.props.myRole === "manager" ? " HR" : " manager"}
          </Button> */}

          {/* {this.renderIfHR()} */}
          <ParkingBoyList />
        </Content>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  myRole: state.myRole,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  switchMyRole: (newRole) => {
    dispatch({
      type: "SWITCH_MY_ROLE",
      payload: newRole
    })
  },

  createBoy: (values, token) => {
    ParkingBoysResource.createBoy(values, token)
  }
    
  
})
export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoysPage);