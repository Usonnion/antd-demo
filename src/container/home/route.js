import AsyncComponent from '../../components/asyncComponent';
import DashboardRoute from './dashboard/route';
import CustomerRoute from './customer/route';
import ProductRoute from './product/route';
import ReservationRoute from './reservation/route';
import OrderRoute from './order/route';

const routes = {
  path: '/home',
  component: AsyncComponent(() => import('./home')),
  routes: [DashboardRoute, CustomerRoute, ProductRoute, ReservationRoute, OrderRoute]
};

export default routes;
