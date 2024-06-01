import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
const NavLinks = ({ options, username, handleClick, type,setMenuOpen }) => (
  <div className="mt-10 ml-10">
    {options?.map((option) => (
      <NavLink
        key={option.value}
        to={
          option.label === "Logout"
            ? "/" // If it's the logout option, use its specified route
            : `/${type}/${username}/${option.label.toLowerCase()}`
        }
        className="my-8 mr-5 font-medium flex flex-row items-center justify-start hover:text-[#bfbfbf] text-black"
        onClick={() => option.label==="Logout"? localStorage.clear() :setMenuOpen(false)}
      >
        {option.Icon && <option.Icon className="w-6 h-6 mx-5 text-2xl" />}
        {option.label}
      </NavLink>
    ))}
  </div>
);

const Sidebar = ({ options, username, type }) => {

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
