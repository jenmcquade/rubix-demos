/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import DevTools from './components/DevTools';
import rootReducer from './reducers';
import rootSaga from './sagas';
import instaProxySaga from './modules/InstaProxy/sagas';
 
// Middleware and store enhancers
const sagaMiddleware = createSagaMiddleware();
const enhancers = [
  applyMiddleware(sagaMiddleware),
];

export default function configureStore(initialState = {}) {
  
  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));
  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(instaProxySaga);

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./sagas', () => {
      sagaMiddleware.run(rootSaga);
    });
    module.hot.accept('./modules/InstaProxy/sagas', () => {
      sagaMiddleware.run(instaProxySaga);
    })
  }

  return store;
}
