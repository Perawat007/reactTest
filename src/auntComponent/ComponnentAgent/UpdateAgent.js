import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CssBaseline } from '@material-ui/core';
import { Container, Grid, TextField } from '@mui/material';
import Axios from 'axios';

const currencies = [
    {
      value: 'true',
      label: 'true',
    },
    {
      value: 'false',
      label: 'false',
    }
  ];

function UpdateAgent(idAgent) {
    const token = localStorage.getItem("token");
    const [id, setID] = useState(idAgent.idAgent);
    const [username, setUsername] = useState('');
    const [active, setActive] = useState('true');

    useEffect(() =>{
       Axios.get("http://localhost:3000/post/agent/"+id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response)
        {
            setUsername(response.data[0].Username)
        }})
        .catch(error => {
            console.log('error', error);
            localStorage.removeItem("token")
            window.location.href ="/";
          });    
    },[id])

    const handleSubmit = event =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = ({
        "username": username,
        "active" : active
      });
      
      Axios.put("http://localhost:3000/post/updateAgent/"+id,raw,{
        headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then(response => {alert(response.data['message'])
        if (response.data['status'] === 'Update Succeed')
        {
            window.location.reload();
        }})
        .catch(error => {
            console.log('error', error);
            localStorage.removeItem("token")
            window.location.href ="/";
          });    
      }

      const handleChange = (event) => {
        setActive(event.target.value);
      }
    
  return (
    <React.Fragment>
        <CssBaseline/>
        <Container maxWidth = "lg" sx ={{ p:4}}>
        <Typography variant="h6" gutterBottom component= "div">
            กรอกUserNameใหม่
        </Typography>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
            <Grid item xs ={12}>
                <TextField id = "standard-basic" variant='outlined' 
                fullWidth required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                />
            </Grid>

            <Grid item xs ={12} sm={6}>
                <TextField
                  id="filled-select-currency-native"
                  select
                  onChange={handleChange}
                  SelectProps={{
                  native: true,
                  }}
                  helperText="Please select your active"
                  variant="filled">
                  {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                  </option>
              ))}
                </TextField>
                <Grid item xs ={12} sm={6}>
                <Button type='summit' variant="contained" color="primary">Update</Button>
                </Grid>
            </Grid>
        </Grid>
    </form>
        </Container>
    </React.Fragment> 
  );
}
export default UpdateAgent;

