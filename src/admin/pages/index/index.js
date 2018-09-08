import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Tabs, Dropdown } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMenu } from 'ADMIN_ACTION/menu';

import 'COMMON_STYLES_UTILITIES/main.less';
import styles from './index.less';
import logoImg from 'COMMON_IMAGES/logo.jpg';

import adminRouters from 'ADMIN_ROUTER';

const { Header, Content, Footer, Sider } = Layout;
const { Item: MenuItem, Divider: MenuDivider, SubMenu } = Menu;
const { TabPane } = Tabs;

const createMenus = (menu) => {
    //  有children忽略path参数
    return menu.map((item) => {
        const { key, title, icon, path, children } = item;
        if (children) {
            return (
                <SubMenu
                    key={key}
                    title={<span><Icon type='user' /><span>{title}</span></span>}>
                    {createMenus(children)}
                </SubMenu>
            );
        } else {
            return (
                <MenuItem key={key} path={path}>
                    <Icon type={icon} />
                    <span className='nav-text'>{title}</span>
                </MenuItem>
            );
        }
    });
};


class Index extends Component {
    static propTypes = {
        history: PropTypes.object,
        setMenu: PropTypes.func,
        menu: PropTypes.array
    }

    state = {
        collapsed: false
    }

    componentDidMount() {
        const { setMenu } = this.props;
        setMenu();
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
        const { menu } = this.props;
        const operMenus = (
            <Menu>
                <MenuItem key="1" onClick={this.handleTabClose.bind(this, 'present')}>关闭当前</MenuItem>
                <MenuItem key="2" onClick={this.handleTabClose.bind(this, 'other')}>关闭其他</MenuItem>
                <MenuItem key="3" onClick={this.handleTabClose.bind(this, 'all')}>关闭所有</MenuItem>
            </Menu>
        );

        const operMenus2 = (
            <Menu>
                <MenuItem key="1" onClick={this.handleTabClose.bind(this, 'present')}><Icon type='user' /> 个人中心</MenuItem>
                <MenuItem key="2" onClick={this.handleTabClose.bind(this, 'other')}><Icon type='setting' /> 个人中心设置</MenuItem>
                <MenuDivider />
                <MenuItem key="3" onClick={this.handleTabClose.bind(this, 'all')}><Icon type='logout' /> 退出登录</MenuItem>
            </Menu>
        );

        return (
            <Layout className='h-100'>
                <Sider
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleCollapse}
                    collapsible>
                    {
                        <div className={styles.logo}>
                            <img src={logoImg} />
                            <span className={this.state.collapsed ? 'd-none' : ''}>云盘1</span>
                        </div>
                    }

                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={['1-2']}
                        onClick={this.handleMenuClick}>
                        {createMenus(menu)}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className={styles.header}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} className={styles['switch-icon']} onClick={this.handleCollapse} />
                        <Dropdown overlay={operMenus2} className={styles.userinfo} >
                            <div>
                                <img src={logoImg} />
                                <a href="#">操作</a>
                            </div>
                        </Dropdown>
                    </Header>
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
                            <TabPane tab={
                                <Dropdown overlay={operMenus} trigger={['contextMenu']}>
                                    <div style={{ userSelect: 'none', display: 'inline-block' }}>tab2</div>
                                </Dropdown>
                            } key='/page2' closable>
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

Index = connect(
    (state) => ({
        menu: state.menu
    }),
    {
        setMenu
    }
)(Index);

export default Index;