const Capsule = require('../model/Capsule')

const createCapsule = async(req,res)=>{
    try{
    const {title , unlockDate , content} = req.body
    if(!title || !unlockDate || !content) return res.status(401).json({
        success:false,
        message:'All fields are required'
    })
    const capsule = new Capsule({
        owner:req.userId,
        title,
        unlockDate,
        content
    })
    capsule.save()
    res.status(201).json({
        success:true,
        message:'Capsule successfully created'
    })
}catch(err){
    res.status(500).json({
        success:false,
        message:'Internal server error'
    })
}
}

const getAllCapsule = async(req,res)=>{
    try{
        const capsules = await Capsule.find({owner:req.userId}).sort({createdAt:-1})
        res.json(capsules)
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const getCapsuleById = async(req,res)=>{
    try{
        const capsule = await Capsule.findOne({
            _id : req.params.id,
            owner:req.userId
        })
        if(!capsule){
            res.status(401).json({
                success:false,
                message:'Capsule not found!'
            })
        }
        const unlockDate = Date.now() >= capsule.unlockDate
        if(!unlockDate){
            return res.json({
                title:capsule.title,
                locked: true,
                unlockDate:capsule.unlockDate
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

module.exports = {getCapsuleById , getAllCapsule , createCapsule}