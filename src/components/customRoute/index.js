/**
 * Created by Administrator on 2017-11-13.
 */
import React from 'react';
import { Route } from "react-router-dom";

const RouteWithSubRoutes = (route) => (
  <Route exact={route.exact} path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
);


const CustomRoute = ({ routes }) => (
  <div>
    {
      routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))
    }
  </div>
);

export default CustomRoute;
