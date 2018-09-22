import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';


export default [{
    path: '/tableDemo',
    component: Loadable({
        loader: () => import('ADMIN_PAGES/tableDemo'),
        loading: Loading
    })
}];