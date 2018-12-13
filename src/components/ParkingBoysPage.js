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
    canSearch: true,
    searchValue: ''
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

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  searchEmployee = (e) => {
    console.log(e.target.value);
    this.setState({ canSearch: false });
    this.setState({ searchValue: e.target.value });
    this.props.searchBoy(this.state.searchValue, this.props.token)
  }

  getAllData = (e) => {
    this.setState({ searchValue: '' });
    this.props.getAllData(this.props.token);
    this.setState({ canSearch: true });
  }

  showSearch = () => {
    if (this.state.canSearch) {
      return <div className="search">
        <Input className="input-search" placeholder="Search"
          onChange={this.handleChange}
          value={this.state.searchValue} />
        <Button type="primary" className="search" onClick={this.searchEmployee}>Search</Button>
      </div>
    }
    return <div className="search">
      <Button className="clear" onClick={this.getAllData}>Clear</Button>
    </div>
  }

  render() {
    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <div className="action-row">
            <Button className="margin-bottom-15" type="primary" onClick={this.showModal}>Create Parking Boy</Button>
            {this.showSearch()}
          </div>






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
  },

  searchBoy: (value, token) => {
    return fetch("https://parking-lot-backend.herokuapp.com/parkingboys/search?q=" + value, {
      //getInitData: fetch("http://localhost:8081/orders", {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      mode: 'cors',
      method: 'GET'
    })
      .then(res => res.json())
      // .then(res =>console.log(res))
      .then(res => {
        dispatch({
          type: "SET_PARKING_BOYS",
          payload: res
        });
      }
      )
  },
  getAllData: (token) => {
    ParkingBoysResource.getAll(token)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: "SET_PARKING_BOYS",
          payload: res
        });
      })
  }


})
export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoysPage);