import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CssBaseline } from '@material-ui/core';
import { Container, Grid, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function CreateAgent() {
  const token = localStorage.getItem("token");
    const handleSubmit = event =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw =({
        "role": role,
        "username": username,
        "password": password,
        "active" : active,
        "credit" : credit,
        "adminID" : adminID
    });

    Axios.post("http://localhost:3000/post/agent",raw,{
      headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => {alert(response.data['message'])
      if (response.data['message'] === 'Create Succeed')
      {
          window.location.href ='/';
      }})
      .catch(error => console.log('error', error));
    }
    
    const [role, setRole] = React.useState('ag');
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [active, setActive] = useState('true');
    const [credit, setCredit] = useState(0);
    const [adminID, setAdminID] = useState('');

    const handleChange = (event) => {
    setRole(event.target.value);
  };
    //const [active, setActive] = useState('');
  const classesStyles = useStyles();
  return (
    <div>
    <React.Fragment>
        <CssBaseline/>
        <Container maxWidth = "lg" sx ={{ p:2}}>
        <Typography variant="h6" gutterBottom component= "div">
            CreateAgent
        </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={5}>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "Username" variant="filled" 
                fullWidth required
                onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "Password" variant="filled" 
                 fullWidth required
                 onChange={(e) => setPassword(e.target.value)}/>
            </Grid>

            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "adminID" variant="filled" 
                 fullWidth required
                 onChange={(e) => setAdminID(e.target.value)}/>
            </Grid>

            <Grid item xs ={12} sm={6}>
                <Button type='summit' variant="contained" color="primary">สร้างรายชื่อ</Button>
            </Grid>
        </Grid>
      </form>
        </Container>
    </React.Fragment>
    </div>
  );
}

export default CreateAgent;