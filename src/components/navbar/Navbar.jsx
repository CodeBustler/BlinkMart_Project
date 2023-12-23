import flag from "../../assets/flag.png";
import profileDefaultAvatar from "../../assets/profile-avatar.png";
import { BsSearch } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
	const [admin, setAdmin] = useState(true);
	const [sidebarToggle, setSidebarToggle] = useState(false);

	const handleNavLinkClick = () => {
		setSidebarToggle(!sidebarToggle);
	};

	return (
		<header className="flex flex-col">
			{/*FIRST ROW*/}
			<nav className="bg-[#131921] flex items-center justify-between px-4 py-3 gap-3  text-white ">
				<NavLink
					className="font-semibold text-sm flex gap-2 md:hidden"
					onClick={() => {
						handleNavLinkClick();
					}}
				>
					<RxHamburgerMenu className="text-2xl cursor-pointer" />
				</NavLink>
				{/*LOGO*/}
				<NavLink
					to="/"
					className="font-bold text-2xl flex items-center gap-1  "
				>
					<RiShoppingCartFill className="text-3xl text-orange-400" />
					<span className="hidden md:flex">BlinkMart</span>
				</NavLink>

				{/*SEARCH BAR*/}
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
				{/*NAV-LINKs*/}
				<ul className="flex items-center gap-5 ">
					<li className="flex items-center gap-1 hidden lg:flex">
						<img
							src={flag}
							alt="indian-flag"
							className="w-[27px] "
						/>
						<span className="font-semibold ">EN</span>
					</li>
					<NavLink
						to="/dashboard"
						className={`font-semibold cursor-pointer hidden md:block  ${
							admin ? "block" : "hidden"
						}`}
					>
						Dashboard
					</NavLink>

					{/*Cart Icon*/}
					<NavLink className="flex items-center gap-1" to="/cart">
						<LuShoppingCart className="text-3xl cursor-pointer " />
						<span className="text-md md:text-lg font-bold text-orange-400">
							{12}
						</span>
					</NavLink>
				</ul>
			</nav>
			{/*SECOND ROW*/}
			<ul className="bg-[#232F3E] px-5 py-2 flex items-center  gap-x-8 gap-y-4 hidden md:flex flex-wrap text-white  ">
				{/*ALL PRODUCTS*/}
				<NavLink
					className="font-semibold text-sm flex gap-2"
					onClick={handleNavLinkClick}
				>
					<RxHamburgerMenu className="text-xl cursor-pointer " />
					All
				</NavLink>
				<NavLink
					to="/products/electronics_and_devices"
					className="font-semibold text-sm"
				>
					Electronics & Devices
				</NavLink>
				<NavLink
					to="/products/mens_fashion"
					className="font-semibold text-sm"
				>
					Men's Fashion
				</NavLink>
				<NavLink
					to="/products/womens_fashion"
					className="font-semibold text-sm"
				>
					Women's Fashion
				</NavLink>
				<NavLink
					to="/products/kids_fashion"
					className="font-semibold text-sm"
				>
					Kid's Fashion
				</NavLink>
				<NavLink
					to="/products/jewellery"
					className="font-semibold text-sm"
				>
					Jewellery
				</NavLink>
				<NavLink to="/products/books" className="font-semibold text-sm">
					Books
				</NavLink>

				<NavLink
					to="/customer_service"
					className="font-semibold text-sm flex items-center gap-2"
				>
					<FaPhoneAlt />
					Customer Service
				</NavLink>
			</ul>

			{/*BG TRANSPARENT*/}
			<div
				className={`w-[100%] h-[100vh] absolute text-lg text-orange-400 z-0 bg-black transition delay-1000 ${
					sidebarToggle ? "hidden" : "opacity-60 "
				}`}
			></div>

			{/*SIDEBAR*/}
			<aside
				className={`absolute   w-[100%] h-[100vh]   transition flex justify-between ${
					sidebarToggle ? "-translate-x-full  " : "translate-x-0"
				}`}
			>
				{/* SIDEBAR CONTENT*/}
				<div className={`bg-white shadow-2xl `}>
					<h1 className="bg-[#232F3E] text-white py-3 px-4 flex items-center gap-5 font-semibold text-lg sticky top-0 ">
						<div className="flex items-center gap-3">
							<img
								src={profileDefaultAvatar}
								alt="avatar"
								className="w-[36px]"
							/>
							<span>Hello, Username</span>
						</div>
						<AiOutlineClose
							className="text-3xl  right-4 top-4 cursor-pointer transition  text-red-500 "
							onClick={handleNavLinkClick}
						/>
					</h1>
					{/*SIDEBAR SECTION*/}
					<div className="pl-3 overflow-y-scroll h-[90vh] ">
						{/*Trending*/}
						<div className="p-4">
							<NavLink
								to="/products/electronics_and_devices"
								className="font-semibold text-lg mb-2"
							>
								Electronics & Devices
							</NavLink>
							<ul className="flex flex-col leading-8">
								<NavLink to="/products/mobiles">
									Mobiles
								</NavLink>
								<NavLink to="/products/laptops">
									Laptops
								</NavLink>
								<NavLink to="/products/tablets">
									Tablets
								</NavLink>
								<NavLink to="/products/wearable_devices">
									Wearable Devices
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<NavLink
								to="/products/electronics_and_devices"
								className="font-semibold text-lg mb-2"
							>
								Men's Fashion
							</NavLink>
							<ul className="flex flex-col leading-8">
								<NavLink to="/products/mens_shirts">
									Shirts & T-Shirt
								</NavLink>

								<NavLink to="/products/mens_shoes">
									Shoes & Sneakers
								</NavLink>
								<NavLink to="/products/mens_shoes">
									Leather Jackets
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<NavLink
								to="/products/electronics_and_devices"
								className="font-semibold text-lg mb-2"
							>
								Women's Fashion
							</NavLink>
							<ul className="flex flex-col leading-8">
								<NavLink to="/products/womens_dress">
									Dresses
								</NavLink>
								<NavLink to="/products/womens_top">
									Tops western
								</NavLink>
								<NavLink to="/products/womens_footwear">
									Footwear
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<NavLink
								to="/products/books"
								className="font-semibold text-lg mb-2"
							>
								Books
							</NavLink>
							<ul className="flex flex-col leading-8">
								<NavLink to="/products/books_comics">
									Comics
								</NavLink>
								<NavLink to="/products/books_programming">
									Porgramming
								</NavLink>
								<NavLink to="/products/books_devotional">
									Devotional
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<NavLink
								to="/products/jewellery"
								className="font-semibold text-lg mb-2"
							>
								Jewellery
							</NavLink>
						</div>
					</div>
				</div>
			</aside>
		</header>
	);
}

export default Navbar;
