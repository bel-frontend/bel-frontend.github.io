import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import config from '@/config/dev';
import rootSaga from '@/modules/saga';
import rootReducer from '@/modules/reducers';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const createStoreApp = () => {
    const middleware = [];
    const enhancers = [];

    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    const composeEnhancers =
        (config.isActiveDevTool &&
            //@ts-ignore
            global?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose;

    const persistConfig = {
        key: 'root',
        storage: storage,
        throttle: 100,
        version: 0,
        whitelist: ['auth', 'locale', 'sidebar', 'cookies', 'autoSaveArtickle'],
    };
    // Middleware: Redux Persist Persisted Reducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    // Redux: Store
    const store = createStore(persistedReducer, composeEnhancers(...enhancers));

    // kick off root saga
    sagaMiddleware.run(rootSaga, store.dispatch);

    const persistor = persistStore(store);

    return { store, persistor };
};
export const { store, persistor } = createStoreApp();
