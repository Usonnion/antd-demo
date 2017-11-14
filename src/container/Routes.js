/**
 * Created by Administrator on 2017-11-13.
 */
import LoginRoutes from './Login/Routes';
import HomeRoutes from './Home/Routes';
import AsycnComponent from '../components/AsyncComponent';

const routes = [
  {
    path: '',
    component: AsycnComponent(() => (import('./App'))),
    routes: [LoginRoutes, HomeRoutes]
  }
];

export default routes;
