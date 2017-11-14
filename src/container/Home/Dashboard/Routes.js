/**
 * Created by Administrator on 2017-11-13.
 */
import AsyncComponent from '../../../components/AsyncComponent';

const routes = {
  path: '/home/dashboard',
  component: AsyncComponent(() => import('./Dashboard')),
  routes: [{
    path: '/home/dashboard/test',
    component: AsyncComponent(() => import('./Dashboard')),
  }]
};

export default routes;
