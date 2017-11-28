import AsyncComponent from '../../../components/asyncComponent';

const route = {
  path: '/home/product',
  component: AsyncComponent(() => import('./product')),
  routes: [
    {
      path: '/home/product',
      exact: true,
      component: AsyncComponent(() => import('./list/list')),
    },
    {
      path: '/home/product/edit/:id',
      component: AsyncComponent(() => import('./edit/edit')),
    },
    {
      path: '/home/product/detail/:id',
      component: AsyncComponent(() => import('./detail/detail')),
    }
  ]
};

export default route;
