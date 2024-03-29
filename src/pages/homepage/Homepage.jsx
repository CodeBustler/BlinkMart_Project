import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Animation/Loader";
import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import ProductCard from "../../components/Card/ProductCard";

function Homepage() {
	const { allProducts, loading, numberWithCommas } = useContext(MyContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItem = useSelector((state) => state.cart);

	const addCart = (item) => {
		const user = localStorage.getItem("user");
		user ? dispatch(addToCart(item)) : navigate("/login");
	};

	const deleteCart = (item) => {
		dispatch(deleteFromCart(item.id));
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="container mx-auto">
					<div className="flex flex-wrap justify-center  gap-5">
						{/*MAPPING PRODUCTS*/}
						{allProducts.map((item, index) => (
							<ProductCard
								key={index}
								item={item}
								numberWithCommas={numberWithCommas}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default Homepage;
