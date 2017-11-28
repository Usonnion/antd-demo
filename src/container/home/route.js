import AsyncComponent from '../../components/asyncComponent';
import DashboardRoute from './dashboard/route';
import HomeRoute from './customer/route';
import ProductRoute from './product/route';
import ReservationRoute from './product/route';

const routes = {
  path: '/home',
  component: AsyncComponent(() => import('./home')),
  routes: [DashboardRoute, HomeRoute, ProductRoute, ReservationRoute]
};

export default routes;
