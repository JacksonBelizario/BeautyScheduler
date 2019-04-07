import React, {useReducer, useState} from 'react';
import {Link} from 'react-router-dom';
import {Switch, Typography, FormControlLabel, Snackbar, Slide, IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {RouterPaths} from '../routes/Routes';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {LockOutlined, LockOpenOutlined, Close as CloseIcon} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// import {
//   fieldEmail,
//   fieldPassword,
//   reducer,
// } from '../../../../infra/components/typeFields';
//
// const initialState = {
//   fieldPassword,
//   fieldEmail,
// };

export const Login = ({onLogin, createAccount, classes}) => {
    // const [stateLogin, dispatch] = useReducer(reducer, initialState);
    //
    // const { value: password = '', ...propsPassword } = stateLogin.fieldPassword;
    // const { value: email = '', ...propsEmail } = stateLogin.fieldEmail;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [accept, setAccept] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);

    const handleSubmit = () => {
        if (isLogin) {
            onLogin(email, password)
        } else {
            if (!accept) {
                return setShowSnackBar(true);
            }
            createAccount(name, email, password)
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
                                errorMessages={['Campo é obrigatório']}
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
                        errorMessages={['Campo é obrigatório', 'email inválido']}
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
                <Snackbar
                    open={showSnackBar}
                    TransitionComponent={(props) => <Slide {...props} direction="up"/>}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Você deve aceitar os Termos de Uso</span>}
                    action={<IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => {
                            setShowSnackBar(false)
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>}
                />
            </div>
        </main>
    );
};
