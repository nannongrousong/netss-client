import Loadable from 'react-loadable';
import Loading from 'COMPONENT/loading';


export default [{
    path: '/page2',
    component: Loadable({
        loader: () => import('PAGES/page2'),
        loading: Loading
    })
}];