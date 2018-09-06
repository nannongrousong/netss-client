import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';
import createBrowserHistory from 'history/createBrowserHistory';

import reducers from 'ADMIN_REDUCER';

const baseName = '/admin';
const store = createStore(reducers);

class App extends Component {
    render() {
        const ADMIN_PAGE = Loadable({
            loader: () => import('ADMIN_PAGES_INDEX'),
            loading: Loading
        });
        return (
            <LocaleProvider locale={zhCN}>
                <Provider store={store}>
                    <BrowserRouter basename={baseName}>
                        <Switch>
                            <Route path='/' component={ADMIN_PAGE} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </LocaleProvider>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));

module.hot && module.hot.accept();