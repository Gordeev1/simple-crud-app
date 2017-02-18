import {
    department,
    employee,
    view,
    static_handler
} from './controllers';

export default [
    { method: 'GET', path: '/{p*}', handler: static_handler },

    { method: 'GET', path: '/api/departments/{id?}', config: department.get },
    { method: 'POST', path: '/api/departments', config: department.post },
    { method: 'PUT', path: '/api/departments/{id}', config: department.update },
    { method: 'DELETE', path: '/api/departments/{id}', config: department.remove },

    { method: 'GET', path: '/api/employees/{id?}', config: employee.get },
    { method: 'POST', path: '/api/employees', config: employee.post },
    { method: 'PUT', path: '/api/employees/{id}', config: employee.update },
    { method: 'DELETE', path: '/api/employees/{id}', config: employee.remove },
]