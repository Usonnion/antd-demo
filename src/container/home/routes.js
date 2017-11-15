/**
 * Created by Administrator on 2017-11-13.
 */
import AsyncComponent from '../../components/asyncComponent';
import DashboardRoutes from './dashboard/routes';

const routes = {
  path: '/home',
  component: AsyncComponent(() => import('./home')),
  routes: [DashboardRoutes]
};

export default routes;
