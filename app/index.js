import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './component/loading';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route
                            path='/comp1'
                            component={Loadable({
                                loader: () => import('./pages/comp1'),
                                loading: Loading,
                            })} />
                        <Route
                            path='/comp2'
                            component={Loadable({
                                loader: () => import('./pages/comp2'),
                                loading: Loading,
                            })} />
                        <Route
                            path='/comp3'
                            component={Loadable({
                                loader: () => import('./pages/comp3'),
                                loading: Loading,
                            })} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));

module.hot && module.hot.accept();