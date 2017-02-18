import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, remove } from '../../actions';
import { getData } from '../../selectors';
import Table from '../../components/Table';
import FAB from '../../components/FAB';
import { browserHistory } from 'react-router';

class Employees extends Component {

    fields = [
        { title: 'First Name', key: 'firstName' },
        { title: 'Last Name', key: 'lastName' },
        { title: 'Departments Id', key: 'department' }
    ]

    componentDidMount() {
        const { get } = this.props;
        get();
    }

    render() {

        const { data, remove } = this.props;

        return (
            <div>
                <h3>Employees</h3>

                <Table 
                    fields={this.fields}
                    remove={remove}
                    edit={id => browserHistory.push(`/employees/edit/${id}`)}
                    data={data}
                />

                <FAB predicate='employees' />

            </div>
        )
    }
}

export default connect(
    state => ({
        data: getData(state, { predicate: 'employees' })
    }),
    dispatch => ({
        get: () => dispatch(get('employees')),
        remove: id => dispatch(remove({ predicate: 'employees', id }))
    })
)(Employees)