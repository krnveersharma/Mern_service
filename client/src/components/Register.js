import React, { useState } from 'react'

const Register = () => {
    const[details,setDetails]=useState({
        username:"",
        email:"",
        phone:"",
        password:""
    })
    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setDetails({
            ...details,
            [name]:value
        })
    }
    const handleclick=async(e)=>{
        e.preventDefault();
        try {
            
        const response=await fetch('http://localhost:5001/api/auth/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify(details),
        });
        if(response.ok){
            const res_data=await response.json();
              localStorage.setItem('token',res_data);
            setDetails({
              username:"",
              email:"",
              phone:"",
              password:""
            })
        }
    } catch (error) {
            console.error(error)
    }
    }
    return (
        <div>
            <div>
                <label htmlFor='username'>username</label>
                <input type="text" name="username" id="username" value={details.username} onChange={handleInput} autoComplete='off'/>
            </div>
            <div>
                <label htmlFor='email'>email</label>
                <input type="email" name='email' id="email" value={details.email} onChange={handleInput}/>
            </div>
            <div>
                <label htmlFor='phone'>phone</label>
                <input type="number" name='phone' id="phone" value={details.phone} onChange={handleInput}/>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input type="password" name='password' id="password" value={details.password} onChange={handleInput}/>
            </div>
            <button type='submit' onClick={handleclick}>Register</button>
        </div>

    )
}

export default Register