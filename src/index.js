import './index.css';
import React from 'react';
import { Map } from 'immutable';
import ReactDOM from 'react-dom';
import rootSaga from './rootSaga';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import routes from './container/routes';
import createSagaMiddleware from 'redux-saga';
import CustomRoute from './components/customRoute';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

const sagaMiddleware = createSagaMiddleware();
const history = createHistory()
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, routerMiddleware(history))(createStore);
const store = createStoreWithMiddleware(rootReducer, Map({}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      <CustomRoute routes={routes} />
    </div>
  </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
