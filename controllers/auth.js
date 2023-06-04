const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async(req,res) => {

    const user  = await User.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user : {name: user.name}, token})
}

const login = async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).send("Email or password not provided ")
    }
    const user = await User.findOne({email});
    if(!email){
        res.status(401).send("User not found")
    }
    const isPaasswordCorrect = await bycrypt.compare(password, user.password)

    if(!isPaasswordCorrect){
        res.status(403).send("Access denied kid")
    }
    const token = user.createJWT();
    res.status(200).json({user :{name: user.name}, token})
}

module.exports ={
    login,
    register
    
}