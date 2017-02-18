import { createSelector } from 'reselect';

const getId = (state, { id }) => id
const getIds = (state, { predicate }) => state[predicate].ids;
const getItems = (state, { predicate }) => state.entities[predicate];

export const getData = createSelector(
    [ getIds, getItems ],
    (ids, items) => ids.map(id => items[id])
)

export const getDetailData = createSelector(
    [ getId, getItems ],
    (id, items) => items[id]
)