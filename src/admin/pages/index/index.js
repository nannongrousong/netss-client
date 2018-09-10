import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Tabs, Dropdown } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNavMenu } from '../../action/homeNav';
import NavHeader from 'ADMIN_COMPONENT_NAVHEADER';
import NavSlider from 'ADMIN_COMPONENT_NAVSLIDER';
import NavFooter from 'ADMIN_COMPONENT_NAVFOOTER';

import 'COMMON_STYLES_UTILITIES/main.less';

import adminRouters from 'ADMIN_ROUTER';

const { Content, Footer } = Layout;
const { Item: MenuItem } = Menu;
const { TabPane } = Tabs;

class Index extends Component {
    static propTypes = {
        history: PropTypes.object,
        setNavMenu: PropTypes.func,
        navMenu: PropTypes.array
    }

    state = {
        collapsed: false
    }

    componentDidMount() {
        const { setNavMenu } = this.props;
        setNavMenu();
    }

    handleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleTabsEdit = (targetKey, action) => {

    }

    handleTabsChange = (activeKey) => {
        const { history } = this.props;
        history.push(activeKey);
    }

    handleMenuClick = ({ item, key, keyPath }) => {
        const { history } = this.props;
        const { path } = item.props;
        history.push(path);
    }

    handleTabClick = (a, b, c) => {

    }

    handleTabClose = (type) => {
        console.log('type', type);
    }

    render() {
        const { navMenu } = this.props;
        const { collapsed } = this.state;
        const tabOperMenus = (
            <Menu>
                <MenuItem key="1" onClick={this.handleTabClose.bind(this, 'present')}>关闭当前</MenuItem>
                <MenuItem key="2" onClick={this.handleTabClose.bind(this, 'other')}>关闭其他</MenuItem>
                <MenuItem key="3" onClick={this.handleTabClose.bind(this, 'all')}>关闭所有</MenuItem>
            </Menu>
        );

        return (
            <Layout className='h-100'>
                <NavSlider
                    collapsed={collapsed}
                    navMenu={navMenu}
                    handleCollapse={this.handleCollapse}
                    handleMenuClick={this.handleMenuClick} />

                <Layout>
                    <NavHeader
                        collapsed={collapsed}
                        handleCollapse={this.handleCollapse} />
                    <Content>
                        <Tabs
                            hideAdd
                            onTabClick={this.handleTabClick}
                            tabBarExtraContent={
                                <Dropdown overlay={tabOperMenus}>
                                    <a href="#">操作<Icon type="down" /></a>
                                </Dropdown>
                            }
                            onEdit={this.handleTabsEdit}
                            onChange={this.handleTabsChange}
                            type='editable-card'>
                            <TabPane tab='tab1' key='/page1' closable>
                                这是tab1内容
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
                            </TabPane>
                            <TabPane tab='tab2' key='/page2' closable>
                                这是tab2内容
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
                            </TabPane>
                            <TabPane tab='tab3' key='/page3' closable>
                                这是tab3内容
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
                            </TabPane>
                        </Tabs>


                    </Content>
                    <NavFooter />
                </Layout>
            </Layout>
        );
    }
}

Index = connect(
    (state) => ({
        navMenu: state.homeNav.navMenu,
        navTab: state.homeNav.navTab
    }),
    {
        setNavMenu
    }
)(Index);

export default Index;