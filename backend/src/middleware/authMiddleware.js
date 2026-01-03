const jwt = require('jsonwebtoken')

const authMiddleware =async (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || authHeader.startsWith('Bearer')){
        res.status(401).json({
            success:false,
            message:'no token provided'
        })
    }
    try{
    const decoded = await jwt.verify(token , process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

module.exports = authMiddleware