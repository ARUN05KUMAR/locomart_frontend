import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdContentPasteSearch } from "react-icons/md";
import { GrContactInfo, GrMapLocation } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import { FaAirbnb } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const SIDE_BAR_LINKS = [
  {
    key: "Dashboard",
    label: "Dashboard",
    path: "/",
    icon: <RxDashboard />,
  },
  {
    key: "Scheduler",
    label: "Scheduler",
    path: "/schedulerManagement",
    icon: <GrContactInfo />,
  },
  {
    key: "CrewInfo",
    label: "Crew Info",
    path: "/crewInfo",
    icon: <FaAirbnb />,
  },
  {
    key: "busDetails",
    label: "Bus Info",
    path: "/busInfo",
    icon: <FaAirbnb />,
  },
];

const LOGOUT_LINK = {
  key: "auth",
  label: "Logout",
  path: "/login",
  icon: <TbLogout2 />,
  theme: "red",
};

const themeClasses = {
  red: "text-red-500 hover:bg-gray-700",
};

const SideBar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || SIDE_BAR_LINKS[0].key,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("isSidebarOpen")) ?? true,
  );
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink, isSidebarOpen]);

  const handleLinkClick = (key, path) => {
    if (key === LOGOUT_LINK.key) {
      localStorage.clear();
      navigate(LOGOUT_LINK.path);
    } else {
      setActiveLink(key);
      navigate(path);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmenuToggle = (key) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <div className="min-h-screen">
      {/* Hamburger Icon */}
      {!isSidebarOpen && (
        <div
          className="fixed top-5 left-7 z-50 cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <RxHamburgerMenu size={30} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen bg-[#320d4b] text-gray-300 flex flex-col justify-between transition-[transform,width] duration-700 ease-in-out ${
          isSidebarOpen ? "translate-x-0 w-[16%]" : "translate-x-0 w-[6%]"
        }`}
      >
        {/* Sidebar Header */}
        <div className="w-full flex items-center justify-center p-8 bg-[#081830] opacity-90">
          {isSidebarOpen && (
            <h1 className="md:text-2xl wide:text-3xl xl hover:text-[#ffc404] font-semibold">
              Pondy Bus
              <div className="text-sm flex justify-center items-center gap-2">
                Scheduler <FaAirbnb className="text-xl" />
              </div>
            </h1>
          )}
        </div>

        {/* Navigation Links */}
        <nav className={isSidebarOpen ? `p-8` : "p-4"}>
          <ul className="flex flex-col gap-4">
            {SIDE_BAR_LINKS.map((link) => (
              <React.Fragment key={link.key}>
                <li
                  className={`rounded-md flex gap-4 ${
                    isSidebarOpen ? "" : "justify-center"
                  } items-center p-3 cursor-pointer text-lg ${
                    activeLink === link.key
                      ? "bg-[#90e1ef7e] text-[#fff]"
                      : themeClasses[link.theme] ||
                        "text-gray-300 hover:bg-[#6c757d5e] hover:duration-200"
                  }`}
                  onClick={() => {
                    if (link.subDivisons) {
                      handleSubmenuToggle(link.key);
                    } else {
                      handleLinkClick(link.key, link.path);
                    }
                  }}
                >
                  <div className="text-2xl">{link.icon}</div>
                  {isSidebarOpen && (
                    <span className="font-medium text-sm md:text-lg extraWide:text-2xl">
                      {link.label}
                    </span>
                  )}
                  {link.subDivisons && (
                    <span className="text-lg ml-2">
                      {openSubmenu === link.key ? "▼" : "▶"}
                    </span>
                  )}
                </li>

                {/* Submenu */}
                {link.subDivisons && openSubmenu === link.key && (
                  <ul className="ml-8 flex flex-col">
                    {link.subDivisons.map((subLink) => (
                      <li
                        key={subLink.key}
                        className={`rounded-md flex gap-4 m-1 items-center p-2 cursor-pointer text-lg ${
                          activeLink === subLink.key
                            ? "bg-[#90e1ef7e] text-[#fff]"
                            : "text-gray-300 hover:bg-[#6c757d5e] hover:duration-200"
                        }`}
                        onClick={() =>
                          handleLinkClick(subLink.key, subLink.path)
                        }
                      >
                        <div className="text-2xl">{subLink.icon}</div>
                        {isSidebarOpen && (
                          <span className="font-medium text-sm md:text-lg extraWide:text-2xl">
                            {subLink.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div
          className={
            isSidebarOpen
              ? `mb-20 ml-8 w-2/3`
              : " w-full flex justify-center mb-20"
          }
        >
          <li
            className={`rounded-md flex items-center gap-4 p-3 cursor-pointer text-lg ${
              activeLink === LOGOUT_LINK.key
                ? "bg-[#0ea5e9] text-[#fff]"
                : themeClasses[LOGOUT_LINK.theme] ||
                  "text-gray-300 hover:bg-[#6c757d] hover:duration-200"
            }`}
            onClick={() => handleLinkClick(LOGOUT_LINK.key, LOGOUT_LINK.path)}
          >
            <div className="text-2xl">{LOGOUT_LINK.icon}</div>
            {isSidebarOpen && (
              <span className="font-medium">{LOGOUT_LINK.label}</span>
            )}
          </li>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
