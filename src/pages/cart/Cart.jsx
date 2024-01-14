import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FaBagShopping, FaMinus, FaPlus } from "react-icons/fa6";
import emptyCart from "../../assets/empty_cart.jpg";

function Cart() {
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userName, admin, numberWithCommas, setCartAnimate, scrollToTop } =
		useContext(MyContext);

	useEffect(() => {
		scrollToTop();
	}, []);

	// Product counts state
	const [productCounts, setProductCounts] = useState(
		cartItems.map(() => 1), // Initialize counts for each item to 1
	);

	const totalItems = productCounts.reduce(
		(total, element) => total + element,
		0,
	);
	// SUBTOTAL PRICE
	const cartProductsPrice = cartItems.reduce(
		(total, item, index) =>
			total + parseInt(item.price) * productCounts[index],
		0,
	);

	// TOTAL PRICE
	const totalAmount = cartProductsPrice + 20 + 100;

	// DELETE ITEM FROM CART
	const deleteItem = (item, index) => {
		toastRed();
		dispatch(deleteFromCart(item));
		// Remove the count for the deleted item
		setProductCounts((prevCounts) =>
			prevCounts.filter((_, i) => i !== index),
		);
	};

	function toastRed() {
		toast.dismiss("Item Removed! ");
	}

	// HANDLE PRODUCT COUNTER
	const handleProductCountMinus = (index) => {
		setProductCounts((prevCounts) =>
			prevCounts.map((count, i) =>
				i === index ? Math.max(count - 1, 1) : count,
			),
		);
	};

	const handleProductCountPlus = (index) => {
		setProductCounts((prevCounts) =>
			prevCounts.map((count, i) => (i === index ? count + 1 : count)),
		);
	};

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
				<>
					<h1 className="text-2xl font-bold  text-center md:text-left mb-5 underline underline-offset-8">
						Cart Items
					</h1>
					<section className="">
						<div className="flex flex-col-reverse  md:flex-row items-center md:items-start justify-center p-1 md:p-5 ">
							<div className="w-full md:w-2/3 ">
								{cartItems.map((item, index) => (
									<div
										key={item.id}
										className="md:w-[90%] p-5 mb-7 rounded-lg flex flex-col md:flex-row gap-8 relative items-center transition border bg-gray-100 hover:shadow-xl hover:border min-h-[280px] "
									>
										<img
											src={item.img1}
											alt="product"
											className="rounded-md cursor-pointer w-[60%] md:w-[150px] object-contain hover:scale-105 transition bg-white mt-5 md:mt-0"
											title="Tap to know more..."
											onClick={() => {
												navigate(
													`/ProductDetail/${item.id}`,
												);
												scrollToTop();
											}}
										/>
										<div className="flex flex-col justify-between ">
											<div className="">
												<div className="font-semibold text-xl mb-1">
													{item.title}
												</div>
												<small className="capitalize text-gray-400 px-3  pb-[3px] pt-[2px] bg-white rounded-xl ">
													{item.subCategory.replace(
														/_/g,
														" ",
													)}
												</small>
												<p className="mt-3 text-gray-500">
													{item.description.slice(
														0,
														200,
													)}
													...
												</p>
												<div className="font-semibold text-xl mt-3">
													₹{" "}
													{item.price
														? numberWithCommas(
																item.price,
														  )
														: ""}{" "}
													&nbsp;
													<small className="line-through text-gray-400">
														₹{" "}
														{item.actualPrice
															? numberWithCommas(
																	item.actualPrice,
															  )
															: ""}
													</small>
												</div>
											</div>
											<div className="flex items-center justify-between mt-7">
												<div className=" flex items-center justify-center  shadow-xl rounded-lg text-lg bg-orange-400">
													<FaMinus
														className=" cursor-pointer w-[35px] px-2"
														onClick={() =>
															handleProductCountMinus(
																index,
															)
														}
													/>
													<div className="px-6 bg-white select-none">
														{productCounts[index]}
													</div>
													<FaPlus
														className=" cursor-pointer w-[35px] px-3"
														onClick={() =>
															handleProductCountPlus(
																index,
															)
														}
													/>
												</div>
												<MdDeleteForever
													className="text-4xl text-red-500 cursor-pointer hover:scale-150 transition"
													onClick={() =>
														deleteItem(item, index)
													}
												/>
											</div>
										</div>
									</div>
								))}
							</div>

							{/*BUY SECTION*/}
							<div className="border w-full md:w-1/3 p-6 rounded-lg bg-gray-100 shadow-xl hover:shadow-2xl transition mb-12 md:sticky md:top-[120px] select-none">
								<div className="flex justify-between text-lg font-semibold">
									<div className="">
										Subtotal ({totalItems} Items)
									</div>
									<div>
										₹{" "}
										{cartProductsPrice
											? numberWithCommas(
													cartProductsPrice,
											  )
											: ""}
									</div>
								</div>
								<div className="flex justify-between mt-3">
									<div>Shipping</div>
									<div>₹ 20</div>
								</div>
								<div className="flex justify-between mt-3">
									<div>5% Discount </div>
									<div>₹ 100</div>
								</div>
								<div className="mt-5 text-xl md:text-2xl font-bold flex justify-between">
									<span>Total Amount :</span>
									<div>
										{" "}
										₹{" "}
										{totalAmount
											? numberWithCommas(totalAmount)
											: ""}
									</div>
								</div>
								<div className="flex items-center mt-5">
									<input
										type="checkbox"
										className=" mr-2 h-5 w-5 cursor-pointer"
									/>
									<span>Send as a gift. Custom message </span>
								</div>
								<button className="rounded-lg text-center w-full mt-7 bg-orange-400 py-2 font-semibold">
									Proceed to Buy ({totalItems} Items)
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
