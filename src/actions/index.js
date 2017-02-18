import { Department, Employee } from '../schemas';
import { makeRequest } from '../utils/http';
import { arrayOf } from 'normalizr';
import { toastShow } from './ui';
import * as types from '../actionsTypes';
import { browserHistory } from 'react-router';

const schemasByPredicate = {
    departments: Department,
    employees: Employee
}

export const request = predicate => ({ type: types[`${predicate.toUpperCase()}_REQUEST`] })
export const fail = predicate => ({ type: types[`${predicate.toUpperCase()}_FAIL`] })

export const get = predicate => dispatch => {

    dispatch(request(predicate));

    return makeRequest({
        url: predicate,
        method: 'get',
        schema: arrayOf(schemasByPredicate[predicate])
    })
    .then(payload => dispatch({ type: types[`${predicate.toUpperCase()}_GET_SUCCESS`], payload }))
    .catch(error => {
        dispatch(fail(predicate));
        dispatch(toastShow(error.message))
    })
}

export const post = ({ predicate, data }) => dispatch => {

    dispatch(request(predicate));

    return makeRequest({
        url: predicate,
        method: 'post',
        body: JSON.stringify(data),
        schema: schemasByPredicate[predicate]
    })
    .then(payload => {
        dispatch({ type: types[`${predicate.toUpperCase()}_GET_SUCCESS`], payload })
        browserHistory.push(`/${predicate}`);
    })
    .catch(error => {
        dispatch(fail(predicate));
        dispatch(toastShow(error.message))
    })
}

export const update = ({ predicate, id, data }) => dispatch => {

    dispatch(request(predicate));

    return makeRequest({
        url: `${predicate}/${id}`,
        method: 'put',
        body: JSON.stringify(data),
        schema: schemasByPredicate[predicate]
    })
    .then(payload => {
        dispatch({ type: types[`${predicate.toUpperCase()}_GET_SUCCESS`], payload });
        browserHistory.push(`/${predicate}`);
    })
    .catch(error => {
        dispatch(fail(predicate));
        dispatch(toastShow(error.message))
    })
}

export const remove = ({ predicate, id }) => dispatch => {

    dispatch(request(predicate));

    return makeRequest({
        url: `${predicate}/${id}`,
        method: 'delete'
    })
    .then(payload => dispatch({ type: types[`${predicate.toUpperCase()}_REMOVE_SUCCESS`], payload }))
    .catch(error => {
        dispatch(fail(predicate));
        dispatch(toastShow(error.message))
    })
}