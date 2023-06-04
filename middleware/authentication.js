
const jwt = require("jsonwebtoken")
const auth = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(403).sned("Not authorizes to visit this route kid!")
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload =jwt.verify(token, 'randomSecret')
        req.user = { userId: payload.userId, name: payload.name}
        next()
    } catch (error){
        res.status(401).sned("Not verified by jwt")
    }
} 

module.exports = auth

