import { all, takeLatest, put, delay, select } from 'redux-saga/effects';
import { INIT_DATA } from 'modules/init';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { app } from 'modules/firebase';
import { createAction } from 'redux-actions';

const module = 'auth';
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const USER_LOGINED = `${module}/USER_LOGINED`;
const USER_UNLOGINED = `${module}/USER_UNLOGINED`;

export const loginAction = createAction(USER_LOGINED);
export const logoutAction = createAction(USER_UNLOGINED);

export const registerRequest = (
    email: string,
    password: string,
    onSuccess: (user: any) => void,
    onError: (error: any) => void,
) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            onSuccess(user);
        })
        .catch((error) => {
            onError(error);
        });
};

export const loginRequest = (
    email: string,
    password: string,
    onSuccess: (user: any) => void,
    onError: (error: any) => void,
) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            onSuccess(user);
        })
        .catch((error) => {
            onError(error);
        });
};

export const checkUserAuth = (
    onSuccess: (user: any) => void,
    onError: () => void,
) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            onSuccess(user);
        } else {
            onError();
        }
    });
};

export default function authReduser(
    state = { userIsAuth: false },
    action: any,
) {
    switch (action.type) {
        case USER_LOGINED: {
            return { ...state, userIsAuth: true };
        }
        case USER_UNLOGINED: {
            return {
                ...state,
                userIsAuth: false,
            };
        }

        default:
            return state;
    }
}

function* checkAuthSaga(dispatch: any) {
    while (true) {
        checkUserAuth(
            (user) => {
                dispatch(loginAction());
            },
            () => {
                dispatch(logoutAction());
                console.log('error');
            },
        );
        yield delay(60000);
    }
}

export const authModuleSaga = function* (dispatch: any) {
    yield all([
        // @ts-ignore
        takeLatest([INIT_DATA], checkAuthSaga, dispatch),
    ]);
};

export const currentUserIsAuth = (state: any) => state.auth.userIsAuth;
