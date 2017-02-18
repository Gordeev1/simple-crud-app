import merge from 'lodash/merge';

export default (state = {}, action) => {
	if (action.payload && action.payload.entities && action.payload.entities.employees) {
		return merge({}, state, action.payload.entities.employees);
	}
	return state
}