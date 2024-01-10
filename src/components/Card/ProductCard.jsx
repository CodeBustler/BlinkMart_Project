import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ item, numberWithCommas }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toastInfo = () => toast.info("Log in to add items to your cart");

	const addCart = () => {
		const user = localStorage.getItem("user");
		if (user) {
			dispatch(addToCart(item));
		} else {
			navigate("/login");
			toastInfo();
		}
	};

	return (
		<div className="border border-gray-300 rounded-md p-5 transition bg-white h-[340px] flex flex-col justify-between flex-shrink-0  ">
			{/* Product Image */}
			<div className=" h-[60%] md:h-[55%] md:w-[220px]">
				<img
					src={item.img1}
					alt="product-image"
					className={`object-contain w-[100%] h-[100%] cursor-pointer transition hover:scale-105 block ${
						item.subCategory === "1.1" && item.brand === "apple"
							? "scale-[122%] hover:scale-[124%] "
							: ""
					}`}
					onClick={() => navigate(`/ProductDetail/${item.id}`)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-xl text-gray-500">
					₹ {numberWithCommas(item.price)}
				</h2>
				<h2 className="font-bold">{item.title}</h2>

				<button
					className="bg-orange-500 w-full py-1 mt-2 rounded active:bg-orange-400 transition"
					onClick={addCart}
				>
					Add To Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
