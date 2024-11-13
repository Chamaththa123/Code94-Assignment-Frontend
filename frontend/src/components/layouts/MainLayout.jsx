import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Burger, ArrowBack } from "../../utils/icons";
import { SideBar } from "./SideBar";
import { Tooltip } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../contexts/NavigationContext";
import { subPathLinks } from "../../utils/dataArrays";
import { Header } from "../Header";

export const MainLayout = ({ selectedItem }) => {
  const [signOutVisible, setSignOutVisible] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const dropdownRef = useRef(null);
  const sideBardownRef = useRef(null);
  const sideBarButtondownRef = useRef(null);
  const { token, setUser, setToken } = useStateContext();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  // const [sidebarExpanded, setSidebarExpanded] = useState(true);
  // const toggleSidebarExpand = () => {
  //   setSidebarExpanded((cur) => !cur);
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setSignOutVisible(false);
  //     }
  //     if (
  //       sideBardownRef.current &&
  //       !sideBardownRef.current.contains(event.target)
  //     ) {
  //       if (
  //         sideBarButtondownRef.current &&
  //         sideBarButtondownRef.current.contains(event.target)
  //       ) {
  //         setSidebar(true);
  //       } else {
  //         setSidebar(false);
  //       }
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

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
       
          <Header/>
          <Outlet />

    </section>
  );
};
