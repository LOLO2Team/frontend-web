import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from "react-redux";
import ParkingBoysResource from '../resources/parkingBoyResource';

class ParkingBoyList extends Component {

    onClickDelete = (id) => {
        this.props.deleteEmployee(id, this.props.token)
    }

    onClickInvite = (id) => {
        this.props.inviteEmployee(id, this.props.token)
    }

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
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (text,record) => (
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
                    <a href="javascript:;" onClick={() => this.onClickInvite(record.employeeId)}>Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => this.onClickDelete(record.employeeId)}>Freeze</a>
                </span>
            ),
        }];
    render() {
        const dummy = this.props.getInitData(this.props.token);
        return (
            <Table columns={this.columns} dataSource={this.props.parkingBoys} />
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
    inviteEmployee: (id, token) => {
        ParkingBoysResource.inviteEmployee(id, token) 
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoyList);
