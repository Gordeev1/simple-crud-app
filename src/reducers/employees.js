import { binder } from './binder';
import * as types from '../actionsTypes';

export default binder({
    request: types.EMPLOYEES_REQUEST,
    success_get: types.EMPLOYEES_GET_SUCCESS,
    success_remove: types.EMPLOYEES_REMOVE_SUCCESS,
    fail: types.EMPLOYEES_FAIL,
})