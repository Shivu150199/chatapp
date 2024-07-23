const isAuth=require('../middlewares/isAuthMiddleWare')
const express=require('express')

const { registerController, loginController,checkController,logoutController } = require('../controllers/authController')

const authRouter=express.Router()


authRouter.post('/register',registerController)
authRouter.post('/login',loginController)
authRouter.post('/check',isAuth,checkController)
authRouter.post('/logout',isAuth,logoutController)




module.exports=authRouter 