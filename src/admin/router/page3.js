import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';


export default [{
    path: '/page3',
    component: Loadable({
        loader: () => import('ADMIN_PAGES/page3'),
        loading: Loading
    })
}];