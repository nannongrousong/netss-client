import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from 'ADMIN_STYLES/index.less';
import { errorHandle } from 'COMMON_UTILS/common';

import { initNavMenu, setActiveTab, closeNavTab, closeOtherNavTab, closeAllNavTab, editTabStore } from 'ADMIN_ACTION/homeNav';
import { setAuthInfo } from 'ADMIN_ACTION/authInfo';

import NavHeader from 'ADMIN_COMPONENT_NAVHEADER';
import NavSlider from 'ADMIN_COMPONENT_NAVSLIDER';
import NavTab from 'ADMIN_COMPONENT_NAVTAB';

import adminRouters from 'ADMIN_ROUTER';

import { Load_User_Info } from 'ADMIN_SERVICE/Sys_Login';

const { Content } = Layout;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };

        //  非当前激活的tab页右击操作会再出发tabChange事件，但实际上并不需要
        this.DO_NOT_HANDLE_TAB_CHANGE = false;
        this.IS_LOGIN = !!sessionStorage.getItem('AUTH_INFO');
    }

    componentDidMount() {
        //  用户主动刷新了页面
        if (this.IS_LOGIN) {
            Load_User_Info().then((resData) => {
                const { code, data: { Menu, NickName, RoleName }, info } = resData;
                if (code) {
                    const { initNavMenu, history, setAuthInfo } = this.props;
                    const { location: { pathname } } = history;
                    initNavMenu(pathname, Menu, (realPath) => {
                        if (pathname != realPath) {
                            //  碰到404了
                            history.push(realPath);
                        }
                    });

                    setAuthInfo({ NickName, RoleName });
                } else {
                    errorHandle(new Error(info));
                }
            }).catch(errorHandle);
        }
    }

    handleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleTabsEdit = (targetPath, action) => {
        if (!targetPath) {
            return;
        }

        const { closeNavTab, closeOtherNavTab, closeAllNavTab, history } = this.props;

        if (action == 'remove') {
            closeNavTab(targetPath, (path) => {
                path && history.push(path);
                this.DO_NOT_HANDLE_TAB_CHANGE = true;
                setTimeout(() => {
                    this.DO_NOT_HANDLE_TAB_CHANGE = false;
                }, 1000);
            });
        }

        if (action == 'removeOther') {
            closeOtherNavTab(targetPath);
        }

        if (action == 'removeAll') {
            closeAllNavTab();
        }
    }

    handleTabsChange = (path) => {
        if (!this.DO_NOT_HANDLE_TAB_CHANGE) {
            const { setActiveTab, history } = this.props;
            setActiveTab(path, (path2) => {
                history.push(path2);
            });
        }
    }

    handleMenuClick = ({ key: path }) => {
        debugger;
        const { history, setActiveTab } = this.props;
        setActiveTab(path, (path2) => {
            history.push(path2);
        });
    }

    handleTabClick = (tabKey) => {

    }

    render() {
        const { navMenu, navTab, activeRoute } = this.props;
        const { collapsed } = this.state;

        return (
            this.IS_LOGIN ?
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
                        <Content
                            className={styles.content}>
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
                    </Layout>
                </Layout>
                : <Redirect to={{ pathname: '/login', state: { from: this.props.history.location.pathname } }}></Redirect>
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
    closeAllNavTab: PropTypes.func,
    setAuthInfo: PropTypes.func
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
        closeAllNavTab,
        setAuthInfo
    }
)(Index);
export default Index;


export const TabWrapper = (storeName) => {
    return (WrappedComp) => {
        return connect(
            (state) => ({
                storeMap: state.homeNav.storeMap
            })
            ,
            {
                editTabStore
            })(class HOC extends Component {
                componentDidMount() {
                    const { editTabStore, history: { location: { pathname } } } = this.props;
                    editTabStore(pathname, storeName);
                }

                componentWillUnmount() {

                }

                render() {
                    const { storeMap, history: { location: { pathname } } } = this.props;
                    //  表明tab页是首次进入，通过这个可以决定一个tab加载完毕后是否需要加载后台数据
                    return <WrappedComp {...this.props} tabFirstIn={!storeMap[pathname]} />;
                }
            });
    };
};






