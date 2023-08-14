const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        const { name, password,email } = req.body;
        let user = await User.findOne({ name });
        //Check User in DB
        if (user) {
            return res.status(200).send("User Already Exists!!!");
        }
        //Encrypt
        const salt = await bcrypt.genSalt(10);
        user = new User({ name, password ,email});
        user.password = await bcrypt.hash(password,salt)
        //save
        await user.save()
        res.send("Register Success");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};
exports.login = async (req, res) => {
    try {
        //code
        //1.Check User
        const{name,password}=req.body
        let user = await User.findOneAndUpdate({name},{new:true})
        if(user){
            const isMatch =await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).send("Password Invalid!!!")
            }
            let payload ={
                user:{
                    name:user.name,
                    role:user.role
                }
            }
            jwt.sign(payload,'jwtsecret',{expiresIn:"1d"},(err,token)=>{
                if(err) throw err;
                res.json({token,payload})
            })
        }else{
            res.status(400).send("User not found!!!")
        }
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};

exports.currentUser = async(req,res)=>{
    try{
        console.log('current',req.user)
        const user = await User.findOne({name:req.user.name}).select('-password').exec()
        console.log('user',user)
        res.send(user)
    }catch(err){
        console.log(err);
        res.status(500).send("server Error")
    }
}
