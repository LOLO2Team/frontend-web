import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from "react-redux";

const columns = [{
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
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
        </span>
    ),
}];


class ParkingLotList extends Component {
    render() {
        const dummy = this.props.getInitData;
        return (
            <Table columns={columns} dataSource={this.props.parkingLots} />
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
        })
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotList);
