import React, {useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import '../Login.css';

//import axios from '../api/axios';

const LoginBarAgent = () => {
    //const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

   /* useEffect(() => {
        userRef.current.focus();
    }, [])*/

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    async function loginUser(credentials)
    {
        return fetch("http://54.254.200.112:5000/auth/login/agent", {
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
            const response = await loginUser({
                username,
                password
        });
            if ('token' in response)
            {
                const accessToken = response.token;
                localStorage.setItem('token',accessToken);
                //setAuth({ email, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
                window.location.href ="/profileAgent";
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
                <section>
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In Agent</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="text">Email:</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                        />
                        <button type='submit' >Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
export default LoginBarAgent