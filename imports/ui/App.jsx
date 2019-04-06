import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavBar from './Navbar.jsx';
import { Routes } from '../routes/Routes';

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

export const App = withStyles(style)(({ classes }) => (
    <Fragment>
        <NavBar />

        <div className={classes.container}>
            <Routes />
        </div>
    </Fragment>
));
