import React, { Component } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Snackbar from 'material-ui/Snackbar';
import { blue600 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { toastClose } from '../../actions/ui';

const links = [ 
    { title: 'Departments', to: '/departments' },
    { title: 'Employees', to: '/employees' }
];

const styles = {
    paper: {
        padding: '30px',
        margin: '30px'
    },
    appBar: {
        background: blue600
    }
};

class Layout extends Component {
    state = {
        drawer: false
    }
    toggleDrawer = drawer => this.setState({ drawer })
    render() {

        const { toast_close, toast } = this.props;
        const { message, open } = toast;

        return (
            <MuiThemeProvider>
                <div>

                    <Snackbar 
                        open={open}
                        message={message}
                        onRequestClose={toast_close}
                        autoHideDuration={3000}
                    />

                    <AppBar
                        title='Dashboard'
                        style={styles.appBar}
                        iconElementLeft={
                            <IconButton style={styles.menuButton} onClick={() => this.toggleDrawer(true)}>
                                <Menu color='white' />
                            </IconButton>
                        }
                    />

                    <Drawer
                        docked={false}
                        open={this.state.drawer}
                        onRequestChange={state => this.toggleDrawer(state)}
                    >
                        { links.map(({ to, title }) =>
                            <MenuItem
                                key={title}
                                onClick={() => this.toggleDrawer(false)}
                                style={styles.menuItem}
                                primaryText={title}
                                containerElement={<Link to={to} />}
                            />
                        ) }
                    </Drawer>

                    <Paper style={styles.paper}>
                        { this.props.children }
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default connect(
    state => ({
        toast: state.ui_toast
    }),
    dispatch => ({
        toast_close: () => dispatch(toastClose())
    })
)(Layout)