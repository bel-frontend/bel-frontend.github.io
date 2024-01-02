import rootReducer from '../reducers';
import { applyMiddleware, compose } from '@/modules/redux';
import createSagaMiddleware from 'redux-saga';
import saga from '../saga';
import config from '@/config/dev';

const composeEnhancers =
    // (config.isActiveDevTool &&
    //     //@ts-ignore
    //     global &&
    //     //@ts-ignore
    // global?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const sagaMiddleware = createSagaMiddleware();
interface EventEmitter {
    on: (event: string, listener: Function) => void;
    emit: (event: string, payload: any) => void;
}

const createEventEmitter = (): EventEmitter => {
    let listeners: { [key: string]: Function[] } = {};

    const on = (event: string, listener: Function): void => {
        listeners[event] = (listeners[event] || []).concat(listener);
    };

    const emit = (event: string, payload: any): void => {
        (listeners[event] || []).forEach((listener) => listener(payload));
    };

    return {
        on,
        emit,
    };
};

interface Action {
    type: string;
    [key: string]: any;
}

interface Store<S, A> {
    getState: () => S;
    dispatch: (action: A) => void;
    on: (event: string, listener: Function) => void;
    subscribe: any;
    initAcion?: string;
}

const createStore = <S, A extends Action, T>(
    reducer: (state: S, action: A) => S,
    initialState: S,
    enhancer?: T,
): Store<S, A> => {
    const middleware = [];
    const enhancers = [];
    let currentListeners: any[] = [];
    let nextListeners = currentListeners;
    let isDispatching = false;

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
        }
    }

    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    let state = initialState;
    const events = createEventEmitter();
    const getState = (): S => state;

    const dispatch = (action: A): A => {
        if (typeof action.type === 'undefined') {
            throw new Error(
                'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.',
            );
        }

        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.');
        }

        try {
            isDispatching = true;
            state = reducer(state, action);
        } finally {
            isDispatching = false;
        }

        const listeners = (currentListeners = nextListeners);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }

        events.emit('stateChanged', { state, action });
        return action;
    };
    events.on('stateChanged', ({ state, action }: any) => {
        // console.log('state', state);
        // console.log('stateChanged           EV', action);
    });

    if (typeof enhancer === 'function') {
        return enhancer(createStore)(reducer, initialState);
    }
    const INIT = '@@redux/INIT' as any;
    //@ts-ignore
    dispatch({ type: INIT });

    return {
        getState,
        dispatch,
        on: events.on,
        subscribe: subscribe,
        initAcion: INIT,
        // console.log('subscribe', data);
    };

    function subscribe(listener: any) {
        if (typeof listener !== 'function') {
            throw new Error(
                `Expected the listener to be a function. Instead, received: '${typeof listener}'`,
            );
        }

        if (isDispatching) {
            throw new Error(
                'You may not call store.subscribe() while the reducer is executing. ' +
                    'If you would like to be notified after the store has been updated, subscribe from a ' +
                    'component and invoke store.getState() in the callback to access the latest state. ' +
                    'See https://redux.js.org/api/store#subscribelistener for more details.',
            );
        }

        let isSubscribed = true;

        ensureCanMutateNextListeners();
        nextListeners.push(listener);

        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }

            if (isDispatching) {
                throw new Error(
                    'You may not unsubscribe from a store listener while the reducer is executing. ' +
                        'See https://redux.js.org/api/store#subscribelistener for more details.',
                );
            }

            isSubscribed = false;

            ensureCanMutateNextListeners();
            const index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
            currentListeners = [];
        };
    }
};

export const store = createStore(
    rootReducer,
    //@ts-ignore
    {},

    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga, store.dispatch);

export const useDispatch = () => {
    return store.dispatch;
};

export const useSelector = (selector: any) => {
    return selector(store.getState());
};
