// ICONS
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import profile_avatar from "../../assets/profile_avatar.png";
import {
	IoLogoInstagram,
	IoLogoTwitter,
	IoLogoFacebook,
	IoLogoYoutube,
} from "react-icons/io";

// ---------------------------------------------------------------

function Sidebar({
	handleSideBar,
	userName,
	handleLogout,
	admin,
	sidebarToggle,
}) {
	return (
		<>
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
										src={profile_avatar}
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
									onClick={handleSideBar}
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
									onClick={handleSideBar}
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
								onClick={handleSideBar}
							>
								Electronics & Devices
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/mobiles"
									onClick={handleSideBar}
								>
									Mobiles
								</NavLink>
								<NavLink
									to="/products/laptops"
									onClick={handleSideBar}
								>
									Laptops
								</NavLink>
								<NavLink
									to="/products/tablets"
									onClick={handleSideBar}
								>
									Tablets
								</NavLink>
								<NavLink
									to="/products/smart_watches"
									onClick={handleSideBar}
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
								onClick={handleSideBar}
							>
								Men's Fashion
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/mens_shirts"
									onClick={handleSideBar}
								>
									Shirts & T-Shirt
								</NavLink>

								<NavLink
									to="/products/mens_footwear"
									onClick={handleSideBar}
								>
									Shoes & Sneakers
								</NavLink>
								<NavLink
									to="/products/mens_jackets"
									onClick={handleSideBar}
								>
									Mens Jackets
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/products/womens_fashion"
								className="font-semibold text-lg mb-2"
								onClick={handleSideBar}
							>
								Women's Fashion
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/womens_dress"
									onClick={handleSideBar}
								>
									Dresses
								</NavLink>
								<NavLink
									to="/products/womens_top"
									onClick={handleSideBar}
								>
									Tops western
								</NavLink>
								<NavLink
									to="/products/womens_footwear"
									onClick={handleSideBar}
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
								onClick={handleSideBar}
							>
								Kid's Fashion
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/kids_cloth"
									onClick={handleSideBar}
								>
									Kids Cloth
								</NavLink>
								<NavLink
									to="/products/kids_footwear"
									onClick={handleSideBar}
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
								onClick={handleSideBar}
							>
								Books
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/books_comics"
									onClick={handleSideBar}
								>
									Comics
								</NavLink>
								<NavLink
									to="/products/books_programming"
									onClick={handleSideBar}
								>
									Porgramming
								</NavLink>
								<NavLink
									to="/products/books_devotional"
									onClick={handleSideBar}
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
								onClick={handleSideBar}
							>
								Jewellery
							</Link>
							<ul className="flex flex-col leading-8">
								<NavLink
									to="/products/jewellery_gold"
									onClick={handleSideBar}
								>
									Gold
								</NavLink>
								<NavLink
									to="/products/jewellery_silver"
									onClick={handleSideBar}
								>
									Silver
								</NavLink>
								<NavLink
									to="/products/jewellery_platinum"
									onClick={handleSideBar}
								>
									Platinum
								</NavLink>
							</ul>
						</div>
						<hr />
						{/*Trending*/}
						<div className="p-4">
							<Link
								to="/customer_service"
								className="font-semibold text-lg mb-2 flex items-center gap-2"
								onClick={handleSideBar}
							>
								Customer Services
							</Link>
							<Link
								to="/customer_service"
								className=" mb-2 flex items-center gap-2"
								onClick={handleSideBar}
							>
								<FaPhoneAlt className="text-lg text-gray-600" />
								Tollfree Number
							</Link>
							<Link
								to="/customer_service"
								className=" mb-2 flex items-center gap-2"
								onClick={handleSideBar}
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
		</>
	);
}

export default Sidebar;
