import React from "react";
import logo from "../asset/image/icons8-blog-64.png";
import { Link } from "react-router-dom";
import ProfileLogo from "../asset/image/icons8-user-default-64.png";
import { useSelector, useDispatch } from "react-redux";

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
} from "flowbite-react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <Navbar fluid rounded className="shadow-xl">
      <Link to="/">
        <NavbarBrand>
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="font-lale self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            بلاگ
          </span>
        </NavbarBrand>
      </Link>

      <div className="flex md:order-2">
        {currentUser.username ? (
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
              <Link to="/profile">پروفایل</Link>
            </DropdownItem>
            <DropdownItem className="font-vazir">نشان شده ها</DropdownItem>

            <DropdownDivider />
            <DropdownItem className="font-vazir">خروج</DropdownItem>
          </Dropdown>
        ) : (
          <Button gradientDuoTone="purpleToBlue">Purple to Blue</Button>
        )}

        <NavbarToggle />
      </div>
      <NavbarCollapse className="font-vazir text-md">
        <NavbarLink href="#" className="ml-5">
          <Link to="/">خانه</Link>
        </NavbarLink>
        <NavbarLink href="#">
          <Link to="/about">درباره ما</Link>
        </NavbarLink>
        <NavbarLink href="#">
          <Link to="/blogs">بلاگ</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
