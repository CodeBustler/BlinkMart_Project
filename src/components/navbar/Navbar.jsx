import {
	IoLogoFacebook,
	IoLogoInstagram,
	IoLogoTwitter,
	IoLogoYoutube,
} from "react-icons/io";
import flag from "../../assets/flag.png";
import profileDefaultAvatar from "../../assets/profile-avatar.png";
import { BsSearch } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MyContext } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
	const [sidebarToggle, setSidebarToggle] = useState(true);
	const { userName, setUserName, admin } = useContext(MyContext);
	const toastLogout = () => toast.error("Logout !");

	const handleNavLinkClick = () => {
		setSidebarToggle(!sidebarToggle);
	};

	const navigate = useNavigate();

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				setUserName("");
				userName && toastLogout();
				setTimeout(() => {
					navigate("/login");
				}, 2000);
				console.log("Signed out successfully");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<header className="flex flex-col sticky top-0 z-10">
			<ToastContainer
				position="bottom-center"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
				theme="colored"
			/>
			{/*FIRST ROW*/}
			<nav className="bg-[#131921] flex items-center justify-between px-4 py-3 gap-3  text-white ">
				<Link
					className="font-semibold text-sm flex gap-2 md:hidden"
					onClick={() => {
						handleNavLinkClick();
					}}
				>
					<RxHamburgerMenu className="text-2xl cursor-pointer" />
				</Link>
				{/*LOGO*/}
				<Link
					to="/"
					className="font-bold text-2xl flex items-center gap-1  "
				>
					<RiShoppingCartFill className="text-3xl text-orange-400" />
					<span className="hidden md:flex">BlinkMart</span>
				</Link>

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
				<div
					className="font-semibold text-sm flex gap-2 cursor-pointer"
					onClick={handleNavLinkClick}
				>
					<RxHamburgerMenu className="text-xl cursor-pointer " />
					All
				</div>
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
					sidebarToggle ? "hidden" : "opacity-70 "
				}`}
			></div>

			{/*SIDEBAR*/}
			<aside
				className={`absolute   w-[100%] h-[100vh]  transition flex justify-between z-10 ${
					sidebarToggle ? "-translate-x-full  " : "translate-x-0"
				}`}
			>
				{/* SIDEBAR CONTENT*/}
				<div className={`bg-white shadow-2xl `}>
					<div className="bg-[#232F3E] text-white py-3 px-3 flex items-center  font-semibold text-lg sticky top-0 ">
						<div className="flex flex-col gap-4 w-full">
							<div className="flex items-center justify-between gap-4 ">
								<div className="flex  items-center gap-2">
									<img
										src={profileDefaultAvatar}
										alt="avatar"
										className="w-[36px]"
									/>
									<span className="capitalize">
										Hello, &nbsp;
										{userName ? (
											userName
										) : (
											<Link
												to="/login"
												className="underline"
											>
												Login
											</Link>
										)}
									</span>
								</div>
								<AiOutlineClose
									className="text-2xl  right-4 top-4 cursor-pointer transition  text-red-500 "
									onClick={handleNavLinkClick}
								/>
							</div>
						</div>
					</div>
					{/*SIDEBAR SECTION*/}
					<div className="pl-3 overflow-y-scroll h-[90vh] ">
						<div className=" mx-3">
							{admin ? (
								<Link
									to="/dashboard"
									onClick={handleNavLinkClick}
									className=" mt-2 flex items-center justify-center bg-yellow-500 rounded py-2"
								>
									Dashboard
								</Link>
							) : (
								""
							)}
						</div>
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/products/electronics_and_devices"
								className="font-semibold text-lg mb-2"
								onClick={handleNavLinkClick}
							>
								Electronics & Devices
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/mobiles"
									onClick={handleNavLinkClick}
								>
									Mobiles
								</NavLink>
								<NavLink
									to="/products/laptops"
									onClick={handleNavLinkClick}
								>
									Laptops
								</NavLink>
								<NavLink
									to="/products/tablets"
									onClick={handleNavLinkClick}
								>
									Tablets
								</NavLink>
								<NavLink
									to="/products/wearable_devices"
									onClick={handleNavLinkClick}
								>
									Smart Watches
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/products/mens_fashion"
								className="font-semibold text-lg mb-2"
								onClick={handleNavLinkClick}
							>
								Men's Fashion
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/mens_shirts"
									onClick={handleNavLinkClick}
								>
									Shirts & T-Shirt
								</NavLink>

								<NavLink
									to="/products/mens_shoes"
									onClick={handleNavLinkClick}
								>
									Shoes & Sneakers
								</NavLink>
								<NavLink
									to="/products/jackets"
									onClick={handleNavLinkClick}
								>
									Leather Jackets
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/products/womens_fashion"
								className="font-semibold text-lg mb-2"
								onClick={handleNavLinkClick}
							>
								Women's Fashion
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/womens_dress"
									onClick={handleNavLinkClick}
								>
									Dresses
								</NavLink>
								<NavLink
									to="/products/womens_top"
									onClick={handleNavLinkClick}
								>
									Tops western
								</NavLink>
								<NavLink
									to="/products/womens_footwear"
									onClick={handleNavLinkClick}
								>
									Footwear
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/products/kids_fashion"
								className="font-semibold text-lg mb-2"
								onClick={handleNavLinkClick}
							>
								Kid's Fashion
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/kids_cloth"
									onClick={handleNavLinkClick}
								>
									Kids Cloth
								</NavLink>
								<NavLink
									to="/products/kids_footwear"
									onClick={handleNavLinkClick}
								>
									Kids Footwear
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/products/books"
								className="font-semibold text-lg mb-2"
								onClick={handleNavLinkClick}
							>
								Books
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/books_comics"
									onClick={handleNavLinkClick}
								>
									Comics
								</NavLink>
								<NavLink
									to="/products/books_programming"
									onClick={handleNavLinkClick}
								>
									Porgramming
								</NavLink>
								<NavLink
									to="/products/books_devotional"
									onClick={handleNavLinkClick}
								>
									Devotional
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/products/jewellery"
								className="font-semibold text-lg mb-2"
								onClick={handleNavLinkClick}
							>
								Jewellery
							</Link>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/customer_service"
								className="font-semibold text-lg mb-2 flex items-center gap-2"
								onClick={handleNavLinkClick}
							>
								Customer Services
							</Link>
							<Link
								to="/customer_service"
								className=" mb-2 flex items-center gap-2"
								onClick={handleNavLinkClick}
							>
								<FaPhoneAlt className="text-lg text-gray-600" />
								Tollfree Number
							</Link>
							<Link
								to="/customer_service"
								className=" mb-2 flex items-center gap-2"
								onClick={handleNavLinkClick}
							>
								<MdEmail className="text-lg text-gray-600" />
								Send a Mail
							</Link>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<div className="flex items-center gap-5 ">
								<a
									href="https://www.instagram.com/codebustler"
									target="_blank"
								>
									<IoLogoInstagram className="text-lg text-gray-500 hover:text-pink-600" />
								</a>
								<a
									href="https://www.twitter.com/codebustler"
									target="_blank"
								>
									<IoLogoTwitter className="text-lg text-gray-500 hover:text-blue-400" />
								</a>
								<a
									href="https://www.facebook.com/codebustler"
									target="_blank"
								>
									<IoLogoFacebook className="text-lg text-gray-500 hover:text-blue-500" />
								</a>

								<a
									href="https://www.youtube.com/@codebustler"
									target="_blank"
								>
									<IoLogoYoutube className="text-lg text-gray-500 hover:text-red-500" />
								</a>
							</div>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/login"
								className="flex items-center justify-center gap-2 bg-yellow-500 rounded py-2 "
								onClick={handleLogout}
							>
								{userName && (
									<RiLogoutBoxLine className="text-lg" />
								)}
								<span>{userName ? "Logout" : "Login"}</span>
							</Link>
						</div>
					</div>
				</div>
			</aside>
		</header>
	);
}

export default Navbar;
