// REDUX
import { createSlice } from "@reduxjs/toolkit";
// TOASTIFY
import { toast } from "react-toastify";

// ---------------------------------------------------------------

const toastGreen = () => toast.success("Added To Cart !");
const toastRed = () => toast.error("Item Removed ! ");

// REDUX SLICE/REDUCERS
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

// EXPORTS
export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
