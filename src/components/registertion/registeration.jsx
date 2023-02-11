import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=> {
    const navigate = useNavigate();

    const [registerData , setRegisterData] = useState({userName:"" , password:"" , confirmPassword:""})
    const [error, setError] = useState("");

    async function registeration() {
        if(registerData.password !== registerData.confirmPassword) {
            return setError("password not match");
        }
        
        if (registerData.userName && registerData.password) {
            await fetch("http://localhost:5000/register", {
                method: "POST",
                body: JSON.stringify(registerData),
                headers: {"Content-Type": "application/json"}
            }).then(res => {
                // console.log(res)
                navigate("/")
            }).catch(e => {
                console.log("errr>>> " + e.message);
            })
        } else {
            alert('Some Feild Are Empty');
        }
    }
    
    return (
        <div>
            <section>
            <h2>Register</h2>

            <input type="text" 
                   placeholder="userName"
                   onChange={(e)=> setRegisterData({...registerData , userName:e.target.value})} /> <br />

            <input type="password" 
                   placeholder="password"
                   onChange={(e)=> setRegisterData({...registerData , password:e.target.value})} /> <br />

            <input type="password" 
                   placeholder="confirmPassword"
                   onChange={(e)=> setRegisterData({...registerData , confirmPassword:e.target.value})} /> <br />
                   {error ? <span style={{color: "red", fontSize: "small"}}>{error}</span> : ''}
    
            <button onClick={() => registeration()}>Register</button>
            </section>
            
        </div>
    )
}

export default Register;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../header/header";
// import "./registeration.css";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import fetching from '../../images/fetch.gif'


// const Register = () => { 

//     const navigate = useNavigate()
//     const [registerationData, setregisterationData] = useState({userName: "", password: ""});
//     const [confirmPassword, setConfirmPassword] = useState("")
//     const [error, setError] = useState("");
//     const [hide, setHide] = useState(true);
//     const [conHide, setConHide] = useState(true)
//     const [loading, setLoading] = useState(false);
//     console.log(registerationData)

//     async function registeration() {
//         setLoading(true);
//         if(registerationData.password !== confirmPassword) {
//             setLoading(false);
//             return setError("password not match");
//         }

//         if(registerationData.userName && registerationData.password) {
//             // await fetch("https://blog-server-2zb0.onrender.com/register", {
//             await fetch("http://localhost:5000/register", { 
//                 method: "POST",
//                 body: JSON.stringify(registerationData),
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             }).then(res => {
//                 // console.log(res)
//                 setLoading(false);
//                 navigate("/")
//             }).catch(e => {
//                 setLoading(false);
//                 console.log("errr>>> " + e.message);
//             })
//         } else {
//                 setLoading(false)
//                 alert('Some Feild Are Empty');
//             }
//         } 


//     return (
//         <>
//             <Header/>
//             <div className="registeration-container">
//                 {loading ? <img className="loader" src={fetching} alt='loading...' /> : ''}
//                 <section className="form">
//                     <p className="form-header" style={{fontWeight: "bolder"}}>Sign Up :   
//                     <div style={{display: 'inline', fontWeight: 'lighter'}} 
//                             className='toggle-btn'>
//                             have an account?  <span className='signup-btn' onClick={()=> navigate('/')}>LoginPage</span>
//                         </div></p>
//                     {/* <input type="text" 
//                         placeholder="Name" 
//                         onChange={(e) => setregisterationData({...registerationData, name: e.target.value})} /><br/> */}
//                     <input type="text"
//                         placeholder="username" 
//                         onChange={(e) => setregisterationData({...registerationData, userName: e.target.value})} /><br/>
//                         {error ? <span style={{color: "red", fontSize: "small"}}>{error} </span> : ''} 
//                     <input type={hide ? 'password' : 'text'} 
//                         placeholder="password" 
//                         onChange={(e) => setregisterationData({...registerationData, password: e.target.value})} />
//                         <span className='pointer' onClick={() => setHide(!hide)} 
//                             style={{paddingLeft: '8px'}} >
//                             {hide ? <FaEye size='1.1em' /> : 
//                             <FaEyeSlash size='1.1em'/> }
//                         </span> <br/>
//                         {error ? <span style={{color: "red", fontSize: "small"}}>{error} </span> : ''} 
//                         <input type={conHide ? 'password' : 'text'}
//                         placeholder="Confirm password" 
//                         onChange={(e) => setConfirmPassword(e.target.value)} />
//                         <span className='pointer' onClick={() => setConHide(!conHide)} 
//                             style={{paddingLeft: '8px'}} >
//                             {conHide ? <FaEye size='1.1em' /> : 
//                             <FaEyeSlash size='1.1em'/> }
//                         </span> <br/>

//                 <button className="register-btn" onClick={() => registeration()}>Register</button>
//                 </section>

//             </div>
//         </>
//     )
// }

// export default Register;