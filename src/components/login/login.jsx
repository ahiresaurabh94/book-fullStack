// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {

//     const navigate = useNavigate();
//     const [LoginData, setLoginData] = useState({userName: "", password: ""});
//     const [userErr, setUserError] = useState("");
//     const [passErr, setPassError] = useState('');

//     async function login() {

//         try {
//             // const response = await fetch("https://blog-server-2zb0.onrender.com/login", {
//             //await fetch("https://blog-server-2zb0.onrender.com/login", {

//             await fetch("http://localhost:5000/login", {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(LoginData)
//             }).then(res => {
//                 return res.json();
//             }).then(data => {
//                 // console.log(data.message + "status")
//                 if (data.status === 400) {
//                     setUserError("wrong userName!");
//                 } else if (data.status === 401) {
//                     setUserError("")
//                     setPassError("wrong password!")
//                 } else {
//                     localStorage.setItem("name", data.userName);
//                     localStorage.setItem("token", data.token);
//                     navigate("/createpost");
//                 }

//             }).catch(e => {
//                 console.log("Error: " + e);
//             })
//         } 
//         catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <div>
//             <h2>Login</h2>

//             <div>
//                 <input type="text"
//                     placeholder="userName" 
//                     onChange={(e) => setLoginData({...LoginData, userName: e.target.value})}/>
//                     <div style={{color: "red"}}>{userErr}</div>
//             </div>

//             <div>
//                 <input type="password"
//                     placeholder="password" 
//                     onChange={(e) => setLoginData({...LoginData, password: e.target.value})}/>
//                     <div style={{color: "red"}}>{passErr}</div>
//             </div>

//             <div>
//                 <button onClick={() => login()}>Login</button>
//             </div>
//             <div>Not have an Account click on <a href="/register" style={{"color": "green"}}>Register</a></div>
//         </div>
//     )
// }

// export default Login;

import React from 'react';
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css';
import { useState } from 'react';
import fetching from '../../images/fetch.gif'

const LoginPage = () => {
    const navigate = useNavigate();
    const [LoginData, setLoginData] = useState({email: "", password: ""});
    const [hide, setHide] = useState(true)
    const [emailErr, setEmailError] = useState("");
    const [passErr, setPassError] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(LoginData)

    async function login() {
      setLoading(true);
        try {
          // const response = await fetch("https://blog-server-2zb0.onrender.com/login", {
          // await fetch("https://blog-server-2zb0.onrender.com/login", {
          await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(LoginData),
          }).then(res => {
            return res.json();
          }).then(data => {
            console.log(data);
            console.log(data.message + "status")
            setLoading(false);
            if(data.status === 400) {
              setEmailError("wrong email!");
            } else if(data.status === 401){
              setEmailError("")
              setPassError("wrong password!")
            } else {
              localStorage.setItem("name", data.name);
              localStorage.setItem("token", data.token);
              navigate("/posts");
            }
            
          }).catch(e => {
            setLoading(false);
            console.log("Error: " + e);
          })
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      }

  return (
    <div className="login-container" style={{ height: '100vh', width: '100vw' }}>
    {loading ? <img className='loader' src={fetching} alt='fetching' /> : ''}
       <div className='form-container'>
            <div className='form-header'>Login</div>
            <div className='username'>
                <input className='username-input' type="text" 
                onChange={(e) => setLoginData({...LoginData, email: e.target.value})}
                 placeholder='user name'  />
                 <div style={{color: "red"}}>{emailErr}</div>
            </div>
            <div className='password'>
                <input className='password-input'
                 onChange={(e) => setLoginData({...LoginData, password: e.target.value})}
                 type={hide ? 'password' : 'text'} placeholder='password'  />
                <span className='pointer' onClick={() => setHide(!hide)} 
                        style={{paddingLeft: '8px'}} >
                        {hide ? <FaEye size='1.1em' /> : 
                        <FaEyeSlash size='1.1em'/> }
                </span>
                <div style={{color: "red"}}>{passErr}</div>
            </div>
            <div className='btn'>
                <button onClick={() => login()} className='btn-login'>Login</button>
            </div>
            <div className='toggle-btn'>
                Don't have an account?  <span className='signup-btn' onClick={()=> navigate('/register')}>SignUp</span>
            </div>
       </div>
    </div>
  );
}

export default LoginPage;
