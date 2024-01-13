import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import no_image from "../../assets/no_image.png";
import { MyContext } from "../../App";

const ProductCard = ({ item }) => {
	const {
		loading,
		numberWithCommas,
		allProducts,
		scrollToTop,
		cartItems,
		setItemInCart,
	} = useContext(MyContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [itemInCart, setLocalItemInCart] = useState("Add To Cart");
	const { handleCartAnimate } = useContext(MyContext);
	const toastInfo = () => toast.info("Log in to add items to your cart");
	const toastGreen = () => toast.success("Added To Cart !");

	useEffect(() => {
		// Check if the item is in the cart
		const isItemInCart = cartItems.some((cItem) => cItem.id === item.id);

		// Update local state based on the result
		setLocalItemInCart(isItemInCart ? "In Basket" : "Add To Cart");
	}, [cartItems, item.id]);

	const addCart = () => {
		const user = localStorage.getItem("user");
		if (user) {
			// Check if the item is already in the cart
			const isItemInCart = cartItems.some(
				(cItem) => cItem.id === item.id,
			);

			if (isItemInCart) {
				setItemInCart("In Basket");
			} else {
				// Use the callback form of setState
				setLocalItemInCart("Adding");

				dispatch(
					addToCart(item, () => setLocalItemInCart("In Basket")),
				);
				handleCartAnimate();
			}
		} else {
			navigate("/login");
			toastInfo();
		}
	};

	return (
		<div className="border border-gray-300 rounded-md p-5 transition bg-white  flex flex-col justify-between flex-shrink-0 h-[320px] w-[95%] md:w-[240px] hover:border-gray-400 hover:shadow-xl transition">
			{/* PRODUCT IMAGE */}
			<img
				src={item?.img1 || no_image}
				alt="product-image"
				className="object-contain w-[100%] h-[60%] cursor-pointer transition hover:scale-105 block"
				onClick={() => {
					navigate(`/ProductDetail/${item.id}`);
					scrollToTop();
				}}
			/>
			{/* PRODUCT DETAILS */}
			<div className="flex flex-col gap-1">
				<h2 className="font-bold text-xl text-gray-500">
					₹ {numberWithCommas(item.price)}
				</h2>
				<h2 className="font-bold hover:underline cursor-default">
					{item.title}
				</h2>

				<button
					className="bg-orange-400 w-full py-1 mt-2 rounded active:bg-orange-300 transition"
					onClick={addCart}
				>
					{itemInCart}
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
