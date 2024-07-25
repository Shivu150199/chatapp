import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import {useSelector,useDispatch} from "react-redux"
import {handleLogOut, setOnlineUser, setSocketConnection} from '../redux/authSlice'
import { useParams } from 'react-router-dom';
import MessageSection from '../components/MessageSection';
import Sidebar from '../components/Sidebar';

const Chat = () => {
  const {id}=useParams()
  // console.log(param)
  const dispatch=useDispatch()
  const {user,onlineUser}=useSelector(state=>state.authState)
  const[userid,setUserID]=useState(user._id)
  const [sockets,setSockets]=useState(null)
  
  console.log(onlineUser)
  // console.log(socket) 
  useEffect(()=>{
  const socket=io('http://localhost:8000',{
    auth:{
      id:userid
    }
  })
  
socket.on('onlineUser',(data)=>{
  dispatch(setOnlineUser(data))
  console.log(data)
})
setSockets(socket)
// dispatch(setSocketConnection(socket))
  return ()=>{
    socket.disconnect()
  }
},[userid])

const logout=()=>{
  console.log('logout')
dispatch(handleLogOut())
}

  return (
    <section className='w-[100vw] h-[88vh]  flex '>
      <div className='flex-[.2]  w-screen h-[78vh] rounded-2xl flex flex-col justify-between'>
<Sidebar handleLogout={logout}/>

      </div>
      <div className='flex-[.8]'>
{id?<MessageSection socketConnection={sockets} id={id}/>:<div className='flex items-center flex-col justify-center w-[100%] h-full'>
  <h2 className="text-3xl font-extrabold  tracking-wider ">
          Chat <span className="text-teal-700">App</span>
          </h2>
          <p>Select user to start chat</p>
  </div>}
      </div>
    </section>
  )
}

export default Chat