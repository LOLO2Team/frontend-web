import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

export default class BoyLotAssoPage extends Component {
    render() {
        return (
            <div>
                <Content style={{
                    margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                }}
                >
                    Welcome to our new BoyLotAssoPage.js
          </Content>
            </div>
        )
    }
}