import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

function Homepage() {
	const { products, loading } = useContext(MyContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItem = useSelector((state) => state.cart);

	console.log(cartItem);

	const addCart = (item) => {
		const user = localStorage.getItem("user");
		user ? dispatch(addToCart(item)) : navigate("/login");
	};

	const deleteCart = (item) => {
		dispatch(deleteFromCart(item.id));
	};

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
										onError={(e) => {
											e.target.src =
												"https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png";
										}}
									/>
								</div>
								<h2 className="my-3 font-bold">
									{item.title.slice(0, 20)}...
								</h2>
								<h2 className="my-2 font-bold text-xl text-gray-500">
									$ {item.price}
								</h2>
								<button
									className="bg-orange-500 w-full py-1 rounded"
									onClick={() => addCart(item)}
								>
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
