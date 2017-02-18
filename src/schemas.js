import { Schema } from 'normalizr';
 
const idAttribute = '_id';

const Department = new Schema('departments', { idAttribute });
const Employee = new Schema('employees', { idAttribute });

Employee.define({ 
    department: Department 
})

export { Employee, Department };