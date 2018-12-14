import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from "react-redux";
import { Layout, Form, Icon, Input, Button, } from 'antd';

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
      title: 'Employee',
      key: 'employeeName',
      dataIndex: 'employeeName',
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
    {
      title: 'Assign To',
      key: 'assign',
      render: (text, record) => (
        <span>
          {this.showAssignTo(record)}
        </span>
      )
    }
  ];

  showAssignTo = record => {
    if (this.props.myRole.includes("ROLE_MANAGER")) {
      const refNum = record.orderId;
      return <span>
        <Input id={record.orderId} ref="assign" />
        <Button className="margin-bottom-15" type="primary" onClick={() => this.assignOrderToEmployee(record, refNum)} >Assign</Button>
      </span>;
    }
  }

  assignOrderToEmployee = (order, refNum) => {
    this.props.assignOrder(this.props.token, order, document.getElementById(refNum).value, this.props.parkingBoys);
    document.getElementById(refNum).value = '';
  }

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
    const orders = this.props.orders.map(order => {
      if (this.props.parkingBoys == null) {
        return order;
      }
      const parkingBoy = this.props.parkingBoys.find(boy => boy.employeeId === order.employeeId);
      if (parkingBoy == null) {
        return order;
      }
      return {
        ...order,
        employeeName: parkingBoy.name
      }
    })
    return (
      <div>
        <Table columns={this.columns} dataSource={orders} />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  orders: state.orders,
  token: state.token,
  myRole: state.myRole,
  parkingBoys: state.parkingBoys
});

const mapDispatchToProps = dispatch => ({
  getInitData: (token) =>
  fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
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
        type: "SET_PARKING_BOYS",
        payload: res
      }))
      .then(() => 
    fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      mode: 'cors',
      method: 'GET'
    }))
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: "SET_PARKING_LOTS",
          payload: res
        }))
      .then(() =>
        fetch("https://parking-lot-backend.herokuapp.com/orders", {
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
      }),

  assignOrder: (token, order, employeeName, parkingBoys) => {
    if (parkingBoys == null) {
      alert("Parking boys not found");
      return;
    }
    if (parkingBoys.length === 0) {
      alert("Parking boys not found");
      return;
    }
    const boy = parkingBoys.find(boy => boy.name === employeeName)
    if (boy == null) {
      alert("Parking boy " + employeeName + " not found");
      return;
    }
    const employeeId = boy.employeeId;
    fetch("https://parking-lot-backend.herokuapp.com/orders/" + order.orderId + "/employeeId/" + employeeId, {
      //fetch("http://localhost:8081/orders/" + order.orderId + "/employeeId/0",{
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify({
        "content": order.orderId,
        "vehicleNumber": order.vehicleNumber,
        "orderStatus": "parking",
        "employeeId": employeeId
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          alert("Order assigned to employee");
        } else {
          alert(res.status + " error occurred");
        }
      })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);