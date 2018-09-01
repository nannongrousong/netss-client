import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routers from 'ADMIN_ROUTER';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import 'COMMON_STYLES_UTILITIES/main.less';

const baseName = '/admin';
const { Item: MenuItem, SubMenu } = Menu;

class App extends Component {
    render() {
        return (
            <BrowserRouter basename={baseName}>
                <div>
                    <Layout style={{ height: '100%' }}>
                        <Sider
                            collapsed={true}
                            collapsible>
                            <div>
                                
                            </div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                                <SubMenu key="1">
                                    <Icon type="user" />
                                    <span className="nav-text">nav 1</span>
                                    <MenuItem key='1-1'>
                                        <Icon type="user" />
                                    </MenuItem>
                                </SubMenu>
                                <MenuItem key="2">
                                    <Icon type="video-camera" />
                                    <span className="nav-text">nav 2</span>
                                </MenuItem>
                                <MenuItem key="3">
                                    <Icon type="upload" />
                                    <span className="nav-text">nav 3</span>
                                </MenuItem>
                                <MenuItem key="4">
                                    <Icon type="user" />
                                    <span className="nav-text">nav 4</span>
                                </MenuItem>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header>Header</Header>
                            <Content>
                                <Switch>
                                    {
                                        Routers.map((routerItem, index) => {
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
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));

module.hot && module.hot.accept();