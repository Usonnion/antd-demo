/**
 * Created by Administrator on 2017-11-13.
 */
import AsyncComponent from '../../components/asyncComponent';

const routes = {
  path: '/login',
  exact: true,
  breadcrumbName: '登录',
  component: AsyncComponent(() => import('./login'))
};

export default routes;
