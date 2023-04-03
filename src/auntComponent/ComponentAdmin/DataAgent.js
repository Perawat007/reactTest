import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { CssBaseline } from '@material-ui/core';
import { Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@mui/material/Link';
import Axios from 'axios';
import "./Modal.css";
import UsersToAgent from './UsersToAgent'
import CreateAgent from './CreateAgent';
import UpdateAgent from '../ComponnentAgent/UpdateAgent';

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
    value: 'withdraw',
    label: 'withdraw',
  },
  {
    value: 'deposit',
    label: 'deposit',
  }
];

export default function DataAgent(){
    const [items, setItems] = useState([]);
    const [username, setUsername] = useState('');
    const token = localStorage.getItem("token");
    const [id, setId] = useState();
    const [credit, setCredit] = useState(0);
    const [action, setAction] = useState('withdraw');

    useEffect(()=> {
        DataGet();
    },[])

    const DataGet = () =>{
        Axios.get("http://54.254.200.112:5000/post/agent",{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((response) => {
            if(response.data.status === 'getDataAgent')
            {
                setItems(response.data.allPosts);
            }
          })
        .catch(error => {
          console.log('error', error);
          /*localStorage.removeItem("token")
          window.location.href ="/";*/
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

    const saveCredit = event =>{
      event.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = ({
      "credit": credit,
      "reqAction" : action
    });
    
    Axios.post("http://54.254.200.112:5000/post/agent/credit/"+id,raw,{
      headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => {alert(response.data['message'])
      if (response.data['status'] === 'ChangeCredit Succeed')
      {
          window.location.reload();
      }})
      .catch(error => console.log('error', error));
    }

    const handleChange = (event) => {
      setAction(event.target.value);
    }
    const [boolCredit, setBoolCredit] = useState(false);
    const creditAgent = (id) => {
      setBoolCredit(!boolCredit);
      setId(id);
    };

    const [seeUsers, setModal] = useState(false);
    const toggleModal = (username,id) => {
      setModal(!seeUsers);
      setUsername(username);
      setId(id);
    };

    const [createAgent, setCreate] = useState(false);
    const agentCreate = () => {
      setCreate(!createAgent);
    };

    const [updateAgent, setAgent] = useState(false);
    const showUpdateAgent = (username, id) => {
      setAgent(!updateAgent);
      setUsername(username);
      setId(id);
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
                  รายชื่อ Agent ทั้งหมด
                </Typography>
                </Box>
                <Box>
                 <Link href='create'>
                 </Link>
                 <Button variant="contained" color="primary" onClick={() => agentCreate()}>สร้างAgent</Button>
                </Box>
                </Box>
                <TableContainer component={Paper}>
        <Table className="ID" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Role</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell >Username</StyledTableCell>
            <StyledTableCell >Active</StyledTableCell>
            <StyledTableCell >Credit</StyledTableCell>
            <StyledTableCell >AdminId</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, key) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell >{row.Role}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.ID}</StyledTableCell>
              <StyledTableCell >{row.Username}</StyledTableCell>
              <StyledTableCell >{row.Active}</StyledTableCell>
              <StyledTableCell >{row.Credit}</StyledTableCell>
              <StyledTableCell >{row.AdminID}</StyledTableCell>
              <StyledTableCell >
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button onClick={() => showUpdateAgent(row.Username, row.ID)}>แก้ไข</Button>
                        <Button onClick={() => creditAgent(row.ID)}>Credit</Button>
                        <Button onClick={() => toggleModal(row.Username, row.ID)}>ดูUsers</Button>
                        <Button onClick={() => DeleteData(row.ID)}>ลบ</Button>
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

      {updateAgent && (
        <div className="modal">
          <div onClick={showUpdateAgent} className="overlay"></div>
          <div className="modal-content">
            <h2>แก้ไขข้อมูลของ {username}</h2>
            <UpdateAgent idAgent = {id} />
            <button className="close-modal" onClick={() => showUpdateAgent('')}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {seeUsers && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>รายชื่อสมาชิกของ  {username}</h2>
            <UsersToAgent idAgent = {id} />
            <button className="close-modal" onClick={() => toggleModal('')}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {createAgent && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <CreateAgent/>
            <button className="close-modal" onClick={() => agentCreate()}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {boolCredit && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
          <form onSubmit={saveCredit}>
        <Grid container spacing={5}>
            <Grid item xs ={12}> 
                <TextField type="number" id = "standard-basic" variant="filled" name="number"
                onChange={(event) => setCredit(event.target.value)}
                ></TextField>
            </Grid>
            <Grid item xs ={12} sm={6}>
                <TextField
                  id="filled-select-currency-native"
                  select
                  value={action}
                  onChange={handleChange}
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
            <button className="close-modal" onClick={() => creditAgent()}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
    );
  }
