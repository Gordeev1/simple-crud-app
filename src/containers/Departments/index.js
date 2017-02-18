import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, remove } from '../../actions';
import { getData } from '../../selectors';
import Table from '../../components/Table';
import FAB from '../../components/FAB';
import { browserHistory } from 'react-router';

class Department extends Component {

    fields = [
        { title: 'Name', key: 'name' }
    ]

    componentDidMount() {
        const { get } = this.props;
        get();
    }

    render() {

        const { data, remove } = this.props;

        return (
            <div>
                <h3>Departments</h3>

                <Table 
                    fields={this.fields}
                    data={data}
                    edit={id => browserHistory.push(`/departments/edit/${id}`)}
                    remove={remove}
                />

                <FAB predicate='departments' />
                
            </div>
        )
    }
}

export default connect(
    state => ({
        data: getData(state, { predicate: 'departments' })
    }),
    dispatch => ({
        get: () => dispatch(get('departments')),
        remove: id => dispatch(remove({ predicate: 'departments', id }))
    })
)(Department)