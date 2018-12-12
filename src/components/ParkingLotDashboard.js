import React, { Component } from 'react';
import { Progress } from 'antd';

export default class ParkingLotDashboard extends Component {
  render() {
    return (
      <div>
       <Progress type="dashboard" percent={75} format={(number,total) => `${number} /${total}`} />
      </div>
    )
  }
}
