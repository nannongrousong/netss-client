import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Switch, Route, Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Loading from 'ADMIN_COMPONENT/loading';
import { createBrowserHistory } from 'history';
import reducers from 'ADMIN_REDUCER';
import 'COMMON_STYLES_UTILITIES/main.less';

const basename = '/admin';
const store = createStore(reducers, applyMiddleware(reduxThunk, reduxLogger));

class App extends Component {
    render() {
        const ADMIN_PAGE = Loadable({
            loader: () => import('ADMIN_PAGES_INDEX'),
            loading: Loading
        });

        const LOGIN_PAGE = Loadable({
            loader: () => import('ADMIN_PAGES_LOGIN'),
            loading: Loading
        });

        return (
            <LocaleProvider locale={zhCN}>
                <Provider store={store}>
                    <Router history={createBrowserHistory({ basename })}>
                        <Switch>
                            <Route path='/login' component={LOGIN_PAGE} />
                            <Route path='/' component={ADMIN_PAGE} />
                        </Switch>
                    </Router>
                </Provider>
            </LocaleProvider>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));

module.hot && module.hot.accept();