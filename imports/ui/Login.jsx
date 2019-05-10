import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import {withApollo} from 'react-apollo';
import {Link, withRouter} from 'react-router-dom';
import {compose, withHandlers} from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {FormControlLabel, Switch, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {LockOpenOutlined, LockOutlined} from '@material-ui/icons';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import { RouterPaths } from '../routes';

const Login = ({onLogin, createAccount, classes, dispatch}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [accept, setAccept] = useState(false);

    const handleSubmit = async () => {
        if (isLogin) {
            onLogin(email, password);
        } else {
            if (!accept) {
                return dispatch({
                    type: 'SNACKBAR',
                    show: true,
                    message: 'Você deve aceitar os Termos de Uso'
                });
            }
            createAccount(name, email, password);
        }
    };

    return (

        <main className={classes.main}>
            <CssBaseline/>
            <div className={classes.flex}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    App Beleza
                </Typography>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    className={classes.form}>
                    {
                        !isLogin ? (
                            <TextValidator
                                fullWidth
                                label="Nome"
                                onChange={({target: {value}}) => {
                                    setName(value);
                                }}
                                name="nome"
                                value={name}
                                validators={['required']}
                                errorMessages={['Campo obrigatório']}
                            />
                        ) : ''
                    }
                    <TextValidator
                        fullWidth
                        label="Email"
                        onChange={({target: {value}}) => {
                            setEmail(value);
                        }}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Campo obrigatório', 'email inválido']}
                    />
                    <TextValidator
                        fullWidth
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={({target: {value}}) => {
                            setPassword(value);
                        }}
                        validators={['required']}
                        errorMessages={['Campo é obrigatório']}
                    />
                    {
                        !isLogin
                            ? (<FormControlLabel control={
                                <Switch color="primary" checked={accept} onChange={({target: {checked}}) => {
                                    setAccept(checked)
                                }}/>}
                                                 label={<div>Aceito os <Link to='#'>Termos de Uso</Link></div>}/>)
                            : ''
                    }
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        <LockOpenOutlined className={classes.lockIcon}/>
                        {isLogin ? 'Entrar' : 'Registrar'}
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        className={classes.button}
                        onClick={() => {
                            setIsLogin(!isLogin)
                        }}
                    >
                        {
                            isLogin
                                ? 'Se ainda não é cadastrado, clique aqui'
                                : 'Se já é cadastrado, clique aqui'
                        }
                    </Button>
                </ValidatorForm>
            </div>
        </main>
    );
};

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
    },
});

export default compose(
    withRouter,
    withApollo,
    withStyles(styles),
    connect(state => ({
        showSnackBar: {
            message: state.showSnackBar.message,
            show: state.showSnackBar.show,
        }
    })),
    withHandlers({
        onLogin: ({history, dispatch}) => (email, password) => {
            Meteor.loginWithPassword(email, password, e => {
                if (!e) {
                    history.replace();
                    //history.push(RouterPaths.USER_PROFILE);
                    history.push(RouterPaths.ROOT);
                    return;
                }

                if (e.error === 403) {
                    if (e.reason.includes('password')) {
                        dispatch({
                            type: 'SNACKBAR',
                            show: true,
                            message: 'Senha inválida'
                        });
                    } else if (e.reason.includes('User not found')) {
                        dispatch({
                            type: 'SNACKBAR',
                            show: true,
                            message: 'Usuário não encontrado'
                        });
                    }
                } else {
                    throw new Error(e.reason);
                }
            });
        },
        createAccount: ({history, dispatch}) => (
            name,
            email,
            password
        ) => {
            Accounts.createUser(
                {
                    email,
                    password,
                    profile: {name},
                },

                e => {
                    if (!e) {
                        history.replace();
                        history.push(RouterPaths.ROOT);
                        return;
                    }

                    if (e.error === 403) {
                        dispatch({
                            type: 'SNACKBAR',
                            show: true,
                            message: 'Usuário já existe!'
                        });
                    }
                }
            );
        },
    })
)(Login);
