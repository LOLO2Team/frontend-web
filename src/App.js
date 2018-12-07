import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import ParkingBoysPage from './components/ParkingBoysPage'
import { Switch, Route, Link } from 'react-router-dom'

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
              </Menu.Item>
              <Menu.Item key="3">
                <i class="fas fa-link"></i>
                <span class="nav-padding">Association</span>
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
              <Route path="/parkingBoys" exact component={ParkingBoysPage} />

            </Switch>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
