import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
// ROUTER
import { useNavigate, useParams } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
// COMPONENTS
import Loader from "../Animation/Loader";
import ProductCard from "../Card/ProductCard";
import CardContainer from "../Card/CardContainer";

//---------------------------------------------------------------

function Products() {
	const { loading, numberWithCommas, allProducts } = useContext(MyContext);
	const [categoryArray, setCategoryArray] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { mainCategory } = useParams();
	console.log(mainCategory);
	console.log(allProducts);

	const mainCategoryFilter = allProducts.filter(
		(item) => item.category === mainCategory,
	);

	console.log(mainCategoryFilter);

	//---------------------------------------------------------------

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<h1 className="font-bold text-2xl capitalize text-center md:text-left">
						{mainCategory.replace(/_/g, " ").replace(/and/g, "&")}
					</h1>
					{mainCategoryFilter.map((category, categoryIndex) => (
						<CardContainer
							key={categoryIndex}
							categoryTitle={category.subCategory}
						>
							<ProductCard
								key={categoryIndex}
								item={category}
								numberWithCommas={numberWithCommas}
							/>
						</CardContainer>
					))}
				</>
			)}
		</>
	);
}

export default Products;
