import React, { useContext } from "react";
import { MyContext } from "../../App";
import Loader from "../Animation/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import ProductCard from "../Card/ProductCard";
import CardContainer from "../Card/CardContainer";

function Products() {
	const { products, loading, numberWithCommas, electronics } =
		useContext(MyContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					{}
					{electronics.map((category, categoryIndex) => (
						<CardContainer
							key={categoryIndex}
							categoryTitle={category[0].subCategory}
						>
							{category.slice(1).map((item, index) => (
								<ProductCard
									key={index}
									item={item}
									numberWithCommas={numberWithCommas}
								/>
							))}
						</CardContainer>
					))}
				</>
			)}
		</>
	);
}

export default Products;
