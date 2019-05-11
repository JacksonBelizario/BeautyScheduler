import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, green, red, pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: { light: pink[300], main: pink[500], dark: pink[700] },
        secondary: { light: green[300], main: green[500], dark: green[700] },
        success: { light: green[300], main: green[500], dark: green[700] },
        info: { light: blueGrey[300], main: blueGrey[500], dark: blueGrey[700] },
        danger: { light: red[300], main: red[500], dark: red[700] },
    },

    typography: {
        fontFamily: 'Rubik',
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

export default theme;