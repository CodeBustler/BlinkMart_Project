import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RiEBike2Fill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { PiKeyReturnFill } from "react-icons/pi";
import { FaListUl } from "react-icons/fa";
import AnimatedNumber from "../../components/AnimateText";
import ProductsTable from "./tableData/ProductsTable";
import OrdersTable from "./tableData/OrdersTable";
import UsersTable from "./tableData/UsersTable";

function Dashboard() {
	const [selectedButton, setSelectedButton] = useState("products");
	const { admin } = useContext(MyContext);
	const navigate = useNavigate();

	useEffect(() => {
		!admin && (navigate("/login"), navigate(0));
	});

	const renderComponents = () => {
		switch (selectedButton) {
			case "products":
				return <ProductsTable />;
			case "orders":
				return <OrdersTable />;
			case "users":
				return <UsersTable />;
			default:
				return null;
		}
	};
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
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={851}
										duration={3000}
									/>
								</div>
								<div className="font-semibold text-lg  text-gray-500">
									Total Products
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col cursor-pointer transition md:hover:-translate-y-2  ">
								<RiEBike2Fill className="text-5xl text-blue-400 " />
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={851}
										duration={3000}
									/>
								</div>
								<div className="font-semibold text-lg  text-gray-500">
									Total Orders
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col  cursor-pointer transition md:hover:-translate-y-2  ">
								<PiUsersThreeFill className="text-5xl text-green-400 " />
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={851}
										duration={3000}
									/>
								</div>
								<div className="font-semibold text-lg text-gray-500">
									Total Users
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col  cursor-pointer transition md:hover:-translate-y-2 ">
								<PiKeyReturnFill className="text-5xl text-red-400" />
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={851}
										duration={3000}
									/>
								</div>
								<div className="font-semibold text-lg  text-gray-500">
									Return Products
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center flex-wrap gap-10 mt-16 ">
						<Link
							className="text-lg font-semibold border px-10 py-1 rounded text-purple-500 border-purple-500 flex items-center gap-3 active:bg-purple-500 active:text-white transition   "
							onClick={() => setSelectedButton("products")}
						>
							<FaListUl /> Products
						</Link>
						<Link
							className="text-lg font-semibold border px-10 py-1 rounded text-blue-500 border-blue-500 flex items-center gap-3 active:bg-blue-500 active:text-white transition   "
							onClick={() => setSelectedButton("orders")}
						>
							<FaListUl /> Orders
						</Link>
						<Link
							className="text-lg font-semibold border px-10 py-1 rounded text-green-500 border-green-500 flex items-center gap-3 active:bg-green-500 active:text-white transition   "
							onClick={() => setSelectedButton("users")}
						>
							<FaListUl /> Users
						</Link>
					</div>

					{renderComponents()}
				</div>
			) : (
				(navigate("/login"), navigate(0))
			)}
		</>
	);
}

export default Dashboard;
