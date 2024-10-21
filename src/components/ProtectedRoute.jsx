import React from "react";
import Layout from "./Layout";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
