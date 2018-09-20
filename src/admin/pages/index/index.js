import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { initNavMenu, setActiveTab, closeNavTab, closeOtherNavTab, closeAllNavTab } from 'ADMIN_ACTION/homeNav';
import NavHeader from 'ADMIN_COMPONENT_NAVHEADER';
import NavSlider from 'ADMIN_COMPONENT_NAVSLIDER';
import NavFooter from 'ADMIN_COMPONENT_NAVFOOTER';
import NavTab from 'ADMIN_COMPONENT_NAVTAB';

import adminRouters from 'ADMIN_ROUTER';

const { Content } = Layout;

class Index extends Component {
    state = {
        collapsed: false
    }

    DO_NOT_HANDLE_TAB_CHANGE = false;

    componentDidMount() {
        const { setActiveTab, initNavMenu, history: { location: { pathname } } } = this.props;
        initNavMenu(() => {
            setActiveTab('path', pathname);
        });
    }

    handleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleTabsEdit = (targetKey, action) => {
        if(!targetKey) {
            return;
        }

        const { closeNavTab, closeOtherNavTab, closeAllNavTab, history } = this.props;

        if (action == 'remove') {
            closeNavTab(targetKey, (path) => {
                path && history.push(path);
                this.DO_NOT_HANDLE_TAB_CHANGE = true;
                setTimeout(() => {
                    this.DO_NOT_HANDLE_TAB_CHANGE = false;
                }, 1000);
            });
        }

        if (action == 'removeOther') {
            closeOtherNavTab(targetKey);
        }

        if (action == 'removeAll') {
            closeAllNavTab();
        }
    }

    handleTabsChange = (tabKey) => {
        console.log('handleTabsChange');
        if (!this.DO_NOT_HANDLE_TAB_CHANGE) {
            const { setActiveTab, history } = this.props;
            setActiveTab('key', tabKey, (path) => {
                history.push(path);
            });
        }
    }

    handleMenuClick = ({ key }) => {
        const { history, setActiveTab } = this.props;
        setActiveTab('key', key, (path) => {
            history.push(path);
        });
    }

    handleTabClick = (tabKey) => {
        console.log('handleTabClick');
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
    setActiveTab: PropTypes.func,
    navMenu: PropTypes.array,
    navTab: PropTypes.array,
    activeRoute: PropTypes.string,
    closeNavTab: PropTypes.func,
    closeOtherNavTab: PropTypes.func,
    closeAllNavTab: PropTypes.func
};

Index = connect(
    (state) => ({
        navMenu: state.homeNav.navMenu,
        navTab: state.homeNav.navTab,
        activeRoute: state.homeNav.activeRoute
    }),
    {
        initNavMenu,
        setActiveTab,
        closeNavTab,
        closeOtherNavTab,
        closeAllNavTab
    }
)(Index);

export default Index;