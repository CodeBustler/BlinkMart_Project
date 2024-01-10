// ROUTER
import { Link } from "react-router-dom";
// ICONS
import { RiShoppingCartFill } from "react-icons/ri";

// ---------------------------------------------------------------

function OnlyHomePageNavbar() {
	return (
		<nav className="bg-[#131921] flex items-center justify-between px-4 py-4 gap-3  text-white ">
			<Link
				to="/"
				className="font-bold text-2xl flex items-center gap-1  "
			>
				<RiShoppingCartFill className="text-3xl text-orange-400" />
				<span className="flex">BlinkMart</span>
			</Link>
		</nav>
	);
}

export default OnlyHomePageNavbar;
