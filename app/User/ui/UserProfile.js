import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar } from './Avatar';
import { PersonalData } from './PersonalData';
import { AddressFields } from './AddressFields';
import { Loading } from '../../../infra/components/Loading';

export const Profile = ({ userData: { user, loading } }) => {
  const { address = {} } = user || {};

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
        <Grid item>
          <Avatar email={user.email} name={user.name} />
        </Grid>

        <Grid item>
          <PersonalData user={user} />
        </Grid>

        <Grid item>
          <AddressFields address={address} />
        </Grid>
      </Grid>
    </div>
  );
};
