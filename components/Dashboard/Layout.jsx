/* eslint-disable @next/next/no-img-element */
import { MdOutlineNotificationsNone } from "react-icons/md";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { Logo } from "../../assets/images";

import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames";

import { useRef, useMemo } from "react";
import { useRouter } from "next/router";

import {
  MdSensors,
  MdOutlineSettings,
  MdOutlineDashboard,
} from "react-icons/md";
import { IoFootstepsOutline } from "react-icons/io5";
import { BiWalletAlt, BiCalculator } from "react-icons/bi";
const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: <MdOutlineDashboard size="32" />,
    link: "/dashboard",
  },
  {
    id: 2,
    label: "My Sensor",
    icon: <MdSensors size="32" />,
    link: "/dashboard/sensor",
  },
  {
    id: 3,
    label: "My Wallet",
    icon: <BiWalletAlt size="32" />,
    link: "/dashboard/wallet",
  },
  {
    id: 4,
    label: "Carbon Calculator",
    icon: <BiCalculator size="32" />,
    link: "/dashboard/carbon-calculator",
  },
  {
    id: 5,
    label: "Footprint Profile",
    icon: <IoFootstepsOutline size="32" />,
    link: "/dashboard/footprint",
  },
  {
    id: 6,
    label: "Settings",
    icon: <MdOutlineSettings size="32" />,
    link: "/dashboard/settings",
  },
];
const Layout = ({ children, title, showSearch }) => {
  const navRef = useRef();

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );
  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer mb-2 hover:bg-white rounded w-full text-black overflow-hidden whitespace-nowrap",
      {
        ["bg-white text-primary "]: activeMenu.id === menu.id,
      }
    );
  };
  //get classlist from react ref

  const onToggleMenu = (e) => {
    e["name"] = e.name === "menu" ? "close" : "menu";

    navRef.current.classList.toggle("top-[10%]");
  };
  return (
    <div className=" flex flex-row font-Grotesk w-full justify-start h-min">
      <Sidebar />
      <div className=" flex-1 bg-white-400 flex-col justify-between py-4 pr-6 sm:pr-12 pl-6 text-black ">
        <div className="flex justify-between flex-1 items-center w-full mb-12 ">
          <div className="h-[3rem] block w-[5rem] sm:hidden">
            <Link href="/" className="h-full block">
              <img
                src={Logo.src}
                alt=""
                className=" object-cover  w-full h-full"
              />
            </Link>
          </div>
          <div className=" font-black ">{title}</div>

          <div className="block cursor-pointer rounded sm:hidden bg-[#F7FDF3] p-2">
            <GiHamburgerMenu
              onClick={(e) => onToggleMenu(e)}
              name="menu"
              className="text-3xl text-primary h-6 w-6  block cursor-pointer sm:hidden"
            />
          </div>

          <div
            ref={navRef}
            className="nav-links z-[20] shadow-md duration-500 md:relative absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex sm:hidden items-center px-5"
          >
            <ul className="self-start flex md:flex-row flex-col md:items-center ]">
              {menuItems.map(({ icon: Icon, ...menu }, index) => {
                const classes = getNavItemClasses(menu);
                return (
                  <div key={index} className={classes}>
                    <Link
                      href={menu.link}
                      className={classNames(
                        "flex py-4 px-4 gap-x-2  items-center  w-full h-full "
                      )}
                    >
                      <span className={classNames("text-md font-medium  ")}>
                        {menu.label}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="hidden sm:block ">
            <input
              type="text"
              className={` rounded-md border p-2 ${!showSearch && "hidden"}`}
              placeholder="Search by cities, countries,"
            />
          </div>
          <div className=" items-center justify-between gap-x-4 hidden sm:flex ">
            <div className="dropdown dropdown-end md:block hidden">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle hover:bg-primary hover:text-white"
              >
                <div className="indicator">
                  <MdOutlineNotificationsNone size="32" />
                  <span className="badge badge-sm indicator-item bg-primary text-white">
                    8
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-4 card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">No Notification</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-x-2 border p-1 rounded-lg">
              <span>Ayomide</span>
              <div className="dropdown dropdown-end ">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:bg-primary hover:text-white"
                >
                  <img src="/Frame262.png" alt="user Image" />
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link
                      href="/dashboard/settings"
                      className="justify-between"
                    >
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/settings">Settings</Link>
                  </li>
                  <li>
                    <Link href="/auth/login">Logout</Link>
                  </li>
                  <li className="block md:hidden justify-between">
                    <a>
                      Notifications <span className="badge">8</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
