import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, } from 'antd';
import { connect } from "react-redux";
import ParkingLotList from './ParkingLotList'
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;


class ParkingLotsPage extends Component {
  onAddParkingLot = () => {
    this.props.onCreateParkingLot(this.props.form.getFieldValue('parkingLotName'), this.props.form.getFieldValue('capacity'));
    const dummy = this.props.refreshData();
    this.props.form.setFields({['parkingLotName']:{value:''},['capacity']:{value:''}})
  }
  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <h3>Create Parking Lot</h3>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('parkingLotName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Parking Lot Name" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('capacity', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="hdd" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Capacity" type="number" min="1" />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                // disabled={hasErrors(getFieldsError())}
                onClick={this.onAddParkingLot}
              >
                Create
          </Button>
            </FormItem>
          </Form>
          <hr />
          <ParkingLotList />
        </Content>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onCreateParkingLot: (parkingLotName, capacity) => fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      "parkingLotName": parkingLotName,
      "capacity": capacity
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }),
  refreshData: () => fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
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
    .then(console.log("added"))
});

ParkingLotsPage = Form.create({})(ParkingLotsPage);

export default connect(null, mapDispatchToProps)(ParkingLotsPage);

