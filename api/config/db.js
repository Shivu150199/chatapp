const mongoose=require('mongoose')
const clc=require('cli-color')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI).then(()=>{console.log(clc.blueBright.bold('mongodb connected successfully'))}).catch((err)=>{
    console.log(clc.redBright.bold(err))
})