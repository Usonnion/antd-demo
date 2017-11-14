/**
 * Created by Administrator on 2017-11-13.
 */
import AsyncComponent from '../../components/AsyncComponent';

const routes = {
  path: '/login',
  exact: true,
  breadcrumbName: '登录',
  component: AsyncComponent(() => import('./Login'))
};

export default routes;
