// ROUTER
import { Link, NavLink } from "react-router-dom";
// ICONS
import { RxHamburgerMenu } from "react-icons/rx";
import { RiShoppingCartFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import flag_icon from "../../assets/flag_icon.png";
import { useState } from "react";

// ---------------------------------------------------------------

function NavbarFirstRow({ handleSideBar, admin, cartItems, cartAnimate }) {
  const handleAnimateCart = () => {
    console.log("Hello");
  };

  return (
    <nav className="bg-[#131921] flex items-center justify-between px-4 py-3 gap-3  text-white ">
      <Link
        className="font-semibold text-sm flex gap-2 md:hidden"
        onClick={() => {
          handleSideBar();
        }}
      >
        <RxHamburgerMenu className="text-2xl cursor-pointer" />
      </Link>
      {/* LOGO */}
      <Link to="/" className="font-bold text-2xl flex items-center gap-1  ">
        <RiShoppingCartFill className="text-3xl text-orange-400" />
        <span className="hidden md:flex">BlinkMart</span>
      </Link>

      {/* SEARCH BAR */}
      <div className="flex items-stretch justify-between bg-white rounded w-[75%] md:w-[60%]  ">
        <input
          type="text"
          placeholder="Search "
          className="bg-transparent outline-none px-4 py-2 text-black text-md w-[100%] "
        />
        <div className="bg-orange-400 flex items-center rounded-br rounded-tr cursor-pointer">
          <BsSearch className="text-black text-xl mx-3" />
        </div>
      </div>
      {/* NAV-LINKs */}
      <ul className="flex items-center gap-5 ">
        <li className="flex items-center gap-1 hidden lg:flex">
          <img src={flag_icon} alt="indian-flag" className="w-[27px] " />
          <span className="font-semibold ">EN</span>
        </li>
        {admin && (
          <NavLink
            to="/dashboard"
            className={`font-semibold cursor-pointer hidden md:block   ${
              admin ? "block" : "hidden"
            }`}
          >
            Dashboard
          </NavLink>
        )}

        {/* Cart Icon */}
        <NavLink className="flex items-center gap-1" to="/cart">
          <LuShoppingCart
            className={`text-3xl cursor-pointer  ${
              cartAnimate ? "animate-bounce" : ""
            }  `}
          />
          <span className="text-md md:text-lg font-bold text-orange-400">
            {cartItems.length}
          </span>
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavbarFirstRow;
