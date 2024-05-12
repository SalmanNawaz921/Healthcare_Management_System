import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { doctorOptions } from "../../constants/constants";
import logo from "../../assets/logo.png";
import { adminOptions } from "../../constants/constants";
import roleContext from "@/context/RoleContext/roleContext";
const NavLinks = ({ options, username, handleClick, type }) => (
  <div className="mt-10 ml-10">
    {console.log(options)}
    {options?.map((option) => (
      <NavLink
        key={option.value}
        to={
          option.label === "Logout"
            ? "/" // If it's the logout option, use its specified route
            : `/${type}/${username}/${option.label.toLowerCase()}`
        }
        className="my-8 mr-5 font-medium flex flex-row items-center justify-start hover:text-[#bfbfbf] text-black"
        onClick={() => option.label==="Logout"? localStorage.clear() : handleClick && handleClick()}
      >
        {option.Icon && <option.Icon className="w-6 h-6 mx-5 text-2xl" />}
        {option.label}
      </NavLink>
    ))}
  </div>
);

const Sidebar = ({ options, username, type }) => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="mt-20 ">
      <img
        src={logo}
        alt="header_logo"
        className="w-full object-contain h-14 "
      />
      {/* {NavadminOptions()} */}
      <NavLinks username={username} options={options} type={type} />
    </div>
  );
};

export default Sidebar;
