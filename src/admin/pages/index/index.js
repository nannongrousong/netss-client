import React, { Component } from 'react';
import { Layout, Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from 'ADMIN_STYLES/index.less';
import { errorHandle } from 'COMMON_UTILS/common';
import createTreeNode from 'COMMON_UTILS/createTreeNode';
import { initNavMenu, setActiveTab, closeNavTab, closeOtherNavTab, closeAllNavTab, editTabStore } from 'ADMIN_ACTION/homeNav';
import { setAuthInfo } from 'ADMIN_ACTION/authInfo';
import NavHeader from 'ADMIN_COMPONENT_NAVHEADER';
import NavSlider from 'ADMIN_COMPONENT_NAVSLIDER';
import NavTab from 'ADMIN_COMPONENT_NAVTAB';
import Exception from 'ADMIN_COMPONENT_EXCEPTION';
import { Load_User_Info } from 'ADMIN_SERVICE/Sys_Auth';
import { setResource } from 'COMMON_COMPONENT/AuthResource';
import adminRouters from 'ADMIN_ROUTER';
import ModifyPwdModal from './modifyPwd';
const { Content } = Layout;

//  设置授权路由
const setAuthRouter = (allRouters, navMenu) => {
    const authPaths = navMenu.map((menu) => (menu.Path));
    return allRouters.map(router => (
        { ...router, isAuth: authPaths.includes(router.path) }
    ));
};

//  生成路由信息
const createRouteInfo = (adminRouters, navMenu) => (
    <Switch>
        {
            setAuthRouter(adminRouters, navMenu).map((routerItem, index) => {
                const { path, component, isAuth } = routerItem;
                return <Route
                    key={index}
                    path={path}
                    component={
                        isAuth ? component : () => <Redirect to='/403' />
                    } />;
            })
        }
        <Route path='/500' component={() => <Exception type='500' homePath='/admin/index' />} />
        <Route path='/403' component={() => <Exception type='403' homePath='/admin/index' />} />
        <Route path='*' component={() => <Exception type='404' homePath='/admin/index' />} />
    </Switch>
);

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            showModifyPwdModal: false
        };

        //  非当前激活的tab页右击操作会再出发tabChange事件，但实际上并不需要
        this.DO_NOT_HANDLE_TAB_CHANGE = false;
        this.IS_LOGIN = !!sessionStorage.getItem('AUTH_INFO');
    }

    componentDidMount() {
        //  用户主动刷新了页面
        if (this.IS_LOGIN) {
            Load_User_Info().then((resData) => {
                const { Data: { Menu, NickName, RoleName, Resource } } = resData;
                const { initNavMenu, history, setAuthInfo } = this.props;
                const { location: { pathname } } = history;
                //  初始化菜单
                initNavMenu(pathname, Menu, (newPath) => {
                    newPath != pathname && history.push(newPath);
                });
                //  设置用户信息
                setAuthInfo({ NickName, RoleName });
                //  设置用户权限资源
                setResource(Resource.map(res => (res.Path)));
            }).catch(errorHandle);
        }
    }

    componentDidCatch(err, info) {
        console.log('componentDidCatch.error', err);
        console.log('componentDidCatch.info', info);
        const { history } = this.props;
        history.push('/500');
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
            setActiveTab(path, (newPath) => {
                history.push(newPath);
            });
        }
    }

    handleMenuClick = ({ key: path }) => {
        const { history, setActiveTab } = this.props;
        setActiveTab(path, (path2) => {
            history.push(path2);
        });
    }

    handleUserCenter = () => {

    }

    handleResetPwd = () => {
        this.setState({
            showModifyPwdModal: true
        });
    }

    closeModifyPwdModal = () => {
        this.setState({
            showModifyPwdModal: false
        });
    }

    handleLogout = () => {
        Modal.confirm({
            title: '信息',
            content: '请确认退出登录？',
            onOk: () => {
                const { history } = this.props;
                sessionStorage.removeItem('AUTH_INFO');
                history.push('/login');
            }
        });
    }

    render() {
        const { navMenu, navTab, activeRoute } = this.props;
        const { collapsed, showModifyPwdModal } = this.state;

        return (
            this.IS_LOGIN ?
                <Layout className='h-100'>
                    <NavSlider
                        collapsed={collapsed}
                        navMenu={createTreeNode(navMenu)}
                        handleCollapse={this.handleCollapse}
                        handleMenuClick={this.handleMenuClick}
                        activeRoute={activeRoute} />

                    <Layout>
                        <NavHeader
                            collapsed={collapsed}
                            handleCollapse={this.handleCollapse}
                            handleUserCenter={this.handleUserCenter}
                            handleResetPwd={this.handleResetPwd}
                            handleLogout={this.handleLogout} />
                        <Content className={styles['layout-content']}>
                            {
                                activeRoute &&
                                <NavTab
                                    handleTabsEdit={this.handleTabsEdit}
                                    handleTabsChange={this.handleTabsChange}
                                    navTab={navTab}
                                    activeRoute={activeRoute} >
                                </NavTab>
                            }

                            {
                                navMenu.length &&
                                <div className={styles.content} style={{ top: activeRoute ? '40px' : 0 }}>
                                    {
                                        createRouteInfo(adminRouters, navMenu)
                                    }
                                </div>
                            }

                            {
                                showModifyPwdModal &&
                                <ModifyPwdModal
                                    closeModal={this.closeModifyPwdModal} />
                            }
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