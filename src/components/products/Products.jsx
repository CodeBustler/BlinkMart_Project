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
import ContainerForCard from "../Card/ContainerForCard";

//---------------------------------------------------------------

function Products() {
	const { loading, numberWithCommas, allProducts, scrollToTop, cartItems } =
		useContext(MyContext);
	const [categoryArray, setCategoryArray] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { mainCategory } = useParams();
	const mainCategoryFilter = allProducts.filter(
		(item) => item.category === mainCategory,
	);

	useEffect(() => {
		scrollToTop();
	}, [mainCategoryFilter]);
	//---------------------------------------------------------------

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<h1 className="font-bold text-2xl capitalize text-center md:text-left underline underline-offset-4">
						{mainCategory.replace(/_/g, " ").replace(/and/g, "&")}
					</h1>
					{mainCategoryFilter.map((category, categoryIndex) => (
						<ContainerForCard
							key={categoryIndex}
							categoryTitle={category.subCategory}
							filteredCategory={category}
						>
							<ProductCard
								key={categoryIndex}
								item={category}
								numberWithCommas={numberWithCommas}
								cartItems={cartItems}
							/>
						</ContainerForCard>
					))}
				</>
			)}
		</>
	);
}

export default Products;
