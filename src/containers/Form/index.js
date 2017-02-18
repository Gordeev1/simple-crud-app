import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDetailData } from '../../selectors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import isEmpty from 'lodash/isEmpty'
import { post, update } from '../../actions';
import { toastShow } from '../../actions/ui';
import { blue600, white } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router';
import pick from 'lodash/pick';

const styles = {
    container: { display: 'flex', flexDirection: 'column' },
    btn: { margin: '12px' }
}

export default ({ mode, predicate }) => {

    class Form extends Component {

        stateByPredicate = {
            employees: {
                firstName: '',
                lastName: '',
                department: ''
            },
            departments: {
                name: ''
            }
        }

        state = this.stateByPredicate[predicate];

        componentDidMount() {

            const { data } = this.props;

            if (mode === 'edit' && data) {

                const keys = Object.keys(this.state).map(key => key);
                this.setState(pick(data, keys));
            }
        }

        submit = () => {

            const { submit, toast_open, params } = this.props;

            if (Object.keys(this.state).filter(key => isEmpty(this.state[key])).length) {
                return toast_open('Заполните все поля');
            }

            return submit({ data: this.state, id: params.id });
        }

        render() {

            const { departmentsIds, loading } = this.props;

            return (

                <div style={styles.container}>

                    { Object.keys(this.state).map(key => 
                        key === 'department'
                            ? <SelectField
                                floatingLabelText={key}
                                key={key}
                                value={this.state[key]} 
                                fullWidth={true}
                                onChange={(ev, ind, value) => this.setState({ [key]: value })}
                            >
                                { departmentsIds.map(id => 
                                    <MenuItem key={id} value={id} primaryText={id} />
                                ) }
                            </SelectField>
                            : <TextField
                                key={key}
                                floatingLabelText={key}
                                value={this.state[key]}
                                fullWidth={true}
                                onChange={ev => this.setState({ [key]: ev.target.value })}
                            />
                    ) }

                    <div>
                        <RaisedButton 
                            label="Cancel" 
                            onClick={() => browserHistory.push(`/${predicate}`)} 
                        />
                        <RaisedButton 
                            label="Save"
                            style={styles.btn}
                            onClick={this.submit}
                            labelColor={white}
                            backgroundColor={blue600} 
                            disabled={loading}
                        />
                    </div>

                </div>

            )
        }
    }

    let mapStateToProps = (state, props) => {

        let result = {
            loading: state[predicate].loading
        };

        if (mode === 'edit') {
            result = {
                ...result,
                data: getDetailData(state, { id: props.params.id, predicate })
            }
        }

        if (predicate === 'employees') {
            result = {
                ...result,
                departmentsIds: state.departments.ids
            }
        }

        return result
    }

    const mapDispatchToProps = 
        dispatch => ({
            toast_open: message => dispatch(toastShow(message)),
            submit: mode === 'create'
                ? data => dispatch(post({ ...data, predicate }))
                : data => dispatch(update({ ...data, predicate }))
        })

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Form)
}