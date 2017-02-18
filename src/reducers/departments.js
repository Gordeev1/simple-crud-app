import { binder } from './binder';
import * as types from '../actionsTypes';

export default binder({
    request: types.DEPARTMENTS_REQUEST,
    success_get: types.DEPARTMENTS_GET_SUCCESS,
    success_remove: types.DEPARTMENTS_REMOVE_SUCCESS,
    fail: types.DEPARTMENTS_FAIL,
})