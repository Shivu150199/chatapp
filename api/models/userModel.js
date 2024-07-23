const user = require("../schemas/userSchema")
const bcrypt=require('bcrypt')
const User=class {
    constructor({name ,email ,username,password}){
        this.email=email
        this.name=name
        this.username=username
        this.password=password
    }

    registerUser(){
        return new Promise(async(resolve,reject)=>{
const hashedPassword=await bcrypt.hash(this.password,Number(process.env.SALT))

const userObj=new user({
    name:this.name,
    email:this.email,
    username:this.username,
    password:hashedPassword
})
try{
//db to check whether username or email exist or not
const userExist=await user.findOne({
    $or:[{email:this.email},{username:this.username}]
})

if(userExist&&userExist.email===this.email) reject('email already exist')

else if(userExist&&userExist.username===this.username)reject('username already exist')
else {

    
    const userDb=await userObj.save()
    resolve(userDb)
}
}catch(error){
    reject(error)
}

        })
    }


    static findUserWithLogiId({loginId}){
        return new Promise(async(resolve,reject)=>{
            try{
const userDb=await user.findOne({
    $or:[{username:loginId},{email:loginId}]
}).select('+password')

if(!userDb) reject('user not found')
    else resolve(userDb)
            }catch(err){
reject(err)
            }
        })
    }
}


module.exports=User