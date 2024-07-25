import React, { useEffect, useState } from 'react'
import { FaFacebookMessenger } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({handleLogout}) => {
  const {onlineUser}=useSelector(state=>state.authState)
  const navigate=useNavigate()
const [alluser,setAlluser]=useState([])
const [active,setActive]=useState(null)
const [loading,setLoading]=useState(false)
useEffect(()=>{
const fetchData=async()=>{
  try{
    setLoading(true)
    const data=await axios.get('http://localhost:8000/auth/getuser')
console.log(data)
setAlluser(data.data.data)
setLoading(false)
  }catch(err){
    console.log(err)
    setLoading(false)
  }

}
fetchData()

},[])

  return (
    <>
    {/* <ul className="menu menu-horizontal bg-base-200 rounded-box w-full flex justify-between" >
  <li title='message'>
    <a>
    <FaFacebookMessenger className='h-5 w-5'/>
    </a>
  </li>
  <li>
    <a>
    <IoPersonAddSharp className='h-5 w-5'/>
    </a>
  </li>
  <li>
    <a>
    <HiUserGroup className='h-5 w-5'/>
    </a>
  </li>
</ul> */}
<div className='h-full p-2'>
<h2 className='font-semibold text-2xl'>Message</h2>
<div className='h-full w-full overflow-scroll flex flex-col '>
  {loading&&<span className="loading loading-ring loading-lg"></span>}
  {alluser&&alluser.map((item)=>{
    return <Link to={`/chat/${item._id}`} onClick={()=>setActive(item._id)} key={item._id} className={`${active==item._id&&'bg-slate-500'} cursor-pointer transition-all hover:delay-150 flex gap-3 items-center hover:bg-slate-400 py-4 px-2 hover:text-black rounded`}>
    <div className={`avatar ${onlineUser.includes(item._id)?'online':'offline'}`}>
  <div className="w-10 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
      <h3 className='text-white capitalize'>{item.name}</h3>
    </Link>
  })}
     
</div>

</div>
{/*  */}
<ul className="menu menu-horizontal bg-base-200 rounded-box w-full flex justify-between">
  <li>
    <a>
    <RxAvatar className='h-5 w-5' title='user'/>
    </a>
  </li>

  <li onClick={handleLogout}>
    <a>
    <IoIosLogOut className='h-5 w-5' title='Logout'/>
    </a>
  </li>
</ul>

    </>

  )
}

export default Sidebar