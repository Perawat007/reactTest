import React, {useState} from 'react';
import './Test.css'
function Test(){
    return(
        <body>
        <div class="full-page">
        <div class="navbar">
            <div>
                <a href='website.html'>Login Admin</a>
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
        <form id='login' class='input-group-login'>
            <label htmlFor="email">Email:</label>
                <input
                type="email"
                class='input-field'
                id="email"
                autoComplete="off"
                required
            />

            <label htmlFor="password">Password:</label>
                <input
                type="password"
                class='input-field'
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
  );
}

export default Test;