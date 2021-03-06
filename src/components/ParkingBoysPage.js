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
    searchValue: '',
    searching: false
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
    this.setState({ 
      canSearch: false,
      searchValue: e.target.value,
      searching: true
    });
    this.props.searchBoy(this.state.searchValue, this.props.token)
  }

  getAllData = () => {
    this.setState({ 
      searchValue: '',
      searching: false,
      canSearch: true
    });
    this.props.getAllData(this.props.token);
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

  showCreateParkingBoy = () => {
    // console.log(this.props.rolesList)
    console.log("role" + this.props.role)
    if (this.props.role == "ROLE_HR") {
      return <Button className="margin-bottom-15" type="primary" onClick={this.showModal}>Create New User</Button>
    }
  }

  componentWillMount() {
    this.props.getAllData(this.props.token);
  }
  componentDidMount() {
    if (this.state.searching) {
      this.interval = setInterval(this.props.searchBoy(this.state.searchValue, this.props.token), 1000);
    } else {
      this.interval = setInterval(this.props.getAllData(this.props.token), 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <div className="action-row">
            {this.showCreateParkingBoy()}
            {this.showSearch()}
          </div>
          <CreateParkingBoy
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <ParkingBoyList />
        </Content>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  token: state.token,
  role: state.role
})

const mapDispatchToProps = dispatch => ({
  createBoy: (values, token) => {
    ParkingBoysResource.createBoy(values, token)
    .then(res => {
      if (res.status === 201) {
        alert("Employee created");
      } else if (res.status === 403)
        alert("You are not authorized to do the action");      
      else {
        alert(res.status + " error has occurred");
      }
    })
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
  getAllData: (token) => 
    ParkingBoysResource.getAllEmployees(token)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: "SET_PARKING_BOYS",
          payload: res
        });
      })
  ,
  getAllEmployees: (token) =>{
    return fetch("https://parking-lot-backend.herokuapp.com/employees", {
        //getInitData: fetch("http://localhost:8081/orders", {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        }),
        mode: 'cors',
        method: 'GET'
    })
}


})
export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoysPage);