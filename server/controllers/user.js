const User = require('../models/Users')

exports.list = async(req,res)=>{
    try{
        const user = await User.find().select('-password').exec()
        res.send(user)
    }catch(err){
        console.log(err);
        res.status(500).send("server Error")
    }
}
exports.changeRole = async(req,res)=>{
    try{
        console.log(req.body);
        const user = await User.findOneAndUpdate({_id:req.body.data.id},{role:req.body.data.role},{new:true}).select('-password').exec()
        res.send(user)
    }catch(err){
        console.log(err);
        res.status(500).send("server Error")
    }
}

