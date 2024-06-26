import React, { useEffect, useState } from "react";
import logo from "../asset/image/icons8-blog-64.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileLogo from "../asset/image/icons8-user-default-64.png";
import { useSelector, useDispatch } from "react-redux";
import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { MdOutlineSearch } from "react-icons/md";

import { toggleTheme } from "./redux/themeSlice";
import { signoutSuccess } from "./redux/UserSlice";

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  TextInput,
} from "flowbite-react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const searchTermFromURL = urlParam.get("searchTerm");
    if (searchTermFromURL) {
      setsearchTerm(searchTermFromURL);
    }
  }, [location.search]);

  const dispatch = useDispatch();
  useEffect(() => {
    switchHandler();
  }, []);
  const switchHandler = () => {
    dispatch(toggleTheme());
  };
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const searchhandler = async (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(location.search);
    urlParam.set("searchTerm", searchTerm);
    const searchQuery = urlParam.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar
      fluid
      rounded
      className="shadow-xl  dark:border-b dark:border-gray-400 dark:bg-gray-800">
      <NavbarBrand className="flex items-center justify-center gap-x-4">
        <Link to="/" className="flex items-center justify-center gap-x-1">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="font-lale self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            بلاگ
          </span>
        </Link>
        <button onClick={switchHandler}>
          {theme === "dark" ? (
            <LuSun className="w-6" />
          ) : (
            <LuMoon className="w-6" />
          )}
        </button>
      </NavbarBrand>

      <div className="flex md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={true}
            inline
            label={<Avatar alt="User settings" img={ProfileLogo} rounded />}>
            <DropdownHeader>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </DropdownHeader>
            <DropdownItem className="font-vazir">
              <Link to="/dashboard">پروفایل</Link>
            </DropdownItem>
            <DropdownItem className="font-vazir">نشان شده ها</DropdownItem>

            <DropdownDivider />
            <DropdownItem onClick={handleSignout} className="font-vazir">
              خروج
            </DropdownItem>
          </Dropdown>
        ) : (
          <Button gradientDuoTone="purpleToBlue" className="font-vazir ">
            <Link to="/login">ورود/ثبت نام</Link>
          </Button>
        )}

        <NavbarToggle />
      </div>
      <NavbarCollapse className="font-vazir font-semibold text-md md:text-lg ">
        <NavbarLink className="ml-5 ">
          <Link to="/" className="text-lg dark:text-gray-200">
            خانه
          </Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/about" className="text-lg dark:text-gray-200">
            درباره ما
          </Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/blogs" className="text-lg dark:text-gray-200">
            بلاگ
          </Link>
        </NavbarLink>
      </NavbarCollapse>
      <form onSubmit={searchhandler}>
        <TextInput
          value={searchTerm}
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
          type="text"
          icon={MdOutlineSearch}
          placeholder="جستجو"
          className="py-1 px-2 rounded-md font-vazir text-gray-700 dark:text-white placeholder:text-gray-400 "
        />
      </form>
    </Navbar>
  );
}
