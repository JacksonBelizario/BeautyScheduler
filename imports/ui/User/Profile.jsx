import React, {useState, useEffect} from 'react';
import {compose, withHandlers} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import {Error as ErrorIcon, CheckCircle as CheckIcon} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { userQuery, editUser } from '../../api/Users.js';
import Loading from '../components/Loading'
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import ZipCodeInput from './components/ZipCodeInput';
import { validator } from '../../utils/validators';
import { consultarCEP } from '../../utils/cep';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
      marginTop: theme.spacing.unit * 3,
      alignSelf: 'end'
  },
  danger: {
    color: red[500],
  },
  success: {
    color: green[500],
  },
  popover: {
    margin: theme.spacing.unit * 2,
  },
});

const genders = [
  {
    value: 'm',
    label: 'Masculino',
  },
  {
    value: 'f',
    label: 'Feminino',
  },
  {
    value: 'o',
    label: 'Outro',
  },
];

const Profile = ({ classes, userData: {user, loading}, editUser }) => {

  if (loading) {
      return <Loading />;
  }

  const {profile, emails, address} = user;

  const [emailUser] = emails;
  
  const emailVerified = emailUser.verified !== "false";

  const [anchorEl, setAnchorEl] = useState(null);
  
  const [email, setEmail] = useState(emailUser.address);

  const [values, setValues] = useState({
    nome: {
      required: true,
      label: 'nome',
      value: profile.name
    },
    celular: {
      label: 'Celular',
      value: profile.phoneNumber ||  ''
    },
    dataNascimento: {
      label: 'Data de nascimento',
      value: profile.birthday ||  ''
    },
    sexo: {
      label: 'Sexo',
      value: profile.gender ||  ''
    },
    cpf: {
      required: true,
      label: 'CPF',
      value: profile.socialNumber ||  ''
    },
    cep: {
      required: true,
      label: 'CEP',
      value: profile.zipcode ||  ''
    },
    logradouro: {
      label: 'Endereço',
      value: address.street ||  ''
    },
    numero: {
      label: 'Número',
      value: address.number ||  ''
    },
    complemento: {
      label: 'Complemento',
      value: address.complement ||  ''
    },
    bairro: {
      label: 'Bairro',
      value: address.neighborhood ||  ''
    },
    localidade: {
      label: 'Cidade',
      value: address.city ||  ''
    },
    uf: {
      label: 'Estado',
      value: address.state ||  ''
    },
  });

  const onFormChange = name => value => {

    const error = validator(name, value, !!values[name].required);

    setValues({
      ...values,
      [name]: {
        ...values[name],
        value,
        error: Boolean(error),
        helperText: error,
      }
    });
  };

  const updateAddress = addresses => {
    setValues({
      ...values,
      ...Object.keys(addresses).reduce((carry, name) => {
        carry[name] = {
        ...values[name],
        value: addresses[name],
        error: null,
        helperText: null,
      }
      return carry;
      }, {})
    });
  }

  const validateAll = () => {
    const data = {
      ...Object.keys(values).reduce((carry, name) => {
        const {value} = values[name];
        const error = validator(name, value, !!values[name].required);
        carry[name] = {
        ...values[name],
        error: Boolean(error),
        helperText: error,
      }
      return carry;
      }, {})
    };
    setValues(data);
    return !Object.keys(data).filter(name => data[name].error).length;
  };

  const formData = () => Object.keys(values).reduce((carry, name) => {
    carry[name] = values[name].value;
    return carry;
  }, []);


  const handleSubmit = async () => {
    const validForm = validateAll();
    if (validForm) {
      const {
        nome, celular, cpf, dataNascimento, sexo, cep, logradouro,
        complemento, bairro, numero, localidade, uf
      } = formData();
      
      try {
        const { data } = await editUser({
          variables: {
            user: {
              profile: {
                name: nome,
                phoneNumber: celular,
                socialNumber: cpf,
                birthday: dataNascimento,
                gender: sexo
              },
              address: {
                zipcode: cep,
                street: logradouro,
                complement: complemento,
                neighborhood: bairro,
                number: numero,
                city: localidade,
                state: uf
              }
            },
          },
        });
  
        if (data.editUser) {
          // eslint-disable-next-line no-alert
          alert('Informações Alteradas com sucesso!');
        } else {
          // eslint-disable-next-line no-alert
          alert('Ops, não foi possivel salvar suas alterações!');
        }
      } catch (e) {
        console.log('erro', e);
      }
    } else {
      alert('Corrija os campos em vermelho');
    }
  };

const handleZipCode = async cep => {
  onFormChange('cep')(cep);
  const data = await consultarCEP(cep);
  data && updateAddress(data);
};

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        spacing={8}
      >
        <div>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h5" component="h3">
              Dados pessoais
            </Typography>
            <Typography component="p">
              Edite as informações do seu perfil.
            </Typography>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...values.nome}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('nome')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton className={emailVerified ? classes.success : classes.danger}
                          onClick={({currentTarget}) => {setAnchorEl(currentTarget)}}>
                            {
                              emailVerified
                              ? <CheckIcon />
                              : <ErrorIcon />
                            }
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...values.celular}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('celular')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...values.cpf}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('cpf')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...values.dataNascimento}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('dataNascimento')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...values.sexo}
                  fullWidth
                  select
                  onChange={({target: {value}}) => {
                    onFormChange('sexo')(value);
                  }}
                >
                  {genders.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h5" component="h3">
              Endereço
            </Typography>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={4}>
                <TextField
                    {...values.cep}
                    fullWidth
                    onChange={({target: {value}}) => {
                      handleZipCode(value);
                    }}
                    InputProps={{
                      inputComponent: ZipCodeInput,
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                    {...values.logradouro}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('logradouro')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                    {...values.numero}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('numero')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                    {...values.complemento}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('complemento')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                    {...values.bairro}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('bairro')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...values.localidade}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('localidade')(value);
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...values.uf}
                    fullWidth
                    onChange={({target: {value}}) => {
                      onFormChange('uf')(value);
                    }}
                />
              </Grid>
            </Grid>
          </Paper>
          <Button
              variant="contained"
              color="primary"
              onClick={() => { handleSubmit() }}
              className={classes.button}
          >
            Salvar
          </Button>
        </div>
      </Grid>
      <Popover
        id="simple-popper"
        open={(!!anchorEl)}
        anchorEl={anchorEl}
        onClose={() => { setAnchorEl(null) }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.popover}>
          Endereço de email { !emailVerified ? 'não ' : '' }verificado
        </Typography>
      </Popover>
    </div>
  );
};


export default compose(
  userQuery,
  editUser,
  withStyles(styles),
)(Profile);