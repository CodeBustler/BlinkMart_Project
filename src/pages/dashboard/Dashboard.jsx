import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RiEBike2Fill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { PiKeyReturnFill } from "react-icons/pi";
import { FaListUl } from "react-icons/fa";
import AnimatedNumber from "../../components/AnimateText";

function Dashboard() {
	const { admin } = useContext(MyContext);
	const navigate = useNavigate();

	return (
		<>
			{admin ? (
				<div>
					<h1 className="text-xl font-semibold text-center md:text-left">
						Dashboard
					</h1>
					<div className="container mx-auto mt-7 ">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-20 text-gray-800">
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col cursor-pointer transition md:hover:-translate-y-2 ">
								<BsFillBoxSeamFill className="text-5xl text-purple-400" />
								<div className="font-bold text-xl text-gray-600">
									<AnimatedNumber
										target={100}
										duration={2000}
									/>
								</div>
								<div className="font-semibold text-lg  text-gray-600">
									Total Products
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col cursor-pointer transition md:hover:-translate-y-2  ">
								<RiEBike2Fill className="text-5xl text-blue-400 " />
								<div className="font-bold text-xl text-gray-600">
									851
								</div>
								<div className="font-semibold text-lg  text-gray-600">
									Total Orders
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col  cursor-pointer transition md:hover:-translate-y-2  ">
								<PiUsersThreeFill className="text-5xl text-green-400 " />
								<div className="font-bold text-xl text-gray-600">
									851
								</div>
								<div className="font-semibold text-lg text-gray-600">
									Total Users
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col  cursor-pointer transition md:hover:-translate-y-2 ">
								<PiKeyReturnFill className="text-5xl text-red-400" />
								<div className="font-bold text-xl text-gray-600">
									851
								</div>
								<div className="font-semibold text-lg  text-gray-600">
									Return Products
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center gap-10 mt-16 ">
						<Link className="text-lg font-semibold border px-10 py-1 rounded text-purple-500 border-purple-500 flex items-center gap-3 active:bg-purple-500 active:text-white transition ">
							<FaListUl /> Products
						</Link>
						<Link className="text-lg font-semibold border px-10 py-1 rounded text-blue-500 border-blue-500 flex items-center gap-3 active:bg-blue-500 active:text-white transition ">
							<FaListUl /> Orders
						</Link>
						<Link className="text-lg font-semibold border px-10 py-1 rounded text-green-500 border-green-500 flex items-center gap-3 active:bg-green-500 active:text-white transition ">
							<FaListUl /> Users
						</Link>
					</div>
				</div>
			) : (
				(navigate("/login"), navigate(0))
			)}
		</>
	);
}

export default Dashboard;
