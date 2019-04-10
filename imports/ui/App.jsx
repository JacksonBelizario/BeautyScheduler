import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Routes} from '../routes';
import {IconButton, Slide, Snackbar} from "@material-ui/core";
import {Close as CloseIcon} from "@material-ui/icons";
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Navbar} from './components/Navbar';

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
            show: state.showSnackBar.show,
        }
    }))
)(({classes, showSnackBar, dispatch}) => (
    <Fragment>
        <Navbar/>

        <div className={classes.container}>
            <Routes/>
        </div>

        <Snackbar
            open={showSnackBar.show}
            TransitionComponent={(props) => <Slide {...props} direction="up"/>}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{showSnackBar.message}</span>}
            autoHideDuration={2000}
            onClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }

                dispatch({
                    type: 'SNACKBAR',
                    show: false,
                    message: ''
                })
            }}
            action={
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => {
                        dispatch({
                            type: 'SNACKBAR',
                            show: false,
                            message: ''
                        })
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            }
        />
    </Fragment>
));
