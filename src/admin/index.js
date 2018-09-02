import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';

const baseName = '/admin';

class App extends Component {
    render() {
        const ADMIN_PAGE = Loadable({
            loader: () => import('ADMIN_PAGES'),
            loading: Loading
        });
        return (
            <BrowserRouter basename={baseName}>
                <Switch>
                    <Route path='/' component={ADMIN_PAGE} />
                </Switch>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));

module.hot && module.hot.accept();