import React from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid';
import { userQuery } from '../../api/Users.js';
import Loading from '../components/Loading'

const Profile = ({ userData }) => {
    const {user, loading} = userData;
  console.log({userData, loading});

    if (loading) {
        return <Loading />;
    }

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        spacing={8}
      >
        User Profile
      </Grid>
    </div>
  );
};


export default compose(userQuery)(Profile);