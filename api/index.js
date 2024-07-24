const express= require('express')
const cors=require('cors')
const app=express()
const session=require('express-session')
const mongodbSession=require('connect-mongodb-session')(session)
const {createServer} =require('http')
const {Server} =require('socket.io')

const db=require('./config/db.js')

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

io.on('connection',(socket)=>{
console.log('user connected')
console.log('id',socket.id)
socket.on("disconnect",()=>{
    console.log('user disconnected',socket.id)
})

})

//file import
const authRouter = require('./routers/authRouter.js')

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