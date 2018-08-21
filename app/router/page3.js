import Loadable from 'react-loadable';
import Loading from 'COMPONENT/loading';


export default [{
    path: '/page3',
    component: Loadable({
        loader: () => import('PAGES/page3'),
        loading: Loading
    })
}];