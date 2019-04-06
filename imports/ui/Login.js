import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import { LoginSocialMedia } from '../../../../infra/components/LoginSocialMedia';
// import { Row } from '../../singUp/ui/Utils';
import { RouterPaths } from '../routes/Routes';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LockOutlined, LockOpenOutlined } from '@material-ui/icons';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

export const Login = ({ onLogin, createAccount, classes }) => {
  // const [stateLogin, dispatch] = useReducer(reducer, initialState);
  //
  // const { value: password = '', ...propsPassword } = stateLogin.fieldPassword;
  // const { value: email = '', ...propsEmail } = stateLogin.fieldEmail;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  return (

      <main className={classes.main}>
        <CssBaseline />
        <div className={classes.flex}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
              App Beleza
          </Typography>
          <ValidatorForm
              onSubmit={() => { isLogin ? onLogin(email, password) : createAccount(name, email, password) }}
              className={classes.form} >
              {
                  !isLogin ? (
                      <TextValidator
                          fullWidth
                          label="Nome"
                          onChange={({ target: { value: newValue } }) => {
                              setName(newValue);
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
                  onChange={({ target: { value: newValue } }) => {
                      setEmail(newValue);
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
                  onChange={({ target: { value: newValue } }) => {
                      setPassword(newValue);
                  }}
                  validators={['required']}
                  errorMessages={['Campo é obrigatório']}
              />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
            >
                <LockOpenOutlined className={classes.lockIcon} />
                { isLogin ? 'Entrar' : 'Registrar' }
            </Button>
              <Button
                  type="button"
                  variant="outlined"
                  className={classes.button}
                  onClick={() => { setIsLogin(!isLogin) }}
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
