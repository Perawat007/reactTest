import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CssBaseline } from '@material-ui/core';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

function CreateData(props) {
  const token = localStorage.getItem("token");
    const handleSubmit = event =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw =({
        "email": email,
        "password": password,
        "role": role,
    });

    Axios.post("http://localhost:3000/post/create",raw,{
      headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => {alert(response.data['message'])
      if (response.data['message'] === 'Create Succeed')
      {
          window.location.href ='/';
      }
    })
      .catch(error => alert('กรุณากรอกข้อมูลให้ถูกต้อง'));
    }
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = React.useState('ad');

  const { classes } = props;
  const classesStyles = useStyles();
  return (
    <div>
        <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            สร้างสมาชิก
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    <React.Fragment>
        <CssBaseline/>
        <Container maxWidth = "lg" sx ={{ p:2}}>
        <Typography variant="h6" gutterBottom component= "div">
            CreateAdmin
        </Typography>
      <form className={classesStyles.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={5}>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "Email" variant="filled" 
                fullWidth required
                onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" label= "Password" variant="filled" 
                 fullWidth required
                 onChange={(e) => setPassword(e.target.value)}/>
            </Grid>
            <Grid item xs ={12} sm={6}>
                <Button type='summit' variant="contained" color="primary">Create</Button>
            </Grid>
        </Grid>
      </form>
        </Container>
    </React.Fragment>
    </div>
    
  );
}

CreateData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateData);

