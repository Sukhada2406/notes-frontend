import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import {Link ,useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter name.");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter valid email.");
      return;
    }
    if(!password){
      setError("Please enter password");
      return;
    }

    setError("");

    // SIGNUP API CALL

    try{
      const response = await axiosInstance.post("/create-account",{
        fullName: name,
        email: email,
        password: password,
      });

      // handle successful registration response
      if(response.data && response.data.error){
        setError(response.data.message)
        return 
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/login")
      }
    } catch (error) {
      //handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.storage);
      } else {
        setError("An unexpected error occured . Please try again")
      }
    }
  };

  return (
    <>
      <Navbar/>
      <div className='flex items-center justify-center mt-20'>
        <div className='w-98 rounded-2xl bg-white px-7 py-10 '>
          <form onSubmit={handleSignUp}>

            <h4 className = 'flex items-center justify-center text-3xl mb-7'> SignUp   
            </h4>

            <input 
            type="text"
            placeholder='Name'
            className='input-box'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

<input 
            type="text"
            placeholder='Email'
            className='input-box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}   

            <button type = 'submit' className='btn-primary'>
              Create an Account
            </button>

            <p className='text-sm text-center mt-4'>
              Already have an Account ? {""}
              <Link to = "/login" className="font-medium text-blue-600 underline"> Login </Link>
            </p>

        </form>
        </div>
      </div>
    </>
  )
}

export default SignUp