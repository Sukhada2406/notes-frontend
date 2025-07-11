import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {Link , useNavigate} from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';


const Login = () => {

  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter valid email.");
      return;
    }
    if(!password){
      setError("Please enter password.");
      return;
    }
    setError("")

    // LOGIN API CALL 
    
    try{
      const response = await axiosInstance.post("/login",{
        email: email,
        password: password,
      });

      // handle successful login response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard");
      }
    } catch (error) {
      //handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.storage);
      } else {
        setError("An unexpected error occured . Please try again")
      }
    }
  }
  return (
    <>
      <Navbar/>

      <div className='flex items-center justify-center mt-20'>

        <div className='w-98 rounded-2xl bg-white px-7 py-10 '>

          <form onSubmit={handleLogin}>

            <h4 className = 'flex items-center justify-center text-3xl mb-7'> Login </h4>

            <input 
            type = "text" 
            placeholder='Email' 
            className='input-box'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <PasswordInput 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type = 'submit' className='btn-primary'>
              Login
            </button>

            <p className='text-sm text-center mt-4'>
              Not registered yet ? {""}
              <Link to = "/signup" className="font-medium text-blue-600 underline">Create an Account</Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login