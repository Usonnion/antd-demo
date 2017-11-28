import AsyncComponent from '../../../components/asyncComponent';

const route = {
  path: '/home/reservation',
  component: AsyncComponent(() => import('./reservation')),
  routes: [{
    path: '/home/reservation',
    exact: true,
    component: AsyncComponent(() => import('./list/list')),
  }]
};

export default route;
