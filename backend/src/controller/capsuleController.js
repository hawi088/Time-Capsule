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
    await capsule.save()
    res.status(201).json({
        success:true,
        capsule:{
        message:'Capsule successfully created',
        id:capsule._id
        }
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
        const isUnlocked = Date.now() >= capsule.unlockDate
        let daysRemaining =0
        if(!isUnlocked){
            const timeDifference =  new Date(capsule.unlockDate).getTime()- Date.now()
            daysRemaining = Math.ceil(timeDifference/(24*60*60*1000))
        }

            return res.json({
                success:true,
                capsule:{
                    id:capsule._id,
                    title:capsule.title,
                    unlockDate:capsule.unlockDate,
                    isUnlocked,
                    content:isUnlocked?capsule.content : null,
                    daysRemaining:isUnlocked?0:daysRemaining
                }
            })
        
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

const deleteCapsule= async(req,res)=>{
    try{
    const capsule = await Capsule.findOne({
        _id : req.params.id,
        owner:req.userId
    })
    if(!capsule) return res.status(401).json({
        success:false,
        message:'Capsule not found'
    })
    await Capsule.deleteOne({_id:capsule._id})
    res.status(201).json({
        success:true,
        message:'Capsule successfully deleted'
    })
}catch(err){
    res.status(500).json({
        success:false,
        message:'Internal Server Error'
    })
}
}

const updateCapsule = async(req,res)=>{
    try{
        const { title , unlockDate , content } = req.body
        const capsule = await Capsule.findOne({
            _id:req.params.id,
            owner : req.userId
        })
        if(!capsule) return res.status(404).json({
            success:false,
            message:'Capsule not found'
        })
        const checkUnlockDate =new Date(capsule.unlockDate).getTime() - Date.now()
        if(checkUnlockDate > 0) return res.status(401).json({
            success:false,
            message:"You cannot edit the capsule since the unlockDate has not arrived yet"
        })
        if(!title && !unlockDate && !content) return res.status(401).json({
            success:false,
            message:"Please provide the fields that you want to update"
        })
           const updateData = {};
           if (title) updateData.title = title;
           if (content) updateData.content = content;
           if (unlockDate) updateData.unlockDate = new Date(unlockDate);
   
           const updatedCapsule = await Capsule.findOneAndUpdate(
               { _id: req.params.id, owner: req.userId },
               updateData,
               { new: true } 
           );
        res.status(201).json({
            success:true,
            message:'Capsule Successfully Updated'
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
module.exports = {getCapsuleById , getAllCapsule , createCapsule , deleteCapsule , updateCapsule}