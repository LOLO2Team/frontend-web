import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from "react-redux";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.props.getInitData(this.props.token);
  }

  columns = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId',
    }, {
      title: 'Vehicle Number',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
    }, {
      title: 'Parking Lot',
      key: 'parkingLotName',
      dataIndex: 'parkingLotName',
    }, {
      title: 'Employee Id',
      key: 'employeeId',
      dataIndex: 'employeeId',
    },
    {
      title: 'Status',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      // render: (text, record) => (
      //   <span>
      //     {record.rolesList.map(role => <Tag color="blue" key={role}>{role}</Tag>)}
      //   </span>
      // ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <span>
    //       <a href="javascript:;" onClick={() => this.onClickEdit(
    //         record.employeeId,
    //         record.name,
    //         record.username,
    //         record.email,
    //         record.phone,
    //         record.rolesList,
    //         record.status)}>Edit {record.name}</a>
    //       <Divider type="vertical" />
    //       <a href="javascript:;" onClick={() => this.onClickDelete(record.employeeId)}>Freeze</a>
    //     </span>
    //   )}
    ];

  componentWillMount() {
    this.props.getInitData(this.props.token);
  }
  componentDidMount() {
    this.interval = setInterval(() => this.props.getInitData(this.props.token), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    console.log(this.props.orders)
    return (
      <div>
        <Table columns={this.columns} dataSource={this.props.orders} />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  orders: state.orders,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  getInitData: (token) =>
    fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
      //getInitData: fetch("http://localhost:8081/orders", {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      mode: 'cors',
      method: 'GET'
    })
    .then(res => res.json())
    .then(res =>
      dispatch({
        type: "SET_PARKING_LOTS",
        payload: res
      }))
      .then(() =>
        fetch("https://parking-lot-backend.herokuapp.com/orders", {
          //getInitData: fetch("http://localhost:8081/orders", {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
          }),
          mode: 'cors',
          method: 'GET'
        }))
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: "SET_ORDERS",
          payload: res
        });
      })
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);