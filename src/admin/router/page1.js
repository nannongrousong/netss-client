import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';


export default [{
    path: '/page1',
    component: Loadable({
        loader: () => import('ADMIN_PAGES/page1'),
        loading: Loading
    })
}];