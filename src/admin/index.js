import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import Routers from 'ADMIN_ROUTER';
const preRouter = '/admin';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        {
                            Routers.map((routerItem, index) => {
                                const { path, component } = routerItem;
                                return <Route
                                    key={index}
                                    path={`${preRouter}${path}`}
                                    component={component} />;
                            })
                        }
                    </Switch>
                    <Layout style={{height: '100%'}}>
                        <Sider>Sider</Sider>
                        <Layout>
                            <Header>Header</Header>
                            <Content>Content</Content>
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