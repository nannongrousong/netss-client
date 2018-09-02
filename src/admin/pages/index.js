import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Tabs, Dropdown } from 'antd';
import PropTypes from 'prop-types';

import 'COMMON_STYLES_UTILITIES/main.less';
import logoImg from 'COMMON_IMAGES/logo.jpg';
import styles from 'ADMIN_STYLES/index.less';

import adminRouters from 'ADMIN_ROUTER';

const { Header, Content, Footer, Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;
const { TabPane } = Tabs;



@withRouter
export default class extends Component {
    static propTypes = {
        history: PropTypes.object
    }

    state = {
        collapsed: false
    }

    handleCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    handleTabsEdit = (targetKey, action) => {
        debugger;
    }

    handleTabsChange = (activeKey) => {
        const { history } = this.props;
        history.push(activeKey);
    }

    handleMenuClick = ({ item, key, keyPath }) => {
        const { history } = this.props;
        history.push(key);
    }

    handleTabClick = (a, b, c) => {
        debugger;
    }

    handleTabClose = (type) => {
        console.log('type', type);
    }

    render() {
        const operMenus = (
            <Menu>
                <Menu.Item>
                    <a href='#' onClick={this.handleTabClose.bind(this, 'present')}>关闭当前</a>
                </Menu.Item>
                <Menu.Item>
                    <a href='#' onClick={this.handleTabClose.bind(this, 'other')}>关闭其他</a>
                </Menu.Item>
                <Menu.Item>
                    <a href='#' onClick={this.handleTabClose.bind(this, 'all')}>关闭所有</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <Layout style={{ height: '100%' }}>
                <Sider
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleCollapse}
                    collapsible>
                    {
                        <div className={styles.logo}>
                            <img src={logoImg} />
                            <span>云盘1</span>
                        </div>
                    }

                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={['1-2']}
                        onClick={this.handleMenuClick}>
                        <SubMenu
                            key='1'
                            title={<span><Icon type='user' /><span>菜单一</span></span>}>
                            <MenuItem key='1-1'>
                                <Icon type='user' />
                                <span className='nav-text'>菜单1-1</span>
                            </MenuItem>
                            <MenuItem key='1-2'>
                                <Icon type='user' />
                                <span className='nav-text'>菜单1-2</span>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem key='/page1'>
                            <Icon type='video-camera' />
                            <span className='nav-text'>菜单二</span>
                        </MenuItem>
                        <MenuItem key='/page2'>
                            <Icon type='upload' />
                            <span className='nav-text'>菜单三</span>
                        </MenuItem>
                        <MenuItem key='/page3'>
                            <Icon type='user' />
                            <span className='nav-text'>菜单四</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <Tabs
                            hideAdd
                            onTabClick={this.handleTabClick}
                            tabBarExtraContent={
                                <Dropdown overlay={operMenus}>
                                    <a href="#">操作<Icon type="down" /></a>
                                </Dropdown>
                            }
                            onEdit={this.handleTabsEdit}
                            onChange={this.handleTabsChange}
                            type='editable-card'>
                            <TabPane tab='tab1' key='/page1' closable>
                                这是tab1内容
                            </TabPane>
                            <TabPane tab='tab2' key='/page2' closable>
                                这是tab2内容
                            </TabPane>
                            <TabPane tab='tab3' key='/page3' closable>
                                这是tab3内容
                            </TabPane>
                        </Tabs>

                        <Switch>
                            {
                                adminRouters.map((routerItem, index) => {
                                    const { path, component } = routerItem;
                                    return <Route
                                        key={index}
                                        path={path}
                                        component={component} />;
                                })
                            }
                        </Switch>
                    </Content>
                    <Footer>footer</Footer>


                </Layout>
            </Layout>
        );
    }
}