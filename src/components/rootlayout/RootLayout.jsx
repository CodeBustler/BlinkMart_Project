import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function RootLayout() {
	return (
		<>
			<Navbar />
			<main className=" p-3 md:p-5 ">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default RootLayout;
