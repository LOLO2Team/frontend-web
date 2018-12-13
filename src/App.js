import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import ParkingBoysPage from './components/ParkingBoysPage'
import ParkingLotsPage from './components/ParkingLotsPage'
import BoyLotAssoPage from './components/BoyLotAssoPage'
import ParkingLotDashboard from './components/ParkingLotDashboard'
import { Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import OrdersPage from './components/OrdersPage';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }} id="components-layout-demo-custom-trigger">
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo"><h2>LOLO2</h2></div>
            <Menu className="sider"theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>Employee</span>
                <Link to="/parkingBoys">Employee</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <i class="fab fa-product-hunt"></i>
                <span className="nav-padding">Parking Lots</span>
                <Link to="/parkingLots">Parking Lots</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <i class="fas fa-link"></i>
                <span className="nav-padding">Association</span>
                <Link to="/asso-parkingBoys-parkingLots">Association</Link>
              </Menu.Item>
              <Menu.Item key="4">
              <i class="fas fa-tachometer-alt"></i>
                <span class="nav-padding">Lot Dashboard</span>
                <Link to="/parkingLotDashboard">Lot Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="5">
              <i class="fas fa-clipboard-list"></i>
                <span class="nav-padding">Orders</span>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="header" style={{ background: '#fff', padding: 0 }}>
              {/* <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              /> */}
              <h2>LOLO2's Parking System</h2>
            </Header>
            <Switch>
              <Route path="/parkingLots" component={ParkingLotsPage} />
              <Route path="/asso-parkingBoys-parkingLots" component={BoyLotAssoPage} />
              <Route path="/parkingBoys" component={ParkingBoysPage} />
              <Route path="/parkingLotDashboard" component={ParkingLotDashboard}/>
              <Route path="/orders" component={OrdersPage}/>
              <Route component={ParkingBoysPage}/>
            </Switch>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
