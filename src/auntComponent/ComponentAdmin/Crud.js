import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { CssBaseline } from '@material-ui/core';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import "./Modal.css";
import axios from '../../api/axios';


export default function Crud(data) {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const userPlay = data.data.dataLog;

  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };


  useEffect(() => {
    DataGet();
  }, [])

  const DataGet = () => {

    axios.get("/post/game", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.data.message === 'gameAll') {
          setItems(response.data.data);
        }
      })
      .catch(error => {
        console.log('error', error);
        axios.put("/post/logoutMember", { memberID: userPlay.id },)
          .then(response => {
            localStorage.removeItem("token")
            window.location.href = "/";
          })
      });
  };

  const PlayGame = (linkGame) => {
    axios.post("/post/token", '', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.data.message === 'TokenOn') {
          const tokenEn = encodeURIComponent(token)
          if (linkGame !== null) {
            const link = linkGame + `?token=${tokenEn}`;
            window.open(link, "_self");
          }
        }
      })
      .catch(error => {
        console.log('error', error);
        axios.put("/post/logoutMember", { memberID: userPlay.id },)
          .then(response => {
            localStorage.removeItem("token")
            window.location.href = "/";
          })
          .catch(error => console.log('error', error));
      });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display={'flex'}>
            <Box flexGrow={1}>
              <Typography variant="h6">
                รายชื่อเกม
              </Typography>
            </Box>
          </Box>
          <div className='game-container'>
            {items.map((row) => (
              <div key={row.id} className='card'>
                <div className='card-image'>
                  <img src={row.img} alt=''  style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => PlayGame(row.linkgame)} 
                     />
                </div>
                <div className='card-content'>
                  <span className='card-title'></span>
                  <p className='card-font'>{row.namegame}</p>
                </div>
                <div>
                  <br/>
                  <button
                    style={{
                      padding: '13px 60px',
                      backgroundColor: isPressed ? '#FF6633' : '#FF6633',
                      color: '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      transition: 'padding 0.2s, background-color 0.2s',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onClick={() => PlayGame(row.linkgame)} 
                  >
                    เล่นเกม
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  )
}