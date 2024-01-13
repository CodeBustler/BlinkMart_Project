// REDUX
import { createSlice } from "@reduxjs/toolkit";
// TOASTIFY
import { toast } from "react-toastify";

// ---------------------------------------------------------------

const toastRed = () => toast.error("Item Removed ! ");
const toastInfo = () => toast.info("Item already in a cart ! ");

// REDUX SLICE/REDUCERS
const initialState = [];
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {
			const itemToAdd = action.payload; // Extract the payload from the action
			const isInCart = state.some(
				(cartItem) => cartItem.id === itemToAdd.id,
			);

			if (!isInCart) {
				state.push(itemToAdd);
			} else {
				toastInfo();
				console.log("Item is already in the cart");
			}
		},
		deleteFromCart(state, action) {
			toastRed();
			return state.filter((item) => item.id != action.payload.id);
		},
	},
});

// EXPORTS
export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
