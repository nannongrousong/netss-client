import Loadable from 'react-loadable';
import Loading from 'APP_COMPONENT/loading';


export default [{
    path: '/page1',
    component: Loadable({
        loader: () => import('APP_PAGES/page1'),
        loading: Loading
    })
}];