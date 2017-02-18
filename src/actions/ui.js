import * as types from '../actionsTypes';

export const toastShow = message => ({ type: types.TOAST_SHOW, payload: message })
export const toastClose = () => ({ type: types.TOAST_CLOSE })