import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Menu, Icon } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { Transfer, Switch } from 'antd';
const { Header, Sider, Content } = Layout;

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const oriTargetKeys = mockData
  .filter(item => item.key === 1)
  .map(item => item.key);

class BoyLotAssoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: oriTargetKeys,
      selectedKeys: [],
      disabled: false,
    }
    this.props.getInitData()
  }

  columns = [
    {
      title: 'Id',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
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
      // render: (text,record) => (
      //     <span>
      //         {<Tag color="blue" key={this.props.parkingBoys.role}>{record.role}</Tag>}
      //     </span>
      // ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Switch
            unCheckedChildren="inactive"
            checkedChildren="active"
            // checked={true}
            onChange={this.handleDisable}
            style={{ marginTop: 16 }}
          />
        </span>
      ),
    }];

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  }

  handleDisable = (disabled) => {
    this.setState({ disabled });
  };
  render() {
    const { targetKeys, selectedKeys, disabled } = this.state;
    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <Table
            columns={this.columns}
            expandedRowRender={employee => {
              return <p style={{ margin: 0 }}>
                <Transfer
                  dataSource={() => this.props.getParkingLotsByEmployee(employee.employeeId)}
                  titles={['Available', 'Selected']}
                  targetKeys={targetKeys}
                  selectedKeys={selectedKeys}
                  onChange={this.handleChange}
                  onSelectChange={this.handleSelectChange}
                  onScroll={this.handleScroll}
                  render={item => item.title}
                  disabled={disabled}
                />
              </p>
            }}
            dataSource={this.props.parkingBoys}
          />

        </Content>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  parkingBoys: state.parkingBoys
});

const mapDispatchToProps = dispatch => ({
  getInitData: () => {
    fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
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
      });
  },
  getParkingLots: () => {
    fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
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
      });
  },
  getParkingLotsByEmployee: (employeeId) => {
    fetch("https://parking-lot-backend.herokuapp.com/parkinglots?employeeId=" + employeeId, {
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
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoyLotAssoPage);