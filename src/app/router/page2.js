import Loadable from 'react-loadable';
import Loading from 'APP_COMPONENT/loading';


export default [{
    path: '/page2',
    component: Loadable({
        loader: () => import('APP_PAGES/page2'),
        loading: Loading
    })
}];