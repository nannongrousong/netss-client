import Loadable from 'react-loadable';
import Loading from 'COMPONENT/loading';


export default [{
    path: '/page1',
    component: Loadable({
        loader: () => import('PAGES/page1'),
        loading: Loading
    })
}];