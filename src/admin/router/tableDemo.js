import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';

export default [{
    path: '/demo/table',
    component: Loadable({
        loader: () => import('ADMIN_PAGES_DEMO/table'),
        loading: Loading
    })
}];