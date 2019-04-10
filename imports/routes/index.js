import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Route, Switch } from 'react-router-dom';
import Hello from '../ui/Hello.jsx';
import Login from '../ui/Login';

export const RouterPaths = {
  ROOT: '/',
  LOGIN: 'login',
  REGISTER: 'register',
  USER_PROFILE: 'user-profile',
};

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={({ location, ...props }) =>
      Meteor.userId() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/${RouterPaths.LOGIN}`,
            state: { redirect: location.pathname },
          }}
        />
      )
    }
  />
);

export const Routes = () => (
  <Switch>
      <PrivateRoute exact path={RouterPaths.ROOT} component={Hello} />

      <Route path={`/${RouterPaths.LOGIN}`} component={Login} />
  </Switch>
);
