import React, { useState } from 'react';
import './App.css';
import LoginBar from './auntComponent/ComponentAdmin/Login';
import Profile from './auntComponent/Profile';
import { Route, Routes, Link } from 'react-router-dom';
import axios from './api/axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([])
  
  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<LoginBar />} />
        <Route path="/login" element={<LoginBar />} />
        <Route path="/login/admin" element={<LoginBar />} />
        <Route path="/profile" element={<LoginBar />} />
      </Routes>
    );
  }

  if (token) {
    if (data.length === 0) {
      axios.post("/post/token", '', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setData(response.data.data);
        })
        .catch(error => {
          localStorage.removeItem("token")
          window.location.href = "/";
          console.log('error', error)
        }
        );
    }
  }

  const handleLogout = () => {
    axios.put("/post/logoutMember", { memberID: data.id },)
      .then(response => {
        localStorage.removeItem("token")
        window.location.href = "/";
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className='textbar'>
                สวัสดีคุณ...{data.username}     ตอนนี้คุณมี Credit...{data.credit}
              </div>
            </Typography>
            <Button onClick={() => handleLogout()} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Profile dataLog={data} />} />
        <Route path="/profile" element={<Profile dataLog={data} />} />
        <Route path="/profile/dataAdmin" element={<Profile dataLog={data} />} />
      </Routes>
    </div>
  );

}

export default App;
