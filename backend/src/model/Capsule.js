const mongoose = require('mongoose')

const capsuleSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    unlockDate:{
        type:Date,
        required:true,
    },
    content:{
        type:Sting,
        required:true
    },
    isUnlocked:{
        type:Boolean,
        default:false
    }
},
    {timestamps:true}

)
module.exports= mongoose.model('Capsule',capsuleSchema)