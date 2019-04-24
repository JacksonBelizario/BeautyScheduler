import React from 'react';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ classes: { loading } }) => (
    <div className={loading}>
        <CircularProgress />
    </div>
);

export default withStyles({
    loading: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
})(Loading);
