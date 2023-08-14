import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import Formproduct from "./components/Formproduct";
import Login from "./components/pages/auth/login";
import FormEditProduct from "./components/FormEditProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Layout

import { CssBaseline, Box } from "@mui/material";

import Register from "./components/pages/auth/register";
//Admin
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";
//User
import HomePageUser from "./components/pages/user/HomePageUser";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import axios from "axios";
import { currentUser } from "./functions/product";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/userSlice";
import Notfound404 from "./components/pages/Notfound404";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import ManageUser from "./components/pages/admin/ManageUser";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = async (token) => {
      const res = await axios.post(
        import.meta.env.VITE_REACT_APP_API + "/current-user",
        {},
        {
          headers: {
            authtoken: token,
          },
        }
      );
      return res;
    };
    const idToken = localStorage.getItem("token");
    currentUser(idToken).then((res) => {
      dispatch(
        login({ name: res.data.name, role: res.data.role, token: idToken })
      );
    });
    console.log("run app");
  }, []);

  return (
    <BrowserRouter>
      <>
        <Routes>
          {/*UserRoute */}
          <Route
            path="*"
            element={
              <Notfound404 text="The page you’re looking for doesn’t exist."></Notfound404>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/"
            element={
              <ResponsiveAppBar>
                <HomePageUser></HomePageUser>
              </ResponsiveAppBar>
            }
          ></Route>
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <HomePageUser></HomePageUser>
              </UserRoute>
            }
          ></Route>
          {/*AdminRoute */}
          <Route
            path="/admin/viewtable"
            element={
              <AdminRoute>
                <Formproduct></Formproduct>
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomePageAdmin></HomePageAdmin>
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FormEditProduct></FormEditProduct>
              </AdminRoute>
            }
          ></Route>
           <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <ManageUser/>
              </AdminRoute>
            }
          ></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
