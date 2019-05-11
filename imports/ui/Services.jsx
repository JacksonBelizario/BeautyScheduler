import React from 'react';
import { Grid, Paper, IconButton, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {
    PlusCircle as PlusCircleIcon
} from 'react-feather';


const styles1 = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

const AlignItemsList = withStyles(styles1)((props) => {
    const { classes } = props;
    return (
      <List className={classes.root}>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    );
  });


  const styles = theme => ({
    box: {
        backgroundColor: '#fff',
        boxShadow: theme.boxShadow
    },
    appSidebar: {
        height: '100%',
        borderRight: '1px solid #eee',
    },
    spacing: {
        padding: '20px 25px',
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #eee',
        borderRadius: '24px',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    add: {
        color: theme.palette.primary.main,
    }
});

const Services = ({classes}) => {


    return (
        <Grid container className={classes.box}>
            <Grid item xs={12} sm={5} className={classes.appSidebar}>
                <Grid container spacing={16} className={classes.spacing} alignItems="center">
                    <Grid item xs>
                        <Paper className={classes.search} elevation={0}>
                            <InputBase className={classes.input} placeholder="Procurar" />
                            <IconButton className={classes.iconButton} aria-label="Procurar">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <IconButton className={classes.iconButton} aria-label="Adicionar">
                            <PlusCircleIcon className={classes.add} />
                        </IconButton>
                    </Grid>
                </Grid>
                <AlignItemsList />
            </Grid>
            <Grid item xs={12} sm={7} className={classes.spacing}>
                teste
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Services);