import React, { useContext } from "react";
import { MyContext } from "../../App";

function Cart() {
	const { userName, admin } = useContext(MyContext);
	return <div>Cart</div>;
}

export default Cart;
