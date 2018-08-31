import Loadable from 'react-loadable';
import Loading from 'APP_COMPONENT/loading';


export default [{
    path: '/page3',
    component: Loadable({
        loader: () => import('APP_PAGES/page3'),
        loading: Loading
    })
}];