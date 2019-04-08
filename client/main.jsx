import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { DDPLink } from 'meteor/swydo:ddp-apollo';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, green, red, pink } from '@material-ui/core/colors';
import { App } from '/imports/ui/App'
import { Provider } from 'react-redux';
import { store } from '../imports/store';


const theme = createMuiTheme({
    palette: {
        primary: { light: pink[300], main: pink[500], dark: pink[700] },
        secondary: { light: green[300], main: green[500], dark: green[700] },
        danger: { light: red[300], main: red[500], dark: red[700] },
    },

    typography: {
        useNextVariants: true,
    },

    spacingField: {
        margin: '8px',
    },

    mainBackground: {
        backgroundColor: '#fafafa',
    },

    backgroundButtonFacebook: {
        backgroundColor: '#557cf2',
    },

    backgroundButtonGoogle: {
        backgroundColor: '#DE4C33',
    },
});

const client = new ApolloClient({
  link: new DDPLink(),
  cache: new InMemoryCache(),
});

Meteor.startup(() => {
  render(
      <BrowserRouter>
          <ApolloProvider client={client}>
              <MuiThemeProvider theme={theme}>
                  <Provider store={store} >
                    <App/>
                  </Provider>
              </MuiThemeProvider>
          </ApolloProvider>
      </BrowserRouter>,
      document.getElementById('app'));
});
