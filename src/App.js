import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import ParkingBoysPage from './components/ParkingBoysPage'
import ParkingLotsPage from './components/ParkingLotsPage'
import BoyLotAssoPage from './components/BoyLotAssoPage'
import ParkingLotDashboard from './components/ParkingLotDashboard'
import { Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';

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
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>Parking Boys</span>
                <Link to="/parkingBoys">Parking Boys</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <i class="fab fa-product-hunt"></i>
                <span class="nav-padding">Parking Lots</span>
                <Link to="/parkingLots">Parking Lots</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <i class="fas fa-link"></i>
                <span class="nav-padding">Association</span>
                <Link to="/asso-parkingBoys-parkingLots">Association</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <i class="fas fa-link"></i>
                <span class="nav-padding">ParkingLotDashboard</span>
                <Link to="/parkingLotDashboard">ParkingLotDashboard</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              This is a Title
            </Header>
            <Switch>
              <Route path="/parkingLots" component={ParkingLotsPage} />
              <Route path="/asso-parkingBoys-parkingLots" component={BoyLotAssoPage} />
              <Route path="/parkingBoys" component={ParkingBoysPage} />
              <Route path="/parkingLotDashboard" component={ParkingLotDashboard}/>
              <Route component={ParkingBoysPage}/>
            </Switch>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
