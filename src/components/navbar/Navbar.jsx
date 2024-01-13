import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
// COMPONENTS
import NavbarFirstRow from "./NavbarFirstRow";
import NavbarSecondRow from "./NavbarSecondRow";
import Sidebar from "./Sidebar";
// ROUTER & REDUX
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// FIREBASE
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
// TOASTIFY
import { toast } from "react-toastify";

// ---------------------------------------------------------------

function Navbar() {
	const [sidebarToggle, setSidebarToggle] = useState(true);
	const navigate = useNavigate();

	const cartItems = useSelector((state) => state.cart);

	const {
		userName,
		setUserName,
		admin,
		setAdmin,
		cartAnimate,
		setCartAnimate,
	} = useContext(MyContext);
	const toastLogout = () => toast.error("Logout !");

	useEffect(() => {
		const userDetail = JSON.parse(localStorage.getItem("user"));
		if (userDetail) {
			setAdmin(userDetail.user.email === "admin@blinkmart.com");
		}
	}, []);

	const handleSideBar = () => {
		setSidebarToggle(!sidebarToggle);
	};

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				setUserName(null);
				setAdmin(false);
				userName && toastLogout();
				localStorage.removeItem("user");

				navigate("/login");
				console.log("Signed out successfully");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// ---------------------------------------------------------------

	return (
		<header className="flex flex-col sticky top-0 z-10">
			{/* FIRST ROW */}
			<NavbarFirstRow
				handleSideBar={handleSideBar}
				admin={admin}
				cartItems={cartItems}
				cartAnimate={cartAnimate}
			/>

			{/* SECOND ROW */}
			<NavbarSecondRow handleSideBar={handleSideBar} />

			{/* SIDEBAR */}
			<Sidebar
				sidebarToggle={sidebarToggle}
				handleSideBar={handleSideBar}
				userName={userName}
				handleLogout={handleLogout}
				admin={admin}
			/>
		</header>
	);
}

export default Navbar;
