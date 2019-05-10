import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Route, Switch } from 'react-router-dom';
import Sample from '../ui/Sample.jsx';
import Login from '../ui/Login.jsx';
import Calendar from '../ui/Scheduler/Calendar.jsx';
import UserProfile from '../ui/User/Profile.jsx';

export const RouterPaths = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  USER_PROFILE: '/profile',
  SERVICES: '/services',
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
            pathname: RouterPaths.LOGIN,
            state: { redirect: location.pathname },
          }}
        />
      )
    }
  />
);

export const Routes = () => (
  <Switch>
      <PrivateRoute exact path={RouterPaths.ROOT} component={Calendar} />

      <Route path={RouterPaths.LOGIN} component={Login} />

      <Route path={RouterPaths.USER_PROFILE} component={UserProfile} />

      <Route path={RouterPaths.SERVICES} component={Sample} />
  </Switch>
);
