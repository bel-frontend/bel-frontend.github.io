import { createAction } from 'redux-actions';
import { all, takeLatest, put, delay } from 'redux-saga/effects';
const modules = 'nothification';

// TODO: need update it for flow of messages

const SHOW_NOTHIFICATION_INFO = `${modules}/SHOW_NOTHIFICATION_INFO`;
const SHOW_NOTHIFICATION_SUCCESS = `${modules}/SHOW_NOTHIFICATION_SUCCESS`;
const SHOW_NOTHIFICATION_WARN = `${modules}/SHOW_NOTHIFICATION_WARN`;
const SHOW_NOTHIFICATION_ERROR = `${modules}/SHOW_NOTHIFICATION_ERROR`;
const HIDE_NOTIFICATIONS_ALL = `${modules}/HIDE_NOTIFICATIONS_ALL`;
export const showWarning = createAction(SHOW_NOTHIFICATION_WARN);
export const showSuccess = createAction(SHOW_NOTHIFICATION_SUCCESS);
export const showError = createAction(SHOW_NOTHIFICATION_ERROR);
export const showInfo = createAction(SHOW_NOTHIFICATION_INFO);
export const hideNotification = createAction(HIDE_NOTIFICATIONS_ALL);

const initialState = {
    place: 'bl',
    show: false,
    message: '',
    type: 'info',
};

export default function showNotification(state = initialState, action: any) {
    switch (action.type) {
        case SHOW_NOTHIFICATION_INFO: {
            const { message = '' } = action.payload;
            return { ...state, ...{ show: true, message: `${message}` } };
        }
        case SHOW_NOTHIFICATION_SUCCESS: {
            const { message = '' } = action.payload;
            return {
                ...state,
                ...{ show: true, message: `${message}`, type: 'success' },
            };
        }
        case SHOW_NOTHIFICATION_WARN: {
            const { message = '' } = action.payload;
            return {
                ...state,
                ...{ show: true, message: `${message}`, type: 'warning' },
            };
        }
        case SHOW_NOTHIFICATION_ERROR: {
            const { message = '' } = action.payload;
            return {
                ...state,
                ...{ show: true, message: `${message}`, type: 'error' },
            };
        }
        case HIDE_NOTIFICATIONS_ALL:
            return {
                ...state,
                ...{ show: false, message: initialState.message },
            };
        default:
            return state;
    }
}

function* notificationListener() {
    yield delay(5000);
    yield put(hideNotification());
}

export function* notificationSaga(dispatch: any) {
    yield all([
        takeLatest(showInfo, notificationListener),
        takeLatest(showSuccess, notificationListener),
        takeLatest(showError, notificationListener),
        takeLatest(showWarning, notificationListener),
    ]);
}

export const notificationSelector = (state: any) => state.notification;
