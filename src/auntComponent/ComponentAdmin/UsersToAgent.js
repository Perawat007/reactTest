import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { CssBaseline } from '@material-ui/core';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import { Container, Grid, TextField } from '@mui/material';
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import "./Modal.css";
import CreateUser from '../ComponentUsers/CreateUser';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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

function UsersToAgent(id){
    const [items, setItems] = useState([]);
    const users = [];
    const token = localStorage.getItem("token");

    const [username, setUsername] = useState('');
    const [active, setActive] = useState('true');
    const [idUser, setIdUser] = useState();

    useEffect(()=> {
        DataGet();
    },[])

    const DataGet = () =>{
        Axios.get("http://localhost:5000/post/user",{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((response) => {
            if(response.data.status === 'getDataUser')
            {
                for (let i = 0; i < response.data.allPosts.length; i++)
                {
                    if (response.data.allPosts[i].IDCreate === id.idAgent)
                    {
                        users.push(response.data.allPosts[i])
                    }
                    if (i === response.data.allPosts.length-1){
                        handleClick();
                    }
                }
            }
          })
        .catch(error => {
          console.log('error', error);
        });    
    };
    
    const DeleteData = id => {
          Axios.delete("http://localhost:3000/post/delete/"+id,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {alert(response.data['message'])
                if (response.data['status'] === "Delete OK")
                {
                    window.location.href ='/';
                }})
            .catch(error => console.log('error', error));
    }

    const dataEdit = event =>{
      event.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = ({
      "username": username,
      "active" : active
    });
    Axios.put("http://localhost:5000/post/updateUser/"+idUser,raw,{
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

    const handleClick = () => {
        setItems(users);
    };

    const [createUser, setCreate] = useState(false);
    const agentCreate = () => {
      setCreate(!createUser);
    };

    const [editUser, setEditUser] = useState(false);
    const showEditUser = (username, id) => {
      setEditUser(!editUser);
      setUsername(username);
      setIdUser(id);
    };

    return(
      <>
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth = "lg" sx ={{ p:2}}>
                <Paper sx ={{ p:2}}>
                <Box display={'flex'}>
                <Box flexGrow={1}>
                <Typography variant="h6" gutterBottom component= "div">
                    รายชื่อUsers
                </Typography>
                </Box>
                <Box>
                <Button variant="contained" color="primary" onClick={() => agentCreate()}>สร้างUser</Button>
                </Box>
                </Box>
                <TableContainer component={Paper}>
        <Table className="ID" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell >Username</StyledTableCell>
            <StyledTableCell >Active</StyledTableCell>
            <StyledTableCell >Balance</StyledTableCell>
            <StyledTableCell >IdCreate</StyledTableCell>
            <StyledTableCell >RoleCreate</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell >{row.ID}</StyledTableCell>
              <StyledTableCell >{row.Username}</StyledTableCell>
              <StyledTableCell >{row.Active}</StyledTableCell>
              <StyledTableCell >{row.Balance}</StyledTableCell>
              <StyledTableCell >{row.IDCreate}</StyledTableCell>
              <StyledTableCell >{row.RoleCreate}</StyledTableCell>

              <StyledTableCell >
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button onClick={() => showEditUser(row.Username ,row.ID)}>แก้ไข</Button>
                    </ButtonGroup>
            </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>

        {createUser && (
          <div className="modal">
            <div className="modal-contentUser">
              <CreateUser data = {[id.idAgent, false]}/>
              <button className="close-modalUser" onClick={() => agentCreate()}>
                CLOSE
              </button>
            </div>
          </div>
        )}

      {editUser && (
        <div className="modal">
          <div className="modal-contentUser">
          <form onSubmit={dataEdit}>
        <Grid container spacing={5}>
            <Grid item xs ={12}> 
            <TextField id = "standard-basic" variant='outlined' 
                fullWidth required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            ></TextField>
            </Grid>
            <Grid item xs ={12} sm={6}>
                <TextField
                  id="filled-select-currency-native"
                  select
                  onChange={(event) => setActive(event.target.value)}
                  SelectProps={{
                  native: true,
                  }}
                  helperText="Please select your currency"
                  variant="filled">
                  {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                  </option>
              ))}
                </TextField>
            </Grid>
            </Grid>
            <Button type='summit' variant="contained" color="primary">แก้ไขCredit</Button>
        </form>
            <button className="close-modalUser" onClick={() => showEditUser()}>
              CLOSE
            </button>
          </div>
        </div>
      )}
        </>
    )
}

export default UsersToAgent;