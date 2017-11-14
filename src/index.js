import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from './container/Routes';
import CustomRoute from './components/CustomRoute';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
  <div>
    <CustomRoute routes={routes}/>
  </div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
