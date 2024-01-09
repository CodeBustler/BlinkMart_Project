import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// TOASTIFY
const toastGreen = () => toast.success("Added To Cart !");
const toastRed = () => toast.error("Item Removed ! ");

const initialState = [];
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {
			state.push(action.payload);
			toastGreen();
		},
		deleteFromCart(state, action) {
			const indexToRemove = state.findIndex(
				(item) => item.id === action.payload.id,
			);
			if (indexToRemove !== -1) {
				state.splice(indexToRemove, 1);
				toastRed();
			}
		},
	},
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
