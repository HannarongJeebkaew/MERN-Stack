import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../layout/ResponsiveAppBar";
import Notfound404 from "../components/pages/Notfound404";
const UserRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  console.log("userRoute", user);
  return user && user.user.token ? (
    <>
      <ResponsiveAppBar/>
      {children}
    </>
  ) : (
    <Notfound404 text="No Login"></Notfound404>
  );
};

export default UserRoute;
