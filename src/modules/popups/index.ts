// import * as api_helpers from 'react_redux_api';

import { createAction } from 'redux-actions';
import { all, takeEvery, put, select, call } from 'redux-saga/effects';

const modules = 'popups';

export const SHOW_CONFIRM = `${modules}/SHOW_CONFIRM`;
export const HIDE_CONFIRM = `${modules}/HIDE_CONFIRM`;

//actions
//
export const showPopupAction = createAction(SHOW_CONFIRM);
export const hidePopupAction = createAction(HIDE_CONFIRM);

//---example---------
//   showPopupAction({
//     message: "Вы действительно хотите удалить клиента?",
//     onClick: () => {
//       dispatch(
//         deleteClientRequest(
//           {
//             id,
//             clientId,
//           },
//           {
//             onSuccess: () => {
//               dispatch(getClientsRequest({ id, limit: 100, offset: 0 }));
//             },
//           }
//         )
//       );
//       return true;
//     },
//     onCancel: () => true,
//     showCancel: true,
//     submitButtonText: "Ok",
//     confirmButtonProps: { size: "small" },
//     cancelButtonProps: { size: "small" },
//   })

//-------------------reducer-----------------
const inititalData = { confirms: [] };
export const popupsReducer = function (
    state = inititalData,
    action: {
        type: string;
        payload: any;
    },
) {
    switch (action.type) {
        case SHOW_CONFIRM: {
            const { payload } = action;
            const { confirms } = state;
            return {
                ...state,
                confirms: [...confirms, { id: confirms.length, ...payload }],
            };
        }
        case HIDE_CONFIRM: {
            const { payload } = action;
            const { confirms } = state;
            return {
                ...state,
                confirms: [
                    ...confirms
                        .filter((item: { id?: any }) => item.id != payload)
                        .map((item: { [key: string]: any }, index) => ({
                            ...item,
                            id: index,
                        })),
                ],
            };
        }
        default:
            return state;
    }
};

//-----------------------------SAGA----------------
const showAlertSaga = function* () {};

export function* popupsSaga() {
    yield all([
        takeEvery(SHOW_CONFIRM, showAlertSaga),
        takeEvery(HIDE_CONFIRM, showAlertSaga),
    ]);
}
//----------selectors------------
export const popupSelector = (state: any) => state.popups.confirms;
