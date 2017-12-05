import AsyncComponent from '../../../components/asyncComponent';

const route = {
  path: '/home/reservation',
  component: AsyncComponent(() => import('./reservation')),
  routes: [{
    path: '/home/reservation',
    exact: true,
    component: AsyncComponent(() => import('./list/list')),
  },{
    path: '/home/reservation/detail/:id',
    component: AsyncComponent(() => import('./detail/detail')),
  }]
};

export default route;
