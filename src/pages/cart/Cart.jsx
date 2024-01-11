import React, { useContext } from "react";
import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaBagShopping } from "react-icons/fa6";
import emptyCart from "../../assets/empty_cart.jpg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	console.log(cartItems);
	const { userName, admin } = useContext(MyContext);
	const toastRed = () => toast.dismiss("Item Removed! ");

	const deleteItem = (item) => {
		toastRed();
		dispatch(deleteFromCart(item));
	};
	return (
		<>
			{cartItems.length === 0 ? (
				<div className="flex items-center flex-col gap-10 md:gap-14 justify-start mt-10 min-h-[90vh]">
					<img
						src={emptyCart}
						alt=""
						className="w-[50%] md:w-[18%] animate-pulse"
					/>
					<p className="text-2xl  md:text-3xl font-semibold">
						Your Cart is{" "}
						<span className="text-orange-500 ">Empty !</span>
					</p>
					<Link
						to="/"
						className="text-md md:text-lg font-semibold text-gray-900 bg-orange-500 px-8 py-3 rounded-3xl shadow-2xl hover:bg-orange-500 flex items-center gap-4"
					>
						<FaBagShopping /> Return to Shop
					</Link>
				</div>
			) : (
				<>
					<h1 className="text-2xl font-bold  text-center md:text-left">
						Cart
					</h1>
					<div className="flex gap-10 mt-5">
						<div className="flex flex-col gap-5 md:w-[70%]">
							{cartItems.map((item, index) => {
								return (
									<div
										className="flex gap-5 p-4 border rounded-xl "
										key={index}
									>
										<img
											src={item.img1}
											alt="product_image"
											className="w-[10%] cursor-pointer"
										/>
										<div>
											<h2>{item.title}</h2>
											<div className="flex items-center justify-between">
												<div>$ {item.price}</div>
												<RiDeleteBin6Fill
													className="text-red-500 text-2xl cursor-pointer"
													onClick={() =>
														deleteItem(item)
													}
												/>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="border md:w-[30%] max-h-[20vh] p-4 border rounded-xl">
							Buy
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Cart;
