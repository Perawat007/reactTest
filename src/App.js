import React, {useState} from 'react';
import './App.css';
import LoginBar from './auntComponent/ComponentAdmin/Login';
import LoginBarAgent from './auntComponent/ComponnentAgent/LoginAgent';
import Profile from './auntComponent/Profile';
import CreateData from './auntComponent/ComponentAdmin/CreateData';
import DataUpdate from './auntComponent/ComponentAdmin/DataUpdate';
import DataAgent from './auntComponent/ComponentAdmin/DataAgent';
import DataUsers from './auntComponent/ComponentUsers/DataUsers';
import { Route, Routes, useLocation } from 'react-router-dom';

import Sidebar from './Component/Sidebar';
import SidebarAgent from './Component/SidebarAgent';
import Dashboard from './Dashboard/dashboard'
import ProfileAgent from './auntComponent/ComponnentAgent/ProfileAgent';
import UsersToAgent from './auntComponent/ComponentAdmin/UsersToAgent';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './auntComponent/Profile.css';
import Axios from 'axios';

function App() {
  const token = localStorage.getItem("token");
  const [agent, setagent] = useState(false);
  const [admin, setadmin] = useState(false);

  const [idAgent, setAgentID] = useState();
  if (!token)
  {
    return (
      <div>
        <Routes>
              <Route path="/" element={<LoginBar/>}/>
              <Route path="/login" element={<LoginBar/>}/>
              <Route path="/login/admin" element={<LoginBar/>}/>
              <Route path="/login/agent" element={<LoginBarAgent/>}/>
              <Route path="/profile" element={<LoginBar/>}/>
        </Routes>
      </div>
    );
  }

  if (token)
  {
    Axios.post("http://54.254.200.112:5000/post/token",'',{
      headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => {
        if (response.data.role === 'ag')
        {
            setagent(true);
            setadmin(false);
            setAgentID(response.data.userId);
        }
        if (response.data.role === 'ad')
        {
            setadmin(true);
            setagent(false);
        }
      })
      .catch(error => console.log('error', error));
    }
  
  const handleLogout =() =>{
    localStorage.removeItem("token")
    window.location.href ="/";
  }
  
  return(
    <div>
      {admin && (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Sidebar/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className='textbar'>
                BACKOFFICE
              </div>
            </Typography>
            <Button onClick={() => handleLogout()} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    )}

      {agent && (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <SidebarAgent/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className='textbar'>
                BACKOFFICE
              </div>
            </Typography>
            <Button onClick={() => handleLogout()} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    )}
    <div>
      <Routes>
          <Route path="/" element={<Profile/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profileAgent" element={<ProfileAgent/>}/>
          <Route path="/create" element={<CreateData/>}/>
          <Route path="/profile/dataAdmin" element={<Profile/>}/>
          <Route path="/profile/dataAgent" element={<DataAgent/>}/>
          <Route path="/profile/dataUsers" element={<DataUsers/>}/>
          <Route path="/profileAgent/dataUsers" element={<UsersToAgent idAgent = {idAgent}/>}/>
          <Route path="/profileAgent/dataAgent" element={<DataUsers/>}/>
          <Route path="/update/:id" element={<DataUpdate/>}/>
        </Routes>
  </div>
  </div>
);
}

export default App;
