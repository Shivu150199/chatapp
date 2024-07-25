import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { IoSend } from "react-icons/io5";
import moment from 'moment'
const MessageSection = ({id,socketConnection}) => {
  // const {socketConnection}=useSelector(state=>state.authState)
  // const params=useParams()
// console.log(socketConnection)
const {user}=useSelector(state=>state.authState)
const [userData,setUserData]=useState(null)
const [message,setMessage]=useState('')
const [allMessage,setAllMessage]=useState([])
const currentMessage=useRef(null)
useEffect(()=>{
  if(currentMessage.current){
    currentMessage.current.scrollIntoView({behavior:'smooth',block:'end'})
  }
})
const handleChange=(e)=>{

  setMessage(e.target.value)
}
console.log('frontend message' ,message)
const handleSubmit=(e)=>{
e.preventDefault()
if(message){
  if(socketConnection){
    socketConnection.emit("new-message",{
      sender:user._id,
      receiver:id,
      text:message,
      messageByUserid:user._id

    })
  }
}
setMessage('')
}
useEffect(()=>{
  if(socketConnection){
    socketConnection.emit('message-page',id)
    socketConnection.on('message-user',(data)=>{
      console.log('user detail',data)
      setUserData(data)
    })
socketConnection.on('message',(data)=>{
  console.log('message data',data)
  setAllMessage(data)
})

  }


},[socketConnection,id,allMessage])
console.log(allMessage)
// console.log(params)
  return (
    <div>
      <header className='sticky top-0 h-16 bg-base-200 rounded-xl flex items-center px-6 gap-6'>
      <div className={userData&&`avatar ${userData.online?'online':'offline'}`}>
  <div className="w-10 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
<div>
  <h2 className='text-[1.2rem] font-medium capitalize'>{userData&&userData.name}</h2>
  <p className='text-sm'>{userData&&userData.online?<span className='text-green-500'>online</span>:<span className='text-red-500'>offline</span>}</p>
</div>
      </header>
      {/*  */}
      <section className='w-full h-[calc(100vh-12.5rem)] overflow-y-scroll mt-2'>

        {/* message */}

        {allMessage&&allMessage.map((msz)=>{
          return <div ref={currentMessage} className={`chat ${user._id==msz.messageByUserid?'chat-start':'chat-end'}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
          
              <time className="text-xs opacity-50">{moment(msz.createdAt).format('hh:mm')}</time>
            </div>
            <div className="chat-bubble">{msz.text}</div>
            <div className="chat-footer opacity-50">{msz.seen?'seen':'delivered'}</div>
          </div>
        })}
   
{/* <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div> */}
      </section>
      <section className='h-14 bg-base-200 rounded-full flex items-center px-4 gap-6 justify-between'>
      <div className="dropdown dropdown-top">
  <div tabIndex={0} role="button" className="btn m-1 bg-base-300 rounded-full"><FaPlus /></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
<form onSubmit={handleSubmit} className='w-full flex items-center justify-between gap-4'>
<input name='text' value={message} onChange={handleChange} type="text" placeholder="Type here" className="input outline-none border-none w-full max-w-full" />
<button type='submit' className='btn m-1 bg-base-300 rounded-full hover:bg-base-200'><IoSend /></button>
</form>
      </section>
    </div>
  )
}

export default MessageSection