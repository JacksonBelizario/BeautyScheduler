import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Routes} from '../routes';
import {Snackbar} from "@material-ui/core";
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Navbar} from './components/Navbar';
import SnackbarWrapper from './components/SnackbarWrapper';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../assets/css/main.css'

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        padding: 10,
    },
};

export const App = compose(
    withStyles(style),
    connect(state => ({
        showSnackBar: {
            message: state.showSnackBar.message,
            variant: state.showSnackBar.variant,
            show: state.showSnackBar.show,
        }
    }))
)(({classes, showSnackBar, dispatch}) => {

    function closeSnackBar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
  
        dispatch({
            type: 'SNACKBAR',
            show: false,
            message: ''
        })
    }

    return (<Fragment>
        <CssBaseline/>
        <Navbar/>

        <div className={classes.container}>
            <Routes/>
        </div>

        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={showSnackBar.show}
            autoHideDuration={3000}
            onClose={closeSnackBar}
            >
            <SnackbarWrapper
                onClose={closeSnackBar}
                variant={showSnackBar.variant}
                message={showSnackBar.message}
            />
        </Snackbar>
    </Fragment>);
});
