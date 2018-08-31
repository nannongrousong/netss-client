import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';


export default [{
    path: '/page2',
    component: Loadable({
        loader: () => import('ADMIN_PAGES/page2'),
        loading: Loading
    })
}];