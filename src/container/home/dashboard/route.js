import AsyncComponent from '../../../components/asyncComponent';

const routes = {
  path: '/home/dashboard',
  component: AsyncComponent(() => import('./dashboard')),
  routes: [{
    path: '/home/dashboard/test',
    component: AsyncComponent(() => import('./dashboard')),
  }]
};

export default routes;
