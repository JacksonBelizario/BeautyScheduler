import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
  },
});


export default withStyles(styles)(
    ({classes, children}) => (
        <Paper className={classes.paper} elevation={1}>{children}</Paper>
    )
);