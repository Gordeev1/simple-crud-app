import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Departments from './containers/Departments';
import Employees from './containers/Employees';
import Layout from './containers/Layout';
import Form from './containers/Form';

export default (
    <Route path='/' component={Layout}>
        <IndexRedirect to='departments' />
        <Route path='departments' component={Departments} />
        <Route path='employees' component={Employees} />
        <Route path='departments/create' component={Form({ mode: 'create', predicate: 'departments' })} />
        <Route path='employees/create' component={Form({ mode: 'create', predicate: 'employees' })} />
        <Route path='departments/edit/:id' component={Form({ mode: 'edit', predicate: 'departments' })} />
        <Route path='employees/edit/:id' component={Form({ mode: 'edit', predicate: 'employees' })} />
    </Route>
)