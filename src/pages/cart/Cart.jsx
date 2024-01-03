import React, { useContext } from "react";
import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";

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
			<div>Cart </div>
			<div>
				{cartItems.map((item) => {
					return (
						<div onClick={() => deleteItem(item)}>{item.title}</div>
					);
				})}
			</div>
		</>
	);
}

export default Cart;
