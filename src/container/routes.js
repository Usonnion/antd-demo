import LoginRoute from './login/route';
import HomeRoute from './home/route';
import AsycnComponent from '../components/asyncComponent';

const routes = [
  {
    path: '',
    component: AsycnComponent(() => (import('./app'))),
    routes: [LoginRoute, HomeRoute]
  }
];

export default routes;
