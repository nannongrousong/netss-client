import Loadable from 'react-loadable';
import Loading from 'ADMIN_COMPONENT/loading';


export default [{
    path: '/formDemo',
    component: Loadable({
        loader: () => import('ADMIN_PAGES/formDemo'),
        loading: Loading
    })
}];