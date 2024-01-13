import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
// ROUTER
import { Link } from "react-router-dom";
// ICONS
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaBagShopping } from "react-icons/fa6";
import emptyCart from "../../assets/empty_cart.jpg";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

//-----------------------------------------------------

function Cart() {
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const { userName, admin, numberWithCommas, setCartAnimate } =
		useContext(MyContext);

	// DLETE ITEM FROM CART
	const deleteItem = (item) => {
		toastRed();
		dispatch(deleteFromCart(item));
	};
	function toastRed() {
		toast.dismiss("Item Removed! ");
	}
	return (
		<>
			{/* FOR EMPTY CART */}
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
				// ----------------------------------------------------------
				<>
					{/*CART CONTET */}
					<h1 className="text-2xl font-bold  text-center md:text-left mb-5 underline underline-offset-8">
						Cart Items
					</h1>
					<section className="">
						{/*CARTS CONTAINER*/}
						<div className="flex flex-col-reverse  md:flex-row items-center md:items-start justify-center p-1 md:p-5 ">
							{/* CART ITEMS CONTAINER */}
							<div className="w-full md:w-2/3 ">
								{cartItems.map((item) => {
									return (
										<div
											key={item.id}
											className="md:w-[90%] p-5 mb-7 rounded-lg flex flex-col md:flex-row gap-8 relative items-center  md:hover:translate-x-2 transition border bg-gray-100 hover:shadow-xl hover:border hover:border-2"
										>
											<img
												src={item.img1}
												alt="product"
												className="rounded-md cursor-pointer w-[60%] md:w-[150px] object-contain"
											/>
											<div className="flex flex-col justify-between ">
												<div className="">
													<h3 className="font-semibold text-xl">
														{item.title}
													</h3>
													<p className="mt-2 text-gray-500">
														{item.description.slice(
															0,
															200,
														)}
													</p>
													<h3 className="font-semibold text-xl mt-2">
														₹{" "}
														{item.price
															? numberWithCommas(
																	item.price,
															  )
															: ""}
													</h3>
												</div>
												<div className="flex items-center justify-between mt-2">
													<div className="">
														<button className="bg-blue-500 w-[25px] rounded-sm  mx-2 text-lg  font-semibold cursor-pointer">
															-
														</button>
														<span className="mx-1 font-semibold text-lg border px-5 rounded border-gray-600">
															1
														</span>
														<button className="bg-blue-500 w-[25px] rounded-sm mx-2 text-lg font-semibold cursor-pointer ">
															+
														</button>
													</div>
													<MdDeleteForever
														className="text-3xl text-red-500 cursor-pointer"
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

							{/* BILLING */}
							<div className="border w-full md:w-1/3 p-6 rounded-lg bg-gray-100 shadow-xl hover:shadow-2xl transition">
								<div className="flex justify-between">
									<div>Price (2 Items)</div>
									<div className="font-bold">₹ 2000</div>
								</div>
								<div className="flex justify-between mt-3">
									<div>Shipping</div>
									<div className="font-bold">₹ 20</div>
								</div>
								<div className="flex justify-between mt-3">
									<div>5% Discount </div>
									<div className="font-bold">₹ 100</div>
								</div>
								<button className="rounded-lg text-center w-full mt-7 bg-orange-400 py-2 ">
									Buy Now
								</button>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
}

export default Cart;
