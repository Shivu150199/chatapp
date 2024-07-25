const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        default:''
    },
    seen:{
        type:Boolean,
        default:false
    },
    messageByUserid:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'user'
    }
},
{
    timestamps:true
})


const conversationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'user'
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'user'
    },
    messages:[{
        type:mongoose.Schema.ObjectId,
        ref:'Message'
    }]
},{timestamps:true})


const ConversationModel=mongoose.model('Conversation',conversationSchema)
const MessageModel=mongoose.model('Message',messageSchema)

module.exports={ConversationModel,MessageModel}