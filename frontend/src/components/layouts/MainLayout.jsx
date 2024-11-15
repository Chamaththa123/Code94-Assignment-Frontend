import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../Header";

export const MainLayout = () => {
  const location = useLocation();

  // Accessing user and token from the Redux store
  const { user, token } = useSelector((state) => state.auth);

  // useEffect hook to handle query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userString = queryParams.get("user");
    const token = queryParams.get("token");

    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      setToken(token);
    }
  }, [location.search]);

  ////check whether user is logged
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="bg-[#FFFFFF] px-[5%] py-[2%]">
      <Header />
      <Outlet />
    </section>
  );
};
