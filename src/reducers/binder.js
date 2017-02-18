import { combineReducers } from 'redux';
import union from 'lodash/union';
import pull from 'lodash/pull';

const ids = types => (state = [], action) => {

    const { success_get, success_remove } = types;

    switch (action.type) {
        case success_get:
            return union(state, [].concat(action.payload.result))
        case success_remove:
            return [...pull(state, action.payload.id)]
        default:
            return state
    }
}

const loading = types => (state = false, action) => {

    const { request, success_get, success_remove, fail } = types;

    switch (action.type) {
        case request:
            return true
        case success_get:
        case success_remove:
        case fail:
            return false
        default:
            return state
    }
}

export const binder = types => 
	combineReducers({
		ids: ids(types),
		loading: loading(types)
	})