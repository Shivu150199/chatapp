import React, { useEffect } from 'react'
import { io } from "socket.io-client";
const Chat = () => {
  const socket=io('http://localhost:8000')
  console.log(socket)
// useEffect(()=>{
//   socket.on('connect',()=>{
//     console.log('connected',socket.id)
//   })

//   return ()=>{
//     socket.disconnect()
//   }
// },[])

  return (
    <div>Chat</div>
  )
}

export default Chat