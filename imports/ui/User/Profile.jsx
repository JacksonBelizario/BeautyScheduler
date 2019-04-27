import React, {useState} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {Error as ErrorIcon, CheckCircle as CheckIcon} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { userQuery, editUser } from '../../api/Users.js';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Loading from '../components/Loading'
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import axios from 'axios';
import ZipCodeInput from './ZipCodeInput';

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

  console.log({user, emailUser, editUser});
  
  const emailVerified = emailUser.verified !== "false";
  const [anchorEl, setAnchorEl] = useState(null);
  
  const [nome, setName] = useState(profile.name);
  const [email, setEmail] = useState(emailUser.address);
  const [celular, setCelular] = useState(profile.phoneNumber ||  '');
  const [cpf, setCpf] = useState(profile.socialNumber ||  '');
  const [dataNascimento, setDataNascimento] = useState(profile.birthday || '');
  const [sexo, setSexo] = useState(profile.gender || '');

  const [cep, setCep] = useState(address.zipcode || '');
  const [endereco, setEndereco] = useState(address.street || '');
  const [numero, setNumero] = useState(address.number || '');
  const [complemento, setComplemento] = useState(address.complement || '');
  const [bairro, setBairro] = useState(address.neighborhood || '');
  const [cidade, setCidade] = useState(address.city || '');
  const [estado, setEstado] = useState(address.state || '');


  const handleSubmit = async () => {
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
              street: endereco,
              complement: complemento,
              neighborhood: bairro,
              number: numero,
              city: cidade,
              state: estado
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
  };

  

export const consultarCEP = async cep => {
  setCep(cep);
	const cepNum = cep ? cep.match(/\d+/gi).join("") : "";
	if (cepNum.length != 8) return;
	try {
    const {data} = await axios.get(`//viacep.com.br/ws/${cepNum}/json/`);
    console.log({data})
		if (!data.erro) {
      setCep(data.cep);
      setEndereco(data.logradouro);
      setBairro(data.bairro);
      setComplemento(data.complemento);
      setCidade(data.localidade);
      setEstado(data.uf);
    }
	} catch (err) {
		console.log('err', err);
	}
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
        <ValidatorForm
          autoComplete="off"
          onSubmit={handleSubmit}>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h5" component="h3">
              Dados pessoais
            </Typography>
            <Typography component="p">
              Edite as informações do seu perfil.
            </Typography>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <TextValidator
                    fullWidth
                    label="Nome"
                    onChange={({target: {value}}) => {
                        setName(value);
                    }}
                    name="nome"
                    value={nome}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    disabled
                    id="email"
                    type='text'
                    value={email}
                    endAdornment={
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
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                    fullWidth
                    label="Celular"
                    type="text"
                    value={celular}
                    onChange={({target: {value}}) => {
                      setCelular(value);
                    }}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                    fullWidth
                    label="CPF"
                    type="text"
                    value={cpf}
                    onChange={({target: {value}}) => {
                      setCpf(value);
                    }}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                    fullWidth
                    label="Data de nascimento"
                    type="text"
                    value={dataNascimento}
                    onChange={({target: {value}}) => {
                      setDataNascimento(value);
                    }}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Sexo"
                  value={sexo}
                  onChange={({target: {value}}) => {
                    setSexo(value);
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
                <FormControl fullWidth>
                  <InputLabel htmlFor="cep">CEP</InputLabel>
                  <Input
                    id="cep"
                    name="cep"
                    value={cep}
                    onChange={({target: {value}}) => {
                      consultarCEP(value);
                    }}
                    inputComponent={ZipCodeInput}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextValidator
                    fullWidth
                    label="Endereço"
                    onChange={({target: {value}}) => {
                        setEndereco(value);
                    }}
                    name="endereco"
                    value={endereco}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextValidator
                    fullWidth
                    label="Número"
                    onChange={({target: {value}}) => {
                        setNumero(value);
                    }}
                    name="numero"
                    value={numero}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Complemento"
                    onChange={({target: {value}}) => {
                      setComplemento(value);
                    }}
                    value={complemento}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextValidator
                    fullWidth
                    label="Bairro"
                    onChange={({target: {value}}) => {
                        setBairro(value);
                    }}
                    name="bairro"
                    value={bairro}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                    fullWidth
                    label="Cidade"
                    onChange={({target: {value}}) => {
                        setCidade(value);
                    }}
                    name="cidade"
                    value={cidade}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                    fullWidth
                    label="Estado"
                    onChange={({target: {value}}) => {
                        setEstado(value);
                    }}
                    name="estado"
                    value={estado}
                    validators={['required']}
                    errorMessages={['Campo é obrigatório']}
                />
              </Grid>
            </Grid>
          </Paper>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
          >
            Salvar
          </Button>
        </ValidatorForm>
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
  withStyles(styles)
)(Profile);