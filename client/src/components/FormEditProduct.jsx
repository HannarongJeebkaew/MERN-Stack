import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams,useNavigate } from 'react-router-dom'
const FormEditProduct = () => {
  const param = useParams()
  const navigate = useNavigate()
  const [data,setData] = useState({})
  const [fileold,setFileold] = useState()
  useEffect(()=>{
    loadData(param.id);
  },[])
  const loadData = async (id)=>{
    await axios.get(import.meta.env.VITE_REACT_APP_API+'/product/'+id).then((res)=>{
    //  console.log(res); 
     setData(res.data)
     setFileold(res.data.file)
    })
  }
  const handleChange = (e) => {
    if(e.target.name==="file"){
      setData({ ...data, [e.target.name]: e.target.files[0]});

    }else{
      setData({ ...data, [e.target.name]: e.target.value });
    }

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData()
    for(const key in data){
      formWithImageData.append(key,data[key])
    }
    formWithImageData.append("fileold",fileold)
    await axios
      .put(import.meta.env.VITE_REACT_APP_API + "/product/"+param.id, formWithImageData)
      .then(()=>{
        navigate('/admin/viewtable')
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("data: ",data);
    console.log("fileold: ",fileold);
  };
  return (
    <div><form onSubmit={handleSubmit} enctype="multipart/form-data">
    <div>
          <TextField
            id="filled-basic"
            label="name"
            variant="filled"
            value={data.name ? data.name : ""}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="detail"
            variant="filled"
            value={data.detail ? data.detail : ""}
            name="detail"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            type="number"
            label="price"
            value={data.price ? data.price : ""}
            variant="filled"
            name="price"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            variant="filled"
            name="file"
            label="file"
            type="file"
            focused
            onChange={(e) => handleChange(e)}
          />
        </div>
        <Button variant="contained" color="success" type="submit">
          Success
        </Button>
  </form></div>
  )
}
export default FormEditProduct