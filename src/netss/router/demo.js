import Loadable from 'react-loadable';
import Loading from 'NETSS_COMPONENT/loading';


export default [{
    path: '/demo/chart',
    component: Loadable({
        loader: () => import('NETSS_PAGES_DEMO/chart'),
        loading: Loading
    })
}, {
    path: '/demo/form',
    component: Loadable({
        loader: () => import('NETSS_PAGES_DEMO/form'),
        loading: Loading
    })
}, {
    path: '/demo/table',
    component: Loadable({
        loader: () => import('NETSS_PAGES_DEMO/table'),
        loading: Loading
    })
}];