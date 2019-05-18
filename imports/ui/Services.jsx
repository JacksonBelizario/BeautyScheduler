import React, { Fragment, useState } from 'react';
import { Grid, Paper, IconButton, InputBase, Link } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Loading from './components/Loading';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { servicesQuery, removeServiceMutation, createServiceMutation, editServiceMutation } from '../api/Services';

import {
    PlusCircle as PlusCircleIcon,
    Edit2 as EditIcon,
    Trash as RemoveIcon,
    Loader as LoaderIcon
} from 'react-feather';

import faker from 'faker';

faker.locale = "pt_BR";


const elements = new Array(20).fill(null).map(id => ({
    id,
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    address: faker.address.streetName(),
}))


const styles = theme => ({
    box: {
        backgroundColor: '#fff',
        boxShadow: theme.boxShadow,
        height: 'calc(100vh - 120px)'
    },
    appSidebar: {
        height: '100%',
        borderRight: '1px solid #eee',
    },
    appDetails: {
        height: '100%',
        padding: '20px 25px',
    },
    spacing: {
        padding: '20px 25px',
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #eee',
        borderRadius: '24px',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    add: {
        color: theme.palette.primary.main,
    },
    listContainer: {
        height: '86%',
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    actions: {
        height: '100%',
        marginTop: 4,
        marginRight: 10,
    },
    edit: {
        color: theme.palette.info.main
    },
    remove: {
        color: theme.palette.danger.main
    },
    card: {
    },
    cardMedia: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardActions: {
      display: 'flex',
    },
    cardExpand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    cardExpandOpen: {
      transform: 'rotate(180deg)',
    },
    cardAvatar: {
        margin: 10,
        width: 100,
        height: 100,
    },
});

const ServiceComponent = ({open, setOpen, createService, editService, dispatch, initial}) => {

    const _id = initial._id;
    const [name, setName] = useState(initial.name);
    const [duration, setDuration] = useState(initial.duration);
  
    function handleClose() {
        setOpen(false);
    }
  
    async function handleSave() {
        if (_id) {
            console.log('handleSave', {_id});
            try {
                const { data } = await editService({
                  variables: {
                    id: _id,
                    service: {
                      name,
                      duration
                    },
                  },
                });
        
                if (data.editService) {
                    console.log({editService: data});
                  dispatch({
                    type: 'SNACKBAR',
                    show: true,
                    message: 'Informações Editadas com sucesso!'
                  });
                } else {
                  dispatch({
                    type: 'SNACKBAR',
                    show: true,
                    message: 'Ops, não foi possivel salvar suas alterações!'
                  });
                }
              } catch (e) {
                console.log('erro', e);
              }
        } else {
            try {
                const { data } = await createService({
                  variables: {
                    service: {
                      name,
                      duration
                    },
                  },
                });
        
                if (data.createService) {
                    console.log({createService: data});
                  dispatch({
                    type: 'SNACKBAR',
                    show: true,
                    message: 'Informações Inseridas com sucesso!'
                  });
                } else {
                  dispatch({
                    type: 'SNACKBAR',
                    show: true,
                    message: 'Ops, não foi possivel salvar suas alterações!'
                  });
                }
              } catch (e) {
                console.log('erro', e);
              }
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{_id ? 'Editar' : 'Novo'} Serviço</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    name="nome"
                    margin="dense"
                    label="Nome"
                    value={name}
                    type="text"
                    onChange={({ target: { value } }) => {
                        setName(value);
                    }}
                    fullWidth
                />
                <TextField
                    autoFocus
                    name="duration"
                    margin="dense"
                    label="Duração"
                    value={duration}
                    type="number"
                    onChange={({ target: { value } }) => {
                        setDuration(value);
                    }}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>)
}

const Service = compose(
    createServiceMutation,
    editServiceMutation,
    connect(state => ({
        showSnackBar: {
            message: state.showSnackBar.message,
            show: state.showSnackBar.show,
        }
  })),
)(ServiceComponent);

    
const generateColor = () => {
    return '#' +  Math.random().toString(16).substr(-6);
}

const Services = ({classes, servicesData: { services, loading }, removeService}) => {

    if (loading) {
      return <Loading />;
    }

    const [active, setActive] = useState(-1);
    const [initial, setInitial] = useState({_id: 0, name: '', duration: 0});
    const [open, setOpen] = useState(false);

    const remove = async (id) => {
        console.log('remove', id);
        try {
            const { data } = await removeService({ variables: { id } } );
            if (data.removeService) {
                console.log(data);
            }
        } catch(erro) {
            console.log('erro', erro);
        }
    }

    const addService = () => {
        setInitial({_id: 0, name: '', duration: 0});
        setOpen(true);
    }

    const editService = (data) => {
        setInitial(data);
        setOpen(true);
    }

    return (
        <Grid container className={classes.box}>
            {
                open
                ? <Service open={open} setOpen={setOpen} initial={initial} />
                : ''
            }
            <Grid item xs={12} sm={5} className={classes.appSidebar}>
                <Grid container className={classes.spacing} alignItems="center">
                    <Grid item xs>
                        <Paper className={classes.search} elevation={0}>
                            <InputBase className={classes.input} placeholder="Procurar" />
                            <IconButton className={classes.iconButton} aria-label="Procurar">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <IconButton className={classes.iconButton} aria-label="Adicionar" onClick={() => addService()}>
                            <PlusCircleIcon className={classes.add} />
                        </IconButton>
                    </Grid>
                </Grid>
                <div className={classes.listContainer}>
                    <PerfectScrollbar>
                        <List className={classes.list}>
                        {
                            services.map((el, index) => (
                                <ListItem
                                    button
                                    onClick={() => setActive(index)}
                                    alignItems="flex-start"
                                    key={index}>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: generateColor()}} >{el.name && el.name.split(' ').slice(0, 2).map(letters => letters[0]).join('')}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={el.name}
                                        secondary={
                                            <Fragment>
                                                Duração: {el.duration}
                                            </Fragment>
                                        }
                                    />
                                    <ListItemSecondaryAction className={classes.actions}>
                                        <Grid container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                            spacing={8} >
                                            <Grid item>
                                                <Link
                                                    aria-label="Editar"
                                                    component="button"
                                                    className={classes.edit} 
                                                    onClick={() => editService(el)}>
                                                    <EditIcon size={16} />
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link
                                                    aria-label="Remover"
                                                    component="button"
                                                    className={classes.remove}
                                                    onClick={() => remove(el._id)}>
                                                    <RemoveIcon size={16} />
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                        </List>
                    </PerfectScrollbar>
                </div>
            </Grid>
            <Grid item xs={12} sm={7}>
            {
                (active > -1) ? (
                    <Card className={classes.card} elevation={0}>
                        <CardHeader
                            className={classes.cardHeader}
                            avatar={
                                <Avatar
                                    className={classes.cardAvatar}
                                    alt={elements[active].name}
                                    src={elements[active].avatar} />
                            }
                            action={
                            <IconButton className={classes.edit}>
                                <EditIcon />
                            </IconButton>
                            }
                            title={
                                <Typography variant="h5">
                                    {elements[active].name}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Grid container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                spacing={16} >
                                <Grid item container spacing={16}>
                                    <Grid item xs={4} md={3}><b>Nome:</b></Grid>
                                    <Grid item xs={8} md={9}>{elements[active].name}</Grid>
                                </Grid>
                                <Grid item container spacing={16}>
                                    <Grid item xs={4} md={3}><b>E-mail:</b></Grid>
                                    <Grid item xs={8} md={9}>{elements[active].email}</Grid>
                                </Grid>
                                <Grid item container spacing={16}>
                                    <Grid item xs={4} md={3}><b>Telefone:</b></Grid>
                                    <Grid item xs={8} md={9}>{elements[active].phone}</Grid>
                                </Grid>
                                <Grid item container spacing={16}>
                                    <Grid item xs={4} md={3}><b>Endereço:</b></Grid>
                                    <Grid item xs={8} md={9}>{elements[active].address}</Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                        </Card>
                    )
                : (
                    <Grid container
                        className={classes.appDetails}
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={24} >
                        <Grid item>
                            <LoaderIcon size={124}  />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                Selecione um contato para visualizar mais detalhes
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }
            </Grid>
        </Grid>
    )
}

export default compose(
    servicesQuery,
    removeServiceMutation,
    withStyles(styles)
)(Services);