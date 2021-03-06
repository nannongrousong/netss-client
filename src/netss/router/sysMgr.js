import Loadable from 'react-loadable';
import Loading from 'NETSS_COMPONENT/loading';

export default [{
    path: '/sysMgr/menu',
    component: Loadable({
        loader: () => import('NETSS_PAGES_SYSMGR/menu'),
        loading: Loading
    })
}, {
    path: '/sysMgr/user',
    component: Loadable({
        loader: () => import('NETSS_PAGES_SYSMGR/user'),
        loading: Loading
    })
}, {
    path: '/sysMgr/role',
    component: Loadable({
        loader: () => import('NETSS_PAGES_SYSMGR/role'),
        loading: Loading
    })
}];