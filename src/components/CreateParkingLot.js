import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, Modal } from 'antd';
import { connect } from "react-redux";
import ParkingBoyList from './ParkingBoyList'
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

class CreateParkingLot extends Component {
  onAddParkingLot = () => {
    this.props.onCreateParkingLot(this.props.form.getFieldValue('parkingLotName'),
      this.props.form.getFieldValue('capacity'),
      this.props.token
    );
    const dummy = this.props.refreshData();
    this.props.form.setFields({
      ['parkingLotName']: { value: '' },
      ['capacity']: { value: '' }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.onAddParkingLot();
      }
    });
  }
  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    return (
      <div>
        <Modal
          visible={visible}
          title="Create a new Parking Lot"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >

          <Form layout="vertical">
            <FormItem label="Parking Lot Name">
              {getFieldDecorator('parkingLotName', {
                rules: [{ required: true, message: "Please input parking lot name!" }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Parking Lot Name" />
              )}
            </FormItem>
            <FormItem label="Capacity">
              {getFieldDecorator('capacity', {
                rules: [{ required: true, message: "Please input parking lot's capacity!" }],
              })(
                <Input prefix={<Icon type="hdd" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Capacity" type="number" min="1" />
              )}
            </FormItem>
            <FormItem>
              {/* <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                onClick={this.onAddParkingLot}
              >
                Create
          </Button> */}
            </FormItem>
          </Form>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  // onCreateParkingLot: (value, token) => fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
  //   mode: 'cors',
  //   method: 'POST',
  //   body: JSON.stringify({
  //     "parkingLotName": value.parkingLotName,
  //     "capacity": value.capacity
  //   }),
  //   headers: new Headers({
  //     'Content-Type': 'application/json',
  //     'Authorization': token
  //   }).then(console.log(value+token))
  // }),
  // refreshData: () => fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
  //   //getInitData: fetch("http://localhost:8081/orders", {
  //   headers: new Headers({
  //     'Content-Type': 'application/json'
  //   }),
  //   mode: 'cors',
  //   method: 'GET'
  // })
  //   .then(res => res.json())
  //   .then(res => {
  //     dispatch({
  //       type: "SET_PARKING_LOTS",
  //       payload: res
  //     });
  //   })
  //   .then(console.log("added"))
});

CreateParkingLot = Form.create({})(CreateParkingLot);

export default connect(mapStateToProps, mapDispatchToProps)(CreateParkingLot);
