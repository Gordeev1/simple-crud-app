import { combineReducers } from 'redux';
import entities from './entities';
import departments from './departments';
import employees from './employees';
import ui_toast from './ui_toast';

export default combineReducers({
    entities,
    departments,
    employees,
    ui_toast
})