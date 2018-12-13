import React, { Component } from 'react';
import { Progress } from 'antd';
import { Card } from 'antd';
import { connect } from "react-redux";

class ParkingLotDashboard extends Component {
  showDashboard = () => {
    const newLots = this.props.parkingLots.map((lot) => {
      const percent = (lot.parkedCount / lot.capacity * 100)
      // const percent1 = (5 / 10 * 100)
      // console.log(percent1);
      return <div>
        <Card
          hoverable
          className="lot-card"
          boardered
        >
          <Progress type="dashboard" className="dashboard-graph"
          percent={percent} 
          format={(number) => 
          `${lot.parkedCount} /${lot.capacity}`} 
          />
          <p className="dashboard-desc"><label>Name:</label>{lot.parkingLotName}</p>
          <p className="dashboard-desc"><label>ID:</label>{lot.parkingLotId}</p>
          <p className="dashboard-desc"><label>Assigned Parking Boy ID:</label>{lot.employeeId}</p>
          </Card></div>
    })
    return newLots
  }
  componentWillMount() {
    this.props.getInitData(this.props.token);
  }
  componentDidMount() {
    this.interval = setInterval(() => this.props.getInitData(this.props.token), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    // const dummy = this.props.getInitData(this.props.token)
    return (
      <div className="flex-container">
        {this.showDashboard()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  parkingLots: state.parkingLots,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  getInitData: token => fetch("https://parking-lot-backend.herokuapp.com/parkinglots", {
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