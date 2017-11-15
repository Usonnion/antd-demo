import './index.css';
import React from 'react';
import saga from './container/saga';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import routes from './container/routes';
import createSagaMiddleware from 'redux-saga';
import CustomRoute from './components/customRoute';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

sagaMiddleware.run(saga);

ReactDOM.render(<BrowserRouter>
  <Provider store={store}>
    <div>
      <CustomRoute routes={routes} />
    </div>
  </Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
