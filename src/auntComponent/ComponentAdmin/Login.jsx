import React, {useRef, useState, useEffect, useContext } from 'react';
import '../Login.css';
import Axios from 'axios';

const LoginBar = () => {
    //const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

   /* useEffect(() => {
        userRef.current.focus();
    }, [])*/

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    async function loginUser(credentials)
    {
        return fetch("http://54.254.200.112:5000/auth/login/admin", {
            method: 'POST',
            headers:{
                 'Content-Type': 'application/json' 
            },
            withCredentials: true,
            body: JSON.stringify(credentials)
        }).then(data => data.json());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('https://54.254.200.112:5000/auth/login/admin', {
                email,
                password
              });
            if (response.data.token !== '')
            {
                const accessToken = response.data.token;
                localStorage.setItem('token',accessToken);
                //setAuth({ email, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
                window.location.href ="/profile";
            }
            else
            {
                console.error(response?.status.JSON);
            }
           
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            //errRef.current.focus();
        }
    }

    return (
        <body>
        <div class="full-page">
        <div class="navbar">
            <div>
                <a href='website.html'>Login</a>
            </div>
            <nav>
                <ul id='MenuItems'>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>About Us</a></li>
                    <li><a href='#'>Services</a></li>
                    <li><a href='#'>Contact</a></li>
                </ul>
            </nav>
        </div>
        <div>
        <div class="form-box">
        <form id='login' class='input-group-login' onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
                <input
                type="email"
                class='input-field'
                id="email"
                onChange={(e) => setUser(e.target.value)}
                autoComplete="off"
                required
            />

            <label htmlFor="password">Password:</label>
                <input
                type="password"
                class='input-field'
                onChange={(e) => setPwd(e.target.value)}
                id="password"
                required
            />
            <br></br>
            <button type='submit' class='submit-btn'>Sign In</button>
        </form>
        </div>
        </div>
        </div>
    </body>
            )}
export default LoginBar