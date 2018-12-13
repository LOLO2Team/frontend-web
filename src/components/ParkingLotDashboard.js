import React, { Component } from 'react';
import { Progress } from 'antd';
import { Card } from 'antd';
import { connect } from "react-redux";

class ParkingLotDashboard extends Component {
  showDashboard = () => {
    const newLots = this.props.parkingLots.map((lot)=> {
      const percent = (lot.capacity - lot.parkedCount)/lot.capacity
      return  <div>
                <Progress type="dashboard" percent={percent*100} format={(number,total) => `${lot.capacity - lot.parkedCount} /${lot.capacity}`} />
                <span>Parking Lot Name:{lot.parkingLotName}</span>
                <span>Parking Lot ID:{lot.parkingLotId}</span>
                <span>Assigned Parking Boy ID:{lot.employeeId}</span>
                <br></br>
              </div>
    })
    return  newLots
  }
  render() {
    const dummy = this.props.getInitData
    return (
      <div>
        <Card
          hoverable
          style={{ width: 180 }}
          boardered
        >
        {this.showDashboard()}
        </Card>,
       
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
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotDashboard);