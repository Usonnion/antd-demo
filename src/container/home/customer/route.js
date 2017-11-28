import AsyncComponent from '../../../components/asyncComponent';

const routes = {
  path: '/home/customer',
  component: AsyncComponent(() => import('./customer')),
  routes: [{
    path: '/home/customer',
    exact: true,
    component: AsyncComponent(() => import('./list/list')),
  }]
};

export default routes;
