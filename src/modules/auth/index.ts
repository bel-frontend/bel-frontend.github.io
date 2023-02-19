import { all, takeLatest, put, delay, call, select } from 'redux-saga/effects';
import { INIT_DATA } from 'modules/init';
import {
    signOut,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { app } from 'modules/firebase';
import { createAction } from 'redux-actions';
import { callbackify } from 'util';

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

const signOutUser = (callback: any) =>
    signOut(auth)
        .then(() => {
            if (typeof callback === 'function') callback();
        })
        .catch((error) => {
            // An error happened.
        });

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

function* userLogoutSaga(dispatch: any) {
    yield call(signOutUser, undefined);
    // yield delay(100);
}

export const authModuleSaga = function* (dispatch: any) {
    yield all([
        // @ts-ignore
        takeLatest([INIT_DATA], checkAuthSaga, dispatch),
        takeLatest([USER_UNLOGINED], userLogoutSaga, dispatch),
    ]);
};

export const currentUserIsAuth = (state: any) => state.auth.userIsAuth;
