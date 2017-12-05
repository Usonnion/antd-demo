import AsyncComponent from '../../../components/asyncComponent';

const route = {
  path: '/home/customer',
  component: AsyncComponent(() => import('./customer')),
  routes: [{
    path: '/home/customer',
    exact: true,
    component: AsyncComponent(() => import('./list/list')),
  }, {
    path: '/home/customer/detail/:id',
    component: AsyncComponent(() => import('./detail/detail')),
    routes: [
      {
        path: '/home/customer/detail/:id',
        exact: true,
        component: AsyncComponent(() => import('./account/account')),
      },
      {
        path: '/home/customer/detail/:id/consumption',
        exact: true,
        component: AsyncComponent(() => import('./consumption/consumption')),
      }
    ]
  }]
};

export default route;
