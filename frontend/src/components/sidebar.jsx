import { logout } from "@/redux/slices/authSlice";
import React from "react";
import toast from "react-hot-toast";
import { LuLayoutDashboard } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SiReacthookform } from "react-icons/si";
import { GiMedicines } from "react-icons/gi";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FiTrello } from "react-icons/fi";
import sidebarSupportImg from "../assets/images/sidebar-support-img.svg";
import { LuCalendarRange } from "react-icons/lu";
import { Calendar, FileText, MessageSquare, TrendingUp } from "lucide-react";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const role = user?.role;

  // Define role-based menu items
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LuLayoutDashboard,
      roles: ["admin", "coordinator", "supervisor", "scholar"],
    },
    {
      label: "Scholars List",
      path: "/dashboard/scholar-list",
      icon: LuNotebookPen,
      roles: ["admin", "coordinator", "supervisor"],
    },
    {
      label: "Supervisor List",
      path: "/dashboard/supervisor-list",
      icon: LuCalendarRange,
      roles: ["admin", "coordinator"],
    },
    {
      label: "Coordinator List",
      path: "/dashboard/coordinator-list",
      icon: GiMedicines,
      roles: ["admin", "coordinator"],
    },
    {
      label: "Research Progress",
      path: "/dashboard/research-progress", 
      icon: TrendingUp,
      roles: ["scholar"],
    },
    {
      label: "Documents",
      path: "/dashboard/documents",
      icon: FileText, 
      roles: ["scholar","supervisor"],
    },
    {
      label: "Meetings",
      path: "/dashboard/meetings",
      icon: Calendar, 
      roles: ["scholar","supervisor"],
    },
    {
      label: "Communication",
      path: "/dashboard/communication",
      icon: MessageSquare, 
      roles: ["scholar","supervisor"],
    },

    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: FaRegUser,
      roles: ["admin", "coordinator", "supervisor", "scholar"],
    },
  ];

  const handleLogout = () => {
    toast.success("Logout Successfully!");
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className="w-full flex flex-col justify-between bg-white shadow-xl p-4 px-2 h-full rounded-e-[50px] overflow-y-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="w-full">
        {menuItems
          .filter((item) => item.roles.includes(role)) // Filter items based on role
          .map((item) => (
            <div
              key={item.path}
              className={`my-2 flex w-full gap-[10px] items-center group ${
                location.pathname === item.path ? "bg-[#edecec]" : ""
              } hover:bg-[#edecec] rounded-xl py-2 px-2 cursor-pointer`}
              onClick={() =>
                item.label === "Logout"
                  ? handleLogout()
                  : navigate(`${item.path}`)
              }
            >
              <div
                className={`flex items-center justify-center p-2 ${
                  location.pathname === item.path
                    ? "bg-[#3345ea]"
                    : "bg-gray-200"
                } group-hover:bg-[#3345ea] rounded-lg`}
              >
                <item.icon
                  className={`text-xl ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-violet-900"
                  } group-hover:text-white`}
                />
              </div>
              <p>{item.label}</p>
            </div>
          ))}
      </div>
      <div className="w-full ">
        <div className="w-full bg-blue-700 rounded-2xl p-5">
          <h1 className="text-white text-xl font-semibold my-1">
            Support 24/7
          </h1>
          <p className=" text-white">Contacts us anytime</p>
          <button className="text-primary bg-white rounded-lg px-5 my-2 py-1 relative z-[3]">
            Start
          </button>
          <img
            src={sidebarSupportImg}
            alt=""
            className="h-[130px] w-[150px] relative z-[0] right-[-40px] mt-[-50px]"
          />
        </div>
        <div
          onClick={handleLogout}
          className="flex gap-[10px] items-center my-4 px-2 cursor-pointer"
        >
          <LuLogOut className="text-xl text-red-400" />
          <p className="text-base text-red-400">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
