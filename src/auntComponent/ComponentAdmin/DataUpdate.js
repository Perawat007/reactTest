import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { CssBaseline } from '@material-ui/core';
import { Container, Grid, TextField } from '@mui/material';
import Link from '@mui/material/Link';
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

function DataUpdate(props) {
    const token = localStorage.getItem("token");
    const [id ,setId] = useState(props.data[1]);
    const [email, setEmail] = useState(props.data[0]);

    const handleSubmit = event =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = ({
        "email": email
      });

      Axios.put("http://localhost:5000/post/update/"+id,raw,{
        headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then(response => {alert(response.data['message'])
        if (response.data['status'] === 'Update Succeed')
        {
            window.location.reload();
        }})
        .catch(error => console.log('error', error));
      }

  const { classes } = props;
  return (
    <div>
        <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            แก้ไขข้อมูลAdmin
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    <React.Fragment>
        <CssBaseline/>
        <Container maxWidth = "lg" sx ={{ p:4}}>
        <Typography variant="h6" gutterBottom component= "div">
            แก้ไขข้อมูล
        </Typography>
    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={2}>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" variant='outlined' 
                fullWidth required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
            </Grid>
            <Grid item xs ={12} sm={6}>
                <Button type='summit' variant="contained" color="primary">Update</Button>
            </Grid>
        </Grid>
    </form>
        </Container>
    </React.Fragment>
    </div>
    
  );
}

DataUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataUpdate);

