// ROUTER
import { Link, useNavigate } from "react-router-dom";
// ICONS
import { RiShoppingCartFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { MyContext } from "../../App";
import { useContext } from "react";
import { toast } from "react-toastify";

// ---------------------------------------------------------------

function OnlyHomePageNavbar() {
	const navigate = useNavigate();
	const toastLogout = () => toast.error("Logout !");

	const { userName, setUserName, admin, setAdmin } = useContext(MyContext);

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

	return (
		<nav className="bg-[#131921] flex items-center justify-between px-4 py-4 gap-3  text-white ">
			<Link
				to="/"
				className="font-bold text-2xl flex items-center gap-1  "
			>
				<RiShoppingCartFill className="text-3xl text-orange-400" />
				<span className="flex">BlinkMart</span>
			</Link>
			<div className="flex items-center gap-5">
				<RiAdminFill className="text-2xl text-orange-400" />
				<Link
					className="text-xl font-semibold underline underline-heading underline-offset-4"
					onMouseDown={handleLogout}
				>
					Logout
				</Link>
			</div>
		</nav>
	);
}

export default OnlyHomePageNavbar;
