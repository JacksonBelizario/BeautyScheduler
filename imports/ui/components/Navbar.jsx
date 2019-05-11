import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {BarAvatar} from '../User/BarAvatar.jsx';
import {RouterPaths} from '../../routes';
import {Link, withRouter} from 'react-router-dom';
import {Sidebar} from './Sidebar';
import {config} from '../../config.js';

const styles = theme => ({
    root: {
        // flexGrow: 1,
        margin: theme.spacing.unit,
    },
    appBar: {
        borderRadius: '10px',
        backgroundColor: '#fff',
        color: theme.palette.primary.main,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,.05)'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

function ButtonAppBar({classes, location: {pathname}}) {
    const [showDrawer, setShowDrawer] = useState(false);
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        onClick={() => setShowDrawer(true)}
                        color="inherit"
                        aria-label="Menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" color="inherit" className={classes.grow}>
                        {config.appName}
                    </Typography>
                    {Meteor.userId() ? (
                        <BarAvatar/>
                    ) : pathname !== '/login' ? (
                        <Button
                            component={Link}
                            to={RouterPaths.LOGIN}
                            color="inherit"
                            variant="outlined"
                        >
                            Login
                        </Button>
                    ) : ''}
                </Toolbar>
            </AppBar>
            <Sidebar showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
        </div>
    );
}

export const Navbar = compose(
    withRouter,
    withStyles(styles)
)(ButtonAppBar);