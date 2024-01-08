import React, { useContext } from "react";
import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { RiDeleteBin6Fill } from "react-icons/ri";

function Cart() {
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	console.log(cartItems);
	const { userName, admin } = useContext(MyContext);

	const deleteItem = (item) => {
		dispatch(deleteFromCart(item));
	};
	return (
		<>
			<h1 className="text-2xl font-bold  text-center md:text-left">
				Cart
			</h1>
			<div className="flex gap-10 mt-5">
				<div className="flex flex-col gap-5 md:w-[70%]">
					{cartItems.map((item) => {
						return (
							<div className="flex gap-5 p-4 border rounded-xl ">
								<img
									src={item.imageUrl}
									alt="product_image"
									className="w-[10%] cursor-pointer"
								/>
								<div>
									<h2>{item.title}</h2>
									<div className="flex items-center justify-between">
										<div>$ {item.price}</div>
										<RiDeleteBin6Fill
											className="text-red-500 text-2xl cursor-pointer"
											onClick={() => deleteItem(item)}
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
	);
}

export default Cart;
