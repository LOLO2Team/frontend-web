import React, { Component } from 'react'
import { Table, Divider, Tag, Switch } from 'antd';
import { connect } from "react-redux";
import parkingLotResource from '../resources/parkingLotResource';


class ParkingLotList extends Component {
    state = {
        dummy: " "
    }
  toggleLot = (id, status) => {
      
    console.log(id + " " + status)
    if (status === "OPEN"){
        status = "CLOSED"
    }
    else{
        status = "OPEN"
    }
    console.log(id + " " + status)
    this.props.toggleLot(id, this.props.token, status)
  }

  columns = [{
    title: 'ID',
    dataIndex: 'parkingLotId',
    key: 'parkingLotId',
  }, {
    title: 'Name',
    dataIndex: 'parkingLotName',
    key: 'parkingLotName',
  }, {
    title: 'Capacity',
    dataIndex: 'capacity',
    key: 'capacity',
  }, {
    title: 'Reserved Space',
    key: 'reservedSpace',
    dataIndex: 'reservedSpace',
  }, {
    title: 'Employee ID',
    key: 'employeeId',
    dataIndex: 'employeeId',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text, record) => (
      <span>
        {<Tag color="blue" key={this.props.parkingLots.status}>{record.status}</Tag>}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <button
          // checked={true}
          onClick={() =>this.toggleLot(record.parkingLotId, record.status)}
        >Toggle</button>
    )
  }];


  render() {
    const dummy = this.props.getInitData;
    return (
        <div>
            <Table columns={this.columns} dataSource={this.props.parkingLots} />
            {this.state.dummy}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  parkingLots: state.parkingLots,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  getInitData: fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
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
        type: "SET_PARKING_LOTS",
        payload: res
      });
    }),

  toggleLot: (id, token, status) => {
    parkingLotResource.toggleLot(id, token, status)
    fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
        //getInitData: fetch("http://localhost:8081/orders", {
        headers: new Headers({
        'Content-Type': 'application/json'
        }),
        mode: 'cors',
        method: 'GET'
    }).then(res => res.json())
    .then(res => {
      dispatch({
        type: "SET_PARKING_LOTS",
        payload: res
      });
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotList);
