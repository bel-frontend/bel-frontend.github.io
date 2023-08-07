import { createAction } from 'redux-actions';

const initialState = false;

const modules = 'cookies';

const CONFIRM_COOKIES = `${modules}/CONFIRM_COOKIES`;

export const confirmCookiesAction = createAction(CONFIRM_COOKIES);

export const cookiesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CONFIRM_COOKIES: {
            return true;
        }
        default:
            return state;
    }
};

export const cookiesSelector = (state: any) => state?.cookies;
