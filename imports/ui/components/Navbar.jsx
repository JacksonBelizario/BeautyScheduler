import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {compose} from 'recompose';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Typography from '@material-ui/core/Typography/index';
import Button from '@material-ui/core/Button/index';
import IconButton from '@material-ui/core/IconButton/index';
import MenuIcon from '@material-ui/icons/Menu';
import {BarAvatar} from '../../../app/User/ui/BarAvatar';
import {RouterPaths} from '../../routes';
import {Link, withRouter} from 'react-router-dom';
import {Sidebar} from "./Sidebar";

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

function ButtonAppBar({classes, location: {pathname}}) {
    const [showDrawer, setShowDrawer] = useState(false);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        onClick={() => setShowDrawer(true)}
                        color="inherit"
                        aria-label="Menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        App Beleza
                    </Typography>
                    {Meteor.userId() ? (
                        <BarAvatar/>
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
            <Sidebar showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
        </div>
    );
}

export const Navbar = compose(
    withRouter,
    withStyles(styles)
)(ButtonAppBar);