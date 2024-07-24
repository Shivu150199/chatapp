
import login from '../assets/login.svg'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { toast } from 'react-toastify'

import {useSelector,useDispatch} from 'react-redux'
import { signInRejected, signInSuccess,signInPending } from '../redux/authSlice'
const Login = () => {
  const dispatch=useDispatch()
  const {loading,user}=useSelector(state=>state.authState)
  // const[loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const [formData,setFormData]=useState(null)
  const navigate=useNavigate()
    const handleSubmit = async(e) => {
      e.preventDefault()
     
      try{
        dispatch(signInPending())
        const {data}=await axios.post('http://localhost:8000/auth/login',formData)
        console.log(data)
        if(data.status==400||data.status==500){
  toast(data.error)
  // setLoading(false)
  return
        }
        dispatch(signInSuccess(data.data))
        // setLoading(false)
        setError(null)
        toast(data.message)
  navigate('/chat')
      }catch(err){
  console.log(err)
  dispatch(signInRejected(err))
  // setLoading(false)
  setError(error)
      }
  
    }
    const handleChange = (e) => {
  setFormData({...formData,[e.target.id]:e.target.value})
    }

  return (
    <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 gap-4 ">
    <div className="p-4 flex items-center justify-center ">
      <img src={login} alt="" className="w-96 hidden md:block" />
    </div>
    <div className="flex items-center justify-center h-full overflow-scroll">
      <form
        className=" p-2  rounded flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-center my-4 text-teal-700">
          Login Form
        </h2>
   


        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </div>
          <input
            type="email"
            placeholder='email'
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            id='loginId'
          />

        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </div>
          <input
            type="password"
            placeholder='password'
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            id='password'
          />

        </label>

        <button
            disabled={loading}
          type="submit"
          className="btn mt-5 w-[20rem] capitalize"
        >
          {loading ? 'loading..' : 'Login'}
        </button>

      
        <div className='my-2 text-blue-600'>
  <Link to='/login'>
  don't have an account? Signup
  </Link>
</div>
      </form>
    </div>
  </section>
  )
}

export default Login