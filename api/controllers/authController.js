const bcrypt=require('bcrypt')

const User = require("../models/userModel");
const { userValidation } = require("../utils/authUtils");

const registerController=async(req,res,next)=>{
    const {name,email,username,password}=req.body;
    const userObj= new User({name,email,username,password})
    console.log(userObj)
    try{
        await userValidation({name,email,username,password})
        const userDb=await userObj.registerUser()
         return res.send({
            status:201,
            message:'user registered successfully',
            data:userDb
        })
    }catch(err){
         return res.send({
            status:400,
            message:'user not registred',
            error:err
        })
    }
   
    // console.log('register working')
    // const userObj= new User({name,email,username,password})
    // try{
    //     const userDb=await userObj.registerUser()
// return res.send({  
//     status:201,
//     message:'User registered successfully',
//     data:userDb
// })

// return res.status(201).json({
//     status:'success',
//     message:'user registered succcessfully',
//     data:userDb
// })
//     } catch(error){ 
// return res.status(400).json({
//     status:"failed",
//     messgae:'Data invalid',
//     error:error,
// })
//     }


 
    }



    const loginController=async(req,res)=>{
   const {loginId,password}=req.body
if(!loginId || !password){
   return res.send({
        status:400,
        message:'missing user credentials'
    })
} 

try{
    const userDb=await User.findUserWithLogiId({loginId})
   const isMatch=await bcrypt.compare(password,userDb.password)


if(!isMatch){
    return res.send({
        status:400,
        message:'incorrect password'
    })
}
req.session.isAuth=true,
req.session.user={
    username:userDb.username,
    email:userDb.email,
    userId:userDb._id
}
return res.send({
    status:200,
    message:'login successfull',
    data:userDb
})

}catch(err){
return res.send({
    status:500,
    message:'Internal server error',
    error:err
})
}

        }

const checkController=(req,res)=>{
   
    return res.send('all working')}
   
   const logoutController=(req,res)=>{
req.session.destroy((err)=>{
    if(err){
    return res.send({status:500, message:"unable to logout"})
    }

    return res.send({
        status:200,
        message:'logout successfull'
    })
})

   } 




module.exports={registerController,loginController,checkController,logoutController}      