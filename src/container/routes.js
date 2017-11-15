/**
 * Created by Administrator on 2017-11-13.
 */
import LoginRoutes from './login/routes';
import HomeRoutes from './home/routes';
import AsycnComponent from '../components/asyncComponent';

const routes = [
  {
    path: '',
    component: AsycnComponent(() => (import('./app'))),
    routes: [LoginRoutes, HomeRoutes]
  }
];

export default routes;
