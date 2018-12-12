import React, { Component } from 'react'
import { Layout, Form, Icon, Input, Button, } from 'antd';
import { connect } from "react-redux";
import ParkingLotList from './ParkingLotList'
import CreateParkingLot from './CreateParkingLot'
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class ParkingLotsPage extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.props.onCreateParkingLot(values, this.props.token);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  // onAddParkingLot = () => {
  //   this.props.onCreateParkingLot(this.props.form.getFieldValue('parkingLotName'), this.props.form.getFieldValue('capacity'));
  //   const dummy = this.props.refreshData();
  //   this.props.form.setFields({['parkingLotName']:{value:''},['capacity']:{value:''}})
  // }

  // componentDidMount() {
  //   // To disabled submit button at the beginning.
  //   this.props.form.validateFields();
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }
  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const nameError = isFieldTouched('parkingLotName') && getFieldError('parkingLotName');
    const capacityError = isFieldTouched('capacity') && getFieldError('capacity');
    return (
      <div>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <Button className="margin-bottom-15" type="primary" onClick={this.showModal}>Create Parking Boy</Button>
          <CreateParkingLot
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <ParkingLotList />
        </Content>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  // myRole: state.myRole,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  onCreateParkingLot: (value, token) => fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      "parkingLotName": value.parkingLotName,
      "capacity": value.capacity
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
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

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotsPage);

