import { TOAST_SHOW, TOAST_CLOSE } from '../actionsTypes';

const defaultState = { open: false, message: '' };

export default (state = defaultState, action) => {

    if (action.type === TOAST_SHOW) {
        return { ...state, open: true, message: action.payload }
    }
    if (action.type === TOAST_CLOSE) {
        return defaultState;
    }

    return state;
}