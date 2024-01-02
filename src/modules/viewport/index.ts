import { createAction } from "redux-actions";
import get from "lodash/get";
import { getViewport as defaultStateView } from "@/utils/dom";

const defaultState = defaultStateView();
const modules = "viewport";
const CHANGE_VIEWPORT = `${modules}/CHANGE_VIEWPORT`;

export const changeViewport = createAction(CHANGE_VIEWPORT);

//reducer
export const ViewPortReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case CHANGE_VIEWPORT: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const getViewport = (state: any) => get(state, "viewport");
export const getIsHighHeight = (state: any) => get(state, "viewport.isHigh");
