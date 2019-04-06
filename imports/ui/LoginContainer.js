import { Meteor } from 'meteor/meteor';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import { RouterPaths } from '../routes/Routes';
import { Login } from './Login';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  flex: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
  lockIcon: {
    marginRight: theme.spacing.unit,
  }
});

export const LoginContainer = compose(
  withRouter,
  withApollo,
  withStyles(styles),
  withHandlers({
    onLogin: ({ history }) => (email, password) => {
      Meteor.loginWithPassword(email, password, e => {
        if (!e) {
          history.replace();
          //history.push(`/${RouterPaths.USER_PROFILE}`);
          history.push('/');
          return;
        }

        if (e.error === 403) {
          if (e.reason.includes('password')) {
            // eslint-disable-next-line no-alert
            alert('Senha inválida.');
          } else if (e.reason.includes('User not found')) {
            // eslint-disable-next-line no-alert
            alert('Usuário não encontrado');
          }
        } else {
          throw new Error(e.reason);
        }
      });
    },
    createAccount: ({ history }) => (
        name,
        email,
        password
    ) => {
      Accounts.createUser(
          {
            email,
            password,
            profile: { name },
          },

          e => {
            if (!e) {
              history.replace();
              history.push('/');
              return;
            }

            if (e.error === 403) {
              // eslint-disable-next-line no-alert
              alert('Usuário já existe !');
            }
          }
      );
    },
  })
)(Login);
