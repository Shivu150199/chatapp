const express= require('express')
const cors=require('cors')
const app=express()
const session=require('express-session')
const mongodbSession=require('connect-mongodb-session')(session)
const {createServer} =require('http')
const {Server} =require('socket.io')
const userSchema =require('./schemas/userSchema.js')
const db=require('./config/db.js')
// const {ConversationModel,MessageModel}=require('./schemas/messageSchema.js')

const clc=require('cli-color')
require('dotenv').config()

const server=createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true
    
    }
})
const onlineUser=new Set()

io.on('connection',(socket)=>{

const userId=socket.handshake.auth.id

//create a room
socket.join(userId)
onlineUser.add(userId.toString())

io.emit('onlineUser',Array.from(onlineUser))

socket.on('message-page',async(userid)=>{

const userDetail=await userSchema.findById(userid)
const payload={
    id:userDetail._id,
    name:userDetail.name,
    email:userDetail.email,
    online:onlineUser.has(userid)
}
socket.emit('message-user',payload)


/////////////////

const getConversationMessage=await ConversationModel.findOne({
    "$or":[
        {sender:userId,receiver:userid},
        {sender:userid,receiver:userId}
    ]
}).populate('messages').sort({updatedAt:-1})


socket.emit('message',getConversationMessage?.messages||[])
//    console.log('get conversation',getConversationMessage)
})
//////////////////

socket.on('new-message',async(data)=>{
//check conversation is available or not
let conversation=await ConversationModel.findOne({
    "$or":[
        {sender:data.sender,receiver:data.receiver},
        {sender:data.receiver,receiver:data.sender}
    ]
})
//if conversation is not availbale

if(!conversation){
    const createConversation =await ConversationModel({
        sender:data?.sender,
        receiver:data?.receiver
    })
    conversation=await createConversation.save()
}

const message= new MessageModel({
    text:data?.text,
    messageByUserid:data?.messageByUserid
})

const savedMessage=await message.save()
const updateConversation=await ConversationModel.updateOne({_id:conversation?._id},{
    "$push":{messages:savedMessage._id}
})



socket.on("disconnect",()=>{
    onlineUser.delete(userId)
  
})

})



})


//new message


//file import
const authRouter = require('./routers/authRouter.js')
const user = require('./schemas/userSchema.js')
const { ConversationModel, MessageModel } = require('./schemas/messageSchema.js')

const PORT =process.env.PORT

const store=new mongodbSession({
    uri:process.env.MONGO_URI,
    collection:"sessions"
})



app.use(express.json())
app.use(cors())
app.use(session({
    secret:process.env.SECRET_KEY,
    store:store,
    resave:false,
    saveUninitialized:false
}))
app.use('/auth',authRouter)



app.get('/',(req,res)=>{
return res.send('server is running')
})


server.listen(PORT,()=>{
    console.log( clc.yellowBright.bold( 'server is running on port : '+PORT))
})