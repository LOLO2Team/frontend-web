import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Menu, Icon } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { Transfer, Switch } from 'antd';
const { Header, Sider, Content } = Layout;

let mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    // disabled: i % 3 < 1,
  });
}

// const oriTargetKeys = mockData
//   .filter(item => item.key === 1)
//   .map(item => item.key);

//   console.log(oriTargetKeys)

class BoyLotAssoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: [],
      selectedKeys: [],
      disabled: false,
    }
    this.props.getInitData(this.props.token);
    // console.log(this.props.parkingBoysForAsso);
    // this.props.getParkingLots(this.props.token);
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
          {/* <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a> */}
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

    // console.log('targetKeys: ', nextTargetKeys);
    // console.log('direction: ', direction);
    // console.log('moveKeys: ', moveKeys);
    for (var index=0; index<moveKeys.length; index++){
      console.log(this.props.parkingLotsForAsso[moveKeys[index]])
      this.props.assignLotToBoys(this.props.token, this.props.parkingLotsForAsso[moveKeys[index]].description, this.props.selectedEmployeeId)
    }
  }
  
  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    // console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleScroll = (direction, e) => {
    // console.log('direction:', direction);
    // console.log('target:', e.target);
  }

  handleDisable = (disabled) => {
    this.setState({ disabled });
  };

  selectEmployee = (employee) => {
    this.props.selectEmployee(employee)
  }

  getParkingLotKeysByEmployee(employeeId) {
    // // this.props.getInitData(this.props.token);
    // // this.props.getParkingLots(this.props.token);
    // console.log("get keys")
    // console.log(this.props.parkingBoysForAsso
    //   .find(boy => boy.employeeId === employeeId)
    //   .parkingLotKeys
    //   .map(key => {
    //     return parseInt(key)
    //   }))
    this.props.getInitData(this.props.token);
    // console.log(this.props.parkingBoysForAsso);
    if (this.props.parkingBoysForAsso.length === 0 || this.props.parkingBoysForAsso == null) {
      // console.log("return");
      return [];
    }
    return this.props.parkingBoysForAsso
      .find(boy => boy.employeeId === employeeId)
      .parkingLotKeys;
  }

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
              this.selectEmployee(employee)
              // console.log(employee)
              // console.log(this.props.getParkingLotsByEmployee(employee.employeeId))
              // console.log(this.props.parkingLotsForAsso)
              return <p style={{ margin: 0 }}>
                <Transfer
                  dataSource={this.props.parkingLotsForAsso}
                  titles={['Available', 'Selected']}
                  targetKeys={this.getParkingLotKeysByEmployee(employee.employeeId)}
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
  token: state.token,
  parkingBoys: state.parkingBoys,
  parkingLotsForAsso: state.parkingLotsForAsso,
  parkingBoysForAsso: state.parkingBoysForAsso,
  selectedEmployeeId: state.selectedEmployeeId
});

const mapDispatchToProps = dispatch => ({
  selectEmployee: (employee) => {
    dispatch({
      type:"SELECT_EMPLOYEE",
      payload: employee.employeeId
    })
  },

  assignLotToBoys: (token, lotId, employeeId) => {
    console.log(employeeId)
    fetch("https://parking-lot-backend.herokuapp.com/parkinglots/"+ lotId +"/employeeId/"+ employeeId, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      mode: 'cors',
      method: 'PUT'
    })
      .then(res => res.json())
      .then(
        fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
          }),
          mode: 'cors',
          method: 'GET'
        })
          .then(res => res.json())
          .then(res => {
            dispatch({
              type: "ASSO_PAGE_GET_ALL_PARKING_LOTS",
              payload: res
            })
          })
          .then(
            dispatch({
              type: "ASSO_PAGE_MAP_LOT_KEY",
              payload: ''
            })
          )
      );
  },

  getInitData: (token) => {
    fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
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
      .then(
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
      .then(res => {
        dispatch({
          type: "ASSO_PAGE_GET_ALL_PARKING_LOTS",
          payload: res
        });
        dispatch({
          type: "ASSO_PAGE_MAP_LOT_KEY",
          payload: ''
        });
      }));
  },
  getParkingLots: (token) => {
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
      .then(res => {
        dispatch({
          type: "ASSO_PAGE_GET_ALL_PARKING_LOTS",
          payload: res
        });
        dispatch({
          type: "ASSO_PAGE_MAP_LOT_KEY",
          payload: ''
        });
      });
  },
  // getParkingLotsByEmployee: (employeeId) => {
  //   fetch("https://parking-lot-backend.herokuapp.com/parkinglots?employeeId=" + employeeId, {
  //     //getInitData: fetch("http://localhost:8081/orders", {
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     }),
  //     mode: 'cors',
  //     method: 'GET'
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       dispatch({
  //         type: "ASSO_PAGE_GET_PARKING_LOTS_BY_EMPLOYEE",
  //         payload: res
  //       });
  //     });
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoyLotAssoPage);