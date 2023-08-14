import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem } from '@mui/material';
import axios from "axios";
import { Select } from "@mui/material";
const ManageUser = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    console.log("user",user.user);
    console.log("loaddata");
    loadData(user.user.token);
  }, [user]);
  const loadData = async (authtoken) =>
    await axios
      .get(import.meta.env.VITE_REACT_APP_API + "/manageUser", {
        headers: {authtoken},
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    const role = ['admin',"user"]
    const handleChangeRole= async(id,e)=>{
        const data={id:id,role:e.target.value}
        await axios
      .post(import.meta.env.VITE_REACT_APP_API + "/change-role", {data},{
        headers: { authtoken:user.user.token},
      })
      .then((res) => console.log("res",res))
      .catch((err) => console.log(err));
    }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">role</TableCell>
              <TableCell align="right">updatedAt</TableCell>
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
                <TableCell align="right">
                  <Select
                    onChange={(e)=>handleChangeRole(item._id,e)}
                    defaultValue={item.role}
                    style={{ width: "100px" }}
                  >{role.map((item,index)=>
                    (<MenuItem value={item} key={index}>{item}</MenuItem>)
                )}</Select>
                </TableCell>
                <TableCell align="right">{item.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageUser;
