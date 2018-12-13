import React, { Component } from 'react'
import { connect } from "react-redux";
import { Layout, Form, Icon, Input, Button, } from 'antd';
import OrderList from './OrderList';
const { Header, Sider, Content } = Layout;

export default class OrdersPage extends Component {
  render() {
    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          {/* <div className="action-row">
            {this.showCreateParkingBoy()}
            {this.showSearch()}
          </div> */}
          {/* <CreateParkingBoy
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          /> */}

          <OrderList />
        </Content>
      </div>
    )
  }
}
// export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoysPage);