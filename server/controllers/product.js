const Product = require('../models/product')
const fs = require('fs')
exports.read = async(req,res)=>{
    try{
        const id = req.params.id
        const producted = await Product.find({_id:id}).exec();
        res.send(producted[0])
    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}
exports.list = async(req,res)=>{
    try{
        const producted = await Product.find({}).exec();
        res.send(producted)
    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }

}
exports.update = async(req,res)=>{
    try{
        const id = req.params.id
        // console.log("newdata: ",req.body);
        let newdata = req.body
        if(typeof req.file!=="undefined"){
            newdata.file = req.file.filename
            await fs.unlink('./Uploads/'+newdata.fileold,(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`Edit Success`);
                }
            })
        }
        const updated = await Product.findOneAndUpdate({_id:id},newdata,{new:true}).exec()
        console.log("newdata: ",newdata);
        res.send(updated)
    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }

}
exports.create = async(req,res)=>{
    try{
    
        let data = req.body
        if(req.file){
            data.file=req.file.filename
        }
        // console.log(data)
        const producted = await Product(data).save()
        res.send(producted)
    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }

}
exports.remove = async(req,res)=>{
    try{
        const id = req.params.id
        const remove = await Product.findOneAndDelete({_id:id}).exec()
        if(remove?.file){
            await fs.unlink('./Uploads/'+remove.file,(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`Remove file ${remove.file} success`);
                }
            })
        }
        if(!remove){
            return res.send("no file")
        }
        res.send(remove)
    }catch(err){
        console.log(err)
        res.status(500).send('server error')
    }

}