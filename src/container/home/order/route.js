import AsyncComponent from '../../../components/asyncComponent';

const route = {
  path: '/home/order',
  component: AsyncComponent(() => import('./order')),
  routes: [{
    path: '/home/order',
    exact: true,
    component: AsyncComponent(() => import('./list/list')),
  }, {
    path: '/home/order/detail/:id',
    component: AsyncComponent(() => import('./detail/detail')),
  }, {
    path: '/home/order/edit/:id',
    component: AsyncComponent(() => import('./edit/edit')),
  }]
};

export default route;
