import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/NavigationContext";
import { Header } from "../Header";

export const MainLayout = () => {
  const [signOutVisible, setSignOutVisible] = useState(false);
  const { token, setUser, setToken } = useStateContext();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  const location = useLocation();
  const { user } = useStateContext();

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

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <section className="bg-[#FFFFFF] px-[5%] py-[2%]">
      <Header />
      <Outlet />
    </section>
  );
};
