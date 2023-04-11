import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CssBaseline } from '@material-ui/core';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function CreateUser(data) {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState('true');
  const [balance, setbalance] = useState(0);
  const [idCreate, setIdCreate] = useState(data.data[0]);
  const [roleCreate, setroleCreate] = useState('ag');
  const [createUser, setCreate] = useState(data.data[1]);

    const handleSubmit = event =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw =({
        "username": username,
        "password": password,
        "active" : active,
        "balance" : balance,
        "idCreate" : idCreate,
        "roleCreate" : roleCreate,
    });

    Axios.post("http://localhost:5000/post/user",raw,{
      headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => {alert(response.data['message'])
      if (response.data['message'] === 'Create Succeed')
      {
          window.location.reload();
      }})
      .catch(error => console.log('error', error));
    }

  const classesStyles = useStyles();
  return (
    <>
    <div>
    <React.Fragment>
        <CssBaseline/>
        <Container maxWidth = "lg" sx ={{ p:2}}>
        <Typography variant="h6" gutterBottom component= "div">
            CreateUser
        </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={6}>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "Username" variant="filled" 
                fullWidth required
                onChange={(e) => setUsername(e.target.value)}
                />
            </Grid>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "Password" variant="filled" 
                 fullWidth required
                 onChange={(e) => setPassword(e.target.value)}/>
            </Grid>
            {createUser && (
            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "IdCreate" variant="filled" 
                 onChange={(e) => setIdCreate(e.target.value)}/>
            </Grid>
        )}
            <Grid item xs ={12} sm={6}>
                <Button type='summit' variant="contained" color="primary" fullWidth required >สร้างUser</Button>
            </Grid>
        </Grid>
      </form>
        </Container>
    </React.Fragment>
    </div>
    </>
  );
}

export default CreateUser;