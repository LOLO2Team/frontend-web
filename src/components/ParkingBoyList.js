import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from "react-redux";

class ParkingBoyList extends Component {
    columns = [
        //     {
        //     title: 'ID',
        //     dataIndex: 'parkingLotId',
        //     key: 'parkingLotId',
        // }, 
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
            render: (text,record) => (
                <span>
                    {<Tag color="blue" key={this.props.parkingBoys.role}>{record.role}</Tag>}
                </span>
            ),
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
    render() {
        const dummy = this.props.getInitData;
        console.log(this.props.parkingBoys)
        return (
            <Table columns={this.columns} dataSource={this.props.parkingBoys} />
        )
    }
}

const mapStateToProps = state => ({
    parkingBoys: state.parkingBoys
});

const mapDispatchToProps = dispatch => ({
    getInitData: fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
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
                type: "SET_PARKING_BOYS",
                payload: res
            });
        })
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoyList);
