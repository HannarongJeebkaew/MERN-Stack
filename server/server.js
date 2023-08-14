const express = require('express')
const {readdirSync} =require('fs')
const morgan = require('morgan')
const cors =require('cors')
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')


const productRoutes= require('./Routes/product');


const app = express();
connectDB();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))

// Route 1
// app.get('/product',(req,res)=>{
//     res.send("Hello endpoint 555")
// })

//Route 2
// app.use('/api',productRoutes)

readdirSync('./Routes').map((r)=>{app.use('/api',require('./Routes/'+r));
console.log("r = ",r);
})

app.listen(5000,()=>console.log('server is Running on port 5000'))