const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
select:false
    },

})

const user=mongoose.model('user',userSchema)
module.exports=user