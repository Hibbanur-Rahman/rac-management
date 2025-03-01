import Navbar from "@/components/navbar";
import Dashboard from "@/views/dashboard/dashboard";
import Sidebar from "@/components/sidebar";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import Profile from "@/views/dashboard/profile";

import { setMobileView } from "@/redux/slices/sidebarSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state?.sidebar);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");

    if (accessToken && userData) {
      dispatch(login(JSON.parse(userData)));
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      dispatch(setMobileView(isMobile));
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  return (
    <div className="bg-gray-100">
      <div
        className="w-full flex gap-[30px]  h-[100vh] overflow-hidden pt-5"
        style={{ scrollbarWidth: "none" }}
      >
        <div
          className={`transition-all duration-500 md:w-[300px] w-[250px] absolute md:relative  z-10 ${
            isOpen ? "left-0" : "left-[-250px]"
          } `}
        >
          <Sidebar role={user?.role} />
        </div>
        <div
          className="w-full h-full overflow-y-scroll pe-5"
          style={{ scrollbarWidth: "none" }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
