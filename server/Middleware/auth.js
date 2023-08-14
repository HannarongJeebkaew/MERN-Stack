const jwt=require('jsonwebtoken')
const User = require('../models/Users')
exports.auth = async (req,res,next)=>{
    try{
        const token = req.headers["authtoken"]
        
        if(!token){
            return res.status(401).send("No token")
        }
        const decoded = jwt.verify(token,"jwtsecret")
        req.user=decoded.user
        next();
    }catch(err){
        console.log(err);
        res.send('Token Invalid!!!').status(500)
    }
}
exports.adminCheck = async (req,res,next)=>{
    try{
        // console.log(req.user);
        const userAdmin = await User.findOne({name:req.user.name}).select('-password').exec()
        if(userAdmin.role!=="admin"){
            res.status(403).send("Admin access Denies!!!")

        }else{
            next()
        }
        // next();
        // console.log(userAdmin);
    }catch(err){
        console.log(err);
        res.send('Admin access Denies!!!').status(500)
    }
}