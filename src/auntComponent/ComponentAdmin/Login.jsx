import React, { useRef, useState, useEffect, useContext } from "react";
import "../Login.css";
import Axios from "axios";
import axios from "../../api/axios";
import nft from "./nft.jpg";
const LoginBar = () => {
  const [username, setUser] = useState("member001");
  const [password, setPwd] = useState("123456789");
  const [ipAddress, setIp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPopupA, setShowPopup] = useState(false);

  let browserName = "Unknown";
  useEffect(() => {
    handleSubmit();
    Axios.get("https://ipapi.co/json/")
      .then((response) => {
        setIp(response.data.ip);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [username, password]);

  const [popupStyle, showPopup] = useState("hide");


  const handleSubmit = async () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);

    //e.preventDefault();
    try {
      const response = await axios.post("login/member", {
        username: 'member001',
        password: '123456789',
        ip_address: ipAddress,
        browserName: browserName,
      });

      if (response.data.token !== "undefined") {
        const accessToken = response.data.token;
        await localStorage.setItem("token", accessToken);
        setUser("");
        setPwd("");
        window.location.href = "/profile";
      } else {
        console.log(response?.status.JSON);
      }
    } catch (err) {
      setShowPopup(!showPopupA);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const style = {
    color: 'red',
};

  const togglePopup = () => {
    setShowPopup(!showPopupA);
  };

  /* return (
        <div className="full-page">
        <div className="navbar">
            <h1> Login </h1>
        </div>
        <div className="form-box">
        <form id='login' className='input-group-login' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
                <input
                type="text"
                className ='input-field'
                id="username"
                value={username}
                placeholder='username'
                onChange={(e) => setUser(e.target.value)}
                autoComplete="off"
                required
            />

            <label htmlFor="password">Password:</label>
                <input
                type="password"
                className ='input-field'
                id="password"
                value={password}
                placeholder='password'
                onChange={(e) => setPwd(e.target.value)}
                required
            />
            <br></br>
            <button type='submit' className='submit-btn'>Sign In</button>
        </form>
        </div>
        </div>
    )*/

  return (
    <div>
      {showPopupA && (
        <div className="overlay">
          <div className="modalContainer">
            <img src={nft} alt="/" />
            <div className="modalRight">
              <div className="content">
                <p style={style}>Username หรือ Password ผิด</p>
                <br/>
                <h3>กรุณากรอก</h3>
                <h3>username และ Passwordใหม่</h3>
              </div>
              <div className="btnContainer">
                <button className="btnPrimary" onClick={togglePopup}>
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="login_form_container">
        <div className="login_form">
          <h2>Login</h2>

          <div className="input_group">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              className="input_text"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="input_group">
            <i className="fa fa-unlock-alt"></i>
            <input
              type="password"
              placeholder="Password"
              className="input_text"
              value={password}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>
          <div className="button_group" id="login_button">
            <a onClick={handleSubmit}>Submit</a>
          </div>
          <div className="fotter"></div>
        </div>
      </div>
    </div>
  );
};
export default LoginBar;
