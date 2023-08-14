import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Formproduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    await axios
      .get(import.meta.env.VITE_REACT_APP_API + "/product/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }
    await axios
      .post(import.meta.env.VITE_REACT_APP_API + "/product/", formWithImageData)
      .then((res) => loadData())
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemove = async (id) => {
    console.log(id);
    await axios
      .delete(import.meta.env.VITE_REACT_APP_API + "/product/" + id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div>
          <TextField
            id="filled-basic"
            label="name"
            variant="filled"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="detail"
            variant="filled"
            name="detail"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            type="number"
            label="price"
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
      </form>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">detail</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">file</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.detail}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.file}</TableCell>
    
                  <TableCell align="right">
                    <DeleteIcon onClick={() => handleRemove(item._id) } color="error"></DeleteIcon>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={"/edit/" + item._id}>
                      <EditIcon></EditIcon>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Formproduct;
