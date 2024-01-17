import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import { useNavigate, Link } from 'react-router-dom'
import "./signup.css"
import { useData } from '../../context/ContextProvider';
export default function Signup() {
    const [firstName,setFirstName]=useState();
    const [lastName,setLastName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const {setTitle}=useData();
    const {performSignUp}=useAuth()
    let navigate = useNavigate();

    useEffect(() => setTitle("Signup"));

  return (
    <div className='signup-container'>
      <div className='signup-card'>
      <h2 className='signup-header'>Signup</h2>
      <div>
        <label><p>First Name</p><input type='text' onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} placeholder='Parikshit'/></label>
      </div>
      <div>
        <label><p>Last Name</p><input type='text' onChange={(e)=>{setLastName(e.target.value)}} value={lastName} placeholder='Deore'/></label>
      </div>
      <div>
        <label><p>Email</p><input type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder='Parikshit@gmail.com'/></label>
      </div>
      <div>
        <label><p>Password</p><input type='password' onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder='8-12 char'/></label>
      </div>

      <button onClick={()=>{performSignUp(email,password,firstName,lastName)}}>
            Create New Account
      </button>
      
      <Link to="/login">Already have an Account</Link>
      </div>
    </div>
  )
}
