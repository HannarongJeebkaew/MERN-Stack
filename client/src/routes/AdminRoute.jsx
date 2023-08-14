import React, { useState } from "react";
import { Children } from "react";
import SideBar from "../layout/SideBar";
import HeaderBar from "../layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import { Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Notfound404 from "../components/pages/Notfound404";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [statusAdminCheck,setStatusAdminCheck] = useState(true)
  useEffect(() => {
    if (user&&user.user.token) {
      currentUser(user.user.token)
        .then((res) => {
          console.log(res);
          if(res.data.role==="admin"){
            setStatusAdminCheck(true)
          }else{
            setStatusAdminCheck(false)
          }
        })
        .catch((err) => {
          setStatusAdminCheck(false)
          console.log(err);
        });
    }
  }, [user]);
  const currentUser = async (idToken) =>
      await axios.post(
        import.meta.env.VITE_REACT_APP_API + "/current-admin",
        {},
        {
          headers: {
            authtoken: idToken,
          },
        }
      );
  return statusAdminCheck ? (
    <div className="app">
  
      <SideBar />
      <main className="content">
        <HeaderBar />
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : <Notfound404 text="No Permission !!!"></Notfound404>
};

export default AdminRoute;
