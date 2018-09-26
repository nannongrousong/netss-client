import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';


export default [{
    path: '/demo/chart',
    component: Loadable({
        loader: () => import('ADMIN_PAGES_DEMO/chart'),
        loading: Loading
    })
}];