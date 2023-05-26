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
import { BsPersonFill, BsCreditCardFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
function App() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([])
  const [dataCredit, setCredit] = useState('')

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
          const formattedNumber = response.data.data.credit.toLocaleString('en-US');
          setCredit(formattedNumber)
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

  const h3Style = {
    color: 'white',
    display: 'inline-block',
    marginRight: '10px',
  };

  const Style = {
    color: 'white',
    display: 'inline-block',
    marginRight: '10px',
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#312838' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className='textbar'>
                <div style={{
                  color: '#FF6633',
                  display: 'inline-block',
                  marginRight: '10px',
                }}> <BsPersonFill /> </div>
                <div style={h3Style}>{data.username} </div>
                <div style={{display: 'inline-block'}}>
                  <div style={{
                    color: '#FF6633',
                    display: 'inline-block',
                    marginRight: '10px',
                  }}> <BsCreditCardFill /> </div>
                  <div style={Style}> {dataCredit}</div>
                </div>
              </div>
            </Typography>
            <button
              style={{
                padding: '10px 23px',
                backgroundColor: '#FF6633',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '12px',
                display: 'inline-block',
                transition: 'padding 0.2s, background-color 0.2s',
              }}
              onClick={() => handleLogout()}
            >
              <TbLogout style={{ marginRight: '2px'}} />
              Logout
            </button>
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
