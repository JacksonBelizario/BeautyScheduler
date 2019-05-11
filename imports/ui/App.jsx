import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Routes} from '../routes';
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

export const App = ({classes}) => (
<Fragment>
    <CssBaseline/>

    <Navbar/>

    <div className={classes.container}>
        <Routes/>
    </div>

    <SnackbarWrapper />
    
</Fragment>);

export default withStyles(style)(App);