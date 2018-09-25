import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';


export default [{
    path: '/chartDemo',
    component: Loadable({
        loader: () => import('ADMIN_PAGES/chartDemo'),
        loading: Loading
    })
}];