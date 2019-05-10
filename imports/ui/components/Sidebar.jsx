import React from 'react';
import {makeStyles} from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import {
    Heart as HeartIcon,
    User as UserIcon
} from 'react-feather';

import {RouterPaths} from '../../routes';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const menu = [
    {
        type: "list",
        list: [
            {
                title: 'Home',
                to: RouterPaths.ROOT,
                icon: <HeartIcon/>
            }
        ]
    },
    {
        type: "divider"
    },
    {
        type: "list",
        list: [
            {
                title: 'Perfil',
                to: RouterPaths.USER_PROFILE,
                icon: <UserIcon/>
            }
        ]
    },
];

export const Sidebar = ({showDrawer, setShowDrawer}) => {
    const classes = useStyles();

    const sideList = (
        <div className={classes.list}>
        {menu.map((item, index) => {
            if (item.type === "list") {
                return (<List key={index}>
                    {item.list.map(({title, to, icon}, index) => (
                        <ListItem button key={index} component={Link} to={to}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={title}/>
                        </ListItem>
                    ))}
                </List>);
            } else if (item.type === "divider") {
                return <Divider key={index}/>;
            }
        })}
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                open={showDrawer}
                onClose={() => {
                    setShowDrawer(false)
                }}
                onOpen={() => {
                    setShowDrawer(true)
                }}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                        setShowDrawer(false)
                    }}
                    onKeyDown={() => {
                        setShowDrawer(false)
                    }}
                >
                    {sideList}
                </div>
            </SwipeableDrawer>
        </div>
    );
};