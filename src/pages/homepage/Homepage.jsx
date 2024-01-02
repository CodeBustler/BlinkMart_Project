import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function Homepage({ admin }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://fakestoreapi.com/products",
				);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}

				const result = await response.json();
				setProducts(result);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
						{/*MAPPING PRODUCTS*/}
						{products.map((item, index) => (
							<div
								key={index}
								className="border border-gray-300 rounded-md p-5 transition"
							>
								{/* Product Image */}
								<div className="object-center object-cover h-[200px]">
									<img
										src={item.image}
										alt="product-image"
										className="object-contain w-[100%] h-[100%]"
									/>
								</div>
								<h2 className="my-3 font-bold">
									{item.title.slice(0, 20)}...
								</h2>
								<h2 className="my-2 font-bold text-xl text-gray-500">
									$ {item.price}
								</h2>
								<button className="bg-orange-500 w-full py-1 rounded">
									Add To Cart
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default Homepage;
