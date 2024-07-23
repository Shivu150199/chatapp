const express= require('express')
const cors=require('cors')
const app=express()
const session=require('express-session')
const mongodbSession=require('connect-mongodb-session')(session)
const db=require('./config/db.js')

const clc=require('cli-color')
require('dotenv').config()

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


app.listen(PORT,()=>{
    console.log( clc.yellowBright.bold( 'server is running on port : '+PORT))
})