import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BarAvatar } from '../../app/User/ui/BarAvatar';
import { RouterPaths } from '../routes';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function ButtonAppBar({ classes, location: { pathname } }) {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        App Beleza
                    </Typography>
                    {Meteor.userId() ? (
                        <BarAvatar />
                    ) : pathname !== '/login' ? (
                        <Button
                            component={Link}
                            to={`/${RouterPaths.LOGIN}`}
                            color="inherit"
                            variant="outlined"
                        >
                            Login
                        </Button>
                    ) : ''}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default compose(
    withRouter,
    withStyles(styles)
)(ButtonAppBar);