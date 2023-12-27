import React, { useEffect, useState } from "react";

function Homepage() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
			.then((data) => data.json())
			.then((res) => setData(res))
			.catch((error) => console.log(error));
	}, []);
	return (
		<>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
					{data.map((item, index) => (
						<div
							key={index}
							className="border border-gray-300 rounded-md p-5 transition"
						>
							{/*Product Image*/}
							<div className=" object-center object-cover h-[200px]">
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
							<button className="bg-orange-500 w-full py-1 rounded  ">
								Add To Cart
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Homepage;
