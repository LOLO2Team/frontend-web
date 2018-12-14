import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from "react-redux";
import ParkingBoysResource from '../resources/parkingBoyResource';
import EditParkingBoy from './EditParkingBoy'

class ParkingBoyList extends Component {
  constructor(props) {
    super(props);
    this.props.getInitData(this.props.token);
    // console.log(this.props.parkingBoys)
  }
  state = {
    visible: false,
    id: '',
    name: '',
    username: '',
    email: '',
    phone: '',
    rolesList: [],
    status: '',
  };

  showModal = () => {
    this.setState({ visible: true });
    console.log(this.state.visible);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (value,role) => {
    const form = this.formRef.props.form;
    console.log(value);
    form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return;
      }
      console.log('Received value of form: ', value.status);
      console.log('Received role of form: ', value.role);

      this.props.editEmployee(this.state.id, value.status, this.props.token);
      this.props.editEmployeeRole(this.state.id, value.role, this.props.token);
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

  onClickEdit = (id, name, username, email, phone, rolesList, status) => {
    // console.log(this.state.roleList)
    this.setState({ id, name, username, email, phone, rolesList, status });
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
      key: 'rolesList',
      dataIndex: 'rolesList',
      render: (text, record) => (
        <span>
          {/* {console.log(record.rolesList)} */}
           {record.rolesList.map(role => <Tag color="blue" key={role}>{role}</Tag>)}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => (
        <span>
          {<Tag color="blue" key={record.status}>{record.status}</Tag>}
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
            record.rolesList,
            record.status)}>Edit {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => this.onClickDelete(record.employeeId)}>Freeze</a>
        </span>
      ),
    }];

  componentWillMount() {
    this.props.getInitData(this.props.token);
  }
  // componentDidMount() {
  //   this.interval = setInterval(() => this.props.getInitData(this.props.token), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  render() {
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
          rolesList={this.state.rolesList}
          status={this.state.status}
        />
        <Table columns={this.columns} dataSource={this.props.parkingBoys} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  parkingBoys: state.parkingBoys,
  token: state.token,
  rolesList: state.rolesList
});

const mapDispatchToProps = dispatch => ({
  getInitData: (token) => ParkingBoysResource.getAllEmployees(token)
    .then(res => res.json())
    .then(res => {
      // console.log(res[0])
      dispatch({
        type: "SET_PARKING_BOYS",
        payload: res
      });
    }),
  deleteEmployee: (id, token) => {
    ParkingBoysResource.deleteEmployee(id, token)
  },
  editEmployee: (id, status, token) => {
    ParkingBoysResource.editEmployee(id, status, token)
  },
  editEmployeeRole: (id, role, token) =>{
    ParkingBoysResource.editEmployeeRole(id,role,token)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoyList);
