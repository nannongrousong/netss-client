import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { initNavMenu, setActiveRoute, inActiveRoute } from 'ADMIN_ACTION/homeNav';
import NavHeader from 'ADMIN_COMPONENT_NAVHEADER';
import NavSlider from 'ADMIN_COMPONENT_NAVSLIDER';
import NavFooter from 'ADMIN_COMPONENT_NAVFOOTER';
import NavTab from 'ADMIN_COMPONENT_NAVTAB';

import 'COMMON_STYLES_UTILITIES/main.less';
import adminRouters from 'ADMIN_ROUTER';

const { Content } = Layout;

class Index extends Component {
    state = {
        collapsed: false
    }

    componentDidMount() {
        debugger;
        
        const { setActiveRoute, initNavMenu, history: { location: { pathname } } } = this.props;
        initNavMenu(() => {
            setActiveRoute('path', pathname);
        });
    }

    handleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleTabsEdit = (targetKey, action) => {
        const { inActiveRoute, history } = this.props;
        //  remove own
        if (action == 'remove') {
            inActiveRoute(targetKey, (path) => {
                history.push(path);
            });
        }

        if (action == 'removeOther') {
            debugger;
        }
    }

    handleTabsChange = (activeKey) => {
        console.log('handleTabsChange');
    }

    handleMenuClick = ({ key }) => {
        debugger;
        const { history, setActiveRoute } = this.props;
        setActiveRoute('key',  key, (path) => {
            history.push(path);
        });
    }

    handleTabClick = (tabKey) => {
        const { setActiveRoute, history } = this.props;
        setActiveRoute('key', tabKey, (path) => {
            history.push(path);
        });
    }

    handleTabClose = (type) => {
        console.log('handleTabClose, type', type);
    }

    render() {
        const { navMenu, navTab, activeRoute } = this.props;
        const { collapsed } = this.state;

        return (
            <Layout className='h-100'>
                <NavSlider
                    collapsed={collapsed}
                    navMenu={navMenu}
                    handleCollapse={this.handleCollapse}
                    handleMenuClick={this.handleMenuClick}
                    activeRoute={activeRoute} />

                <Layout>
                    <NavHeader
                        collapsed={collapsed}
                        handleCollapse={this.handleCollapse} />
                    <Content>
                        <NavTab
                            handleTabClose={this.handleTabClose}
                            handleTabsEdit={this.handleTabsEdit}
                            handleTabClick={this.handleTabClick}
                            handleTabsChange={this.handleTabsChange}
                            navTab={navTab}
                            activeRoute={activeRoute} >
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
                        </NavTab>
                    </Content>
                    <NavFooter />
                </Layout>
            </Layout>
        );
    }
}

Index.propTypes = {
    history: PropTypes.object,
    initNavMenu: PropTypes.func,
    setActiveRoute: PropTypes.func,
    navMenu: PropTypes.array,
    navTab: PropTypes.array,
    activeRoute: PropTypes.string,
    inActiveRoute: PropTypes.func
};

Index = connect(
    (state) => ({
        navMenu: state.homeNav.navMenu,
        navTab: state.homeNav.navTab,
        activeRoute: state.homeNav.activeRoute
    }),
    {
        initNavMenu,
        setActiveRoute,
        inActiveRoute
    }
)(Index);

export default Index;