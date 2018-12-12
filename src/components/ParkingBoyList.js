import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from "react-redux";
import ParkingBoysResource from '../resources/parkingBoyResource';
import EditParkingBoy from './EditParkingBoy'

class ParkingBoyList extends Component {
  state = {
    visible: false,
    id:'',
    name: '',
    username: '',
    email:'',
    phone:'',
    role:'',
    status:'',
  };

  showModal = () => {
    this.setState({ visible: true });
    console.log(this.state.visible);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (value) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return;
      }
      console.log('Received values of form: ', value);
      this.props.editEmployee(this.state.id, value, this.props.token);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  onClickDelete = (id) => {
    this.props.deleteEmployee(id, this.props.token)
  }

  onClickEdit = (id, name, username, email, phone, role, status) => {
    this.setState({id, name, username, email, phone, role, status});
    this.showModal()
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    }, {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (text, record) => (
        <span>
          {<Tag color="blue" key={this.props.parkingBoys.role}>{record.role}</Tag>}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => (
        <span>
          {<Tag color="blue" key={this.props.parkingBoys.status}>{record.status}</Tag>}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.onClickEdit(
            record.employeeId,
            record.name,
            record.username,
            record.email,
            record.phone,
            record.role,
            record.status)}>Edit {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => this.onClickDelete(record.employeeId)}>Freeze</a>
        </span>
      ),
    }];
  render() {
    const dummy = this.props.getInitData(this.props.token);
    return (
      <div>
        <EditParkingBoy
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          id={this.state.id}
          name={this.state.name}
          username={this.state.username}
          email={this.state.email}
          phone={this.state.phone}
          role={this.state.role}
          status={this.state.status}
        />
        <Table columns={this.columns} dataSource={this.props.parkingBoys} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  parkingBoys: state.parkingBoys,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  getInitData: (token) => ParkingBoysResource.getAll(token)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: "SET_PARKING_BOYS",
        payload: res
      });
    }),
  deleteEmployee: (id, token) => {
    ParkingBoysResource.deleteEmployee(id, token)
  },
  editEmployee: (id,status, token) => {
    ParkingBoysResource.editEmployee(id, status, token)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoyList);
