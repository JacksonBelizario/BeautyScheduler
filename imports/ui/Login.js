import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FormControlLabel, IconButton, Slide, Snackbar, Switch, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Close as CloseIcon, LockOpenOutlined, LockOutlined} from '@material-ui/icons';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

export const Login = ({onLogin, createAccount, classes, showSnackBar, dispatch}) => {
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
                    open={showSnackBar.show}
                    TransitionComponent={(props) => <Slide {...props} direction="up"/>}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{showSnackBar.message}</span>}
                    action={<IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => {
                            dispatch({
                                type: 'SNACKBAR',
                                show: false,
                                message: ''
                            })
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>}
                />
            </div>
        </main>
    );
};
