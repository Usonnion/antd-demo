/**
 * Created by Administrator on 2017-11-13.
 */
import AsyncComponent from '../../components/AsyncComponent';
import DashboardRoutes from './Dashboard/Routes';

const routes = {
  path: '/home',
  component: AsyncComponent(() => import('./Home')),
  routes: [DashboardRoutes]
};

export default routes;
