const User = require('../model/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt =  require('bcrypt')

const register =async(req,res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password) return res.status(401).json({
            success:false,
            message:'Email and Password are required'
        })
        const existUser = await User.findOne({email})
        if(existUser) return res.status(401).json({
            success:false,
            message:'User already exists'
        })
        const hashedPwd = await bcrypt.hash(password,10)
        const user = await User.create({
            email,
            password:hashedPwd
        })
        await user.save()
        const token = await jwt.sign(
            {userId:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:7*24*60*60*1000,
            sameSite:'strict'
        })
        res.status(200).json({
            success:true,
            message:'User successfully created'
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

const login = async(req,res)=>{
    try{
        const {email , password} = req.body
        if(!email || !password) return res.status(401).json({
            success:false,
            message:'Email and password are required'
        })
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({
            success:false,
            message:'Invalid credentils'
        })
        const checkPwd = await bcrypt.compare(password , user.password)
        if(!checkPwd) return res.status(401).json({
            success:false,
            message:'Invalid credentials'
        })
        const token = jwt.sign(
        {userId:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
        )
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:7*24*60*60*1000,
            sameSite:'strict'
        })
        res.status(201).json({
            success:true,
            message:'User logged in successfully',
            token
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

module.exports = {register,login}