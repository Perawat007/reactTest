import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { CssBaseline } from '@material-ui/core';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import "./Modal.css";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import CreateData from './CreateData';
import DataUpdate from './DataUpdate';

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

export default function Crud(){
    const [items, setItems] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(()=> {
        DataGet();
    },[])

    const DataGet = () =>{
        Axios.get("http://54.254.200.112:5000/post/admin",{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then((response) => {
            if(response.data.status === 'getData')
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

    const dataEdit = id =>{
        window.location = '/update/'+id;
    }

    const [createAdmin, setCreate] = useState(false);
    const adminCreate = () => {
      setCreate(!createAdmin);
    };

    const [editAdmin, setEditAdmin] = useState(false);
    const [id, setID] = useState();
    const [username, setUsername] = useState('');
    const showEditAdmin = (id, username) => {
      setEditAdmin(!editAdmin);
      setID(id);
      setUsername(username);
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
                    รายชื่อ
                </Typography>
                </Box>
                <Box>
                <Button variant="contained" color="primary" onClick={() => adminCreate()} >สร้างAdmin</Button>
                </Box>
                </Box>
                <TableContainer component={Paper}>
        <Table className="ID" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Role</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Password</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, key) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell >{row.role}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
              <StyledTableCell >{row.email}</StyledTableCell>
              <StyledTableCell >{row.password}</StyledTableCell>
              <StyledTableCell >
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button onClick={() => showEditAdmin(row.email, row.id)}>แก้ไข</Button>
                        <Button onClick={() => DeleteData(row.id)}>ลบ</Button>
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

        {createAdmin && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <CreateData/>
            <button className="close-modal" onClick={() => adminCreate()}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {editAdmin && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <DataUpdate data ={[id, username]}/>
            <button className="close-modal" onClick={() => showEditAdmin()}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
      </>
    )
}