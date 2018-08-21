import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Routers from 'ROUTER';

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
                                    path={path}
                                    component={component} />;
                            })
                        }
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));

module.hot && module.hot.accept();