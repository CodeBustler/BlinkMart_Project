import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../App";
// ICONS
import { MdStarBorder } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { RiMotorbikeFill } from "react-icons/ri";
import { AiOutlineTrophy } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa";

import { toast } from "react-toastify";
// ROUTER
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import CardContainer from "../../components/Card/CardContainer";
import ProductCard from "../../components/Card/ProductCard";

//------------------------------------------------------------------

function ProductDetail() {
	const { productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const context = useContext(MyContext);
	const { allProducts, numberWithCommas, handleCartAnimate } = context;
	const [displayProduct, setDisplayProduct] = useState([]);
	const [mainImage, setMainImage] = useState("");
	const [reletedProducts, setRelatedProduct] = useState([]);

	const toastInfo = () => toast.info("Log in to add items to your cart");

	const containerRef = useRef(null);

	const addCart = (item) => {
		const user = localStorage.getItem("user");
		if (user) {
			dispatch(addToCart(item));
			handleCartAnimate();
		} else {
			navigate("/login");
			toastInfo();
		}
	};

	useEffect(() => {
		const filterProduct = allProducts.filter(
			(item) => item.id == productId,
		);
		if (filterProduct.length > 0) {
			setDisplayProduct(filterProduct[0]);
			setMainImage(filterProduct[0].img1);
		} else {
			navigate("/");
		}
	}, [productId, displayProduct]);

	const filterCategory = allProducts.filter(
		(item) => item.category === displayProduct.category,
	);
	console.log(filterCategory);

	function changeProductImage(e, image) {
		setMainImage(image);
	}

	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
		}
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
		}
	};

	const calculateDiscountPercentage = () => {
		if (
			displayProduct &&
			displayProduct.price &&
			displayProduct.actualPrice
		) {
			const price = parseFloat(displayProduct.price);
			const actualPrice = parseFloat(displayProduct.actualPrice);

			const discount = ((actualPrice - price) / actualPrice) * 100;

			return discount.toFixed(0); // You can adjust the number of decimal places as needed
		}
		return "";
	};

	const discountPercentage = calculateDiscountPercentage();

	// --------------------------------------------------------------
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:place-items-start  gap-10 md:gap-0 ">
				{/*LEFT CONTAINER*/}
				<div className="flex flex-col-reverse md:flex-row items-center md:items-start  justify-center lg:justify-end gap-2 md:w-[90%] w-full ">
					{/*IMG THUMNAILS*/}
					<div className=" mt-7 md:mt-0 flex md:flex-col gap-4 md:gap-5 flex-wrap justify-center  ">
						<div className="w-[70px] md:w-[80px] border border-2  overflow-hidden rounded-xl cursor-pointer ">
							<img
								src={displayProduct.img1}
								alt=""
								className="w-[100%]"
								onMouseEnter={(e) =>
									changeProductImage(e, displayProduct.img1)
								}
							/>
						</div>
						<div className="w-[70px] md:w-[80px]  border border-2  overflow-hidden rounded-xl cursor-pointer  ">
							<img
								src={displayProduct.img2}
								alt=""
								className="w-[100%]"
								onMouseEnter={(e) =>
									changeProductImage(e, displayProduct.img2)
								}
							/>
						</div>
						<div className="w-[70px] md:w-[80px]  border border-2  overflow-hidden rounded-xl cursor-pointer ">
							<img
								src={displayProduct.img3}
								alt=""
								className="w-[100%]"
								onMouseEnter={(e) =>
									changeProductImage(e, displayProduct.img3)
								}
							/>
						</div>
						<div className="w-[70px] md:w-[80px] border border-2  overflow-hidden rounded-xl cursor-pointer ">
							<img
								src={displayProduct.img4}
								alt=""
								className="w-[100%]"
								onMouseEnter={(e) =>
									changeProductImage(e, displayProduct.img4)
								}
							/>
						</div>
					</div>
					{/*MAIN IMG*/}
					<div className="w-[90%] md:w-[70%] object-center object-cover  m-2 rounded-md overflow-hidden bg-white flex flex-row-reverse items-center justify-center">
						<img
							src={mainImage}
							alt="product-image"
							className="object-contain w-full h-[280px] md:h-[300px] lg:h-[500px] hover:scale-125 transition "
						/>
					</div>
				</div>

				{/*RIGHT CONTAINER*/}
				<div className="px-6 max-w-[600px] ">
					<p className="text-md pt-3 text-gray-400 capitalize">
						{displayProduct?.category?.replace(/_/g, " ") || ""} /
						&nbsp;
						{displayProduct?.subCategory?.replace(/_/g, " ") || ""}
					</p>
					<h2 className="font-bold text-2xl pt-2">
						{displayProduct.title}
					</h2>
					<div className="flex items-center gap-3">
						<div className="flex my-4">
							{Array.from({ length: 5 }).map((_, index) =>
								index < displayProduct.rating ? (
									<MdStar
										key={index}
										className="text-yellow-500"
									/>
								) : (
									<MdStarBorder
										key={index}
										className="text-gray-300"
									/>
								),
							)}
						</div>
						<div className="text-gray-500">
							<span>{displayProduct.ratingCount}</span>
							&nbsp; Ratings
						</div>
					</div>
					<p
						className="text-gray-500"
						title={displayProduct.description}
					>
						{displayProduct?.description?.slice(0, 400)}....
					</p>
					<div className="flex flex-col md:flex-row items-center justify-between gap-5 my-3 mt-4">
						<div className="flex flex-wrap items-center gap-5 md:gap-2 lg:gap-5">
							<div className="font-bold py-3 text-2xl">
								₹
								{displayProduct.price
									? numberWithCommas(displayProduct.price)
									: ""}
							</div>
							<div className="line-through mt-2 text-gray-500">
								₹ {displayProduct.actualPrice}
							</div>
							<div className="text-md text-red-500 text-lg font-semibold mt-2">
								{discountPercentage}% Off
							</div>
						</div>
						<button
							className="bg-orange-500  active:bg-orange-400 min-w-[200px] w-[100%] md:w-[40%] rounded-md py-2 mt-1 font-semibold cursor-pointer  "
							onClick={() => addCart(displayProduct)}
						>
							<GoPlus className="inline mb-1 mr-2" />
							Add to Cart
						</button>
					</div>
					{/*BENEFITS*/}
					<div className="flex flex-wrap justify-around md:justify-between gap-4 mt-5 border-t border-gray-800 pt-10 ">
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<FaArrowRotateLeft className="text-xl text-red-500" />
							<p className="text-center text-sm text-gray-500">
								10 days Returnable
							</p>
						</div>
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<RiMotorbikeFill className="text-xl text-purple-500" />
							<p className="text-center text-sm text-gray-500">
								Free delivery
							</p>
						</div>
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<AiOutlineTrophy className="text-xl text-orange-500" />

							<p className="text-center text-sm text-gray-500">
								Top Brand
							</p>
						</div>
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<GrSecure className="text-xl text-green-500" />
							<p className="text-center text-sm text-gray-500">
								Secure Transaction
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-10 md:mx-8 mt-10 ">
				<div className="font-bold text-2xl pt-2 underline underline-offset-8 under">
					Related Products
				</div>
				{/*CONTAINER*/}
				<div className="relative">
					<div
						className="flex flex-col md:flex-row gap-10 bg-gray-100 p-8 rounded-xl border overflow-x-auto scroll-smooth"
						ref={containerRef}
					>
						{filterCategory.map((category, categoryIndex) => (
							<ProductCard
								key={categoryIndex}
								item={category}
								numberWithCommas={numberWithCommas}
							/>
						))}
					</div>
					{filterCategory.length > 4 ? (
						<div>
							<FaAngleLeft
								onClick={scrollLeft}
								className="absolute top-[25%] -left-10 border border-2 text-[32px]  px-2 h-[200px] text-gray-600 bg-gray-100 active:bg-gray-200 rounded-md hidden md:block cursor-pointer"
							/>

							<FaAngleLeft
								onClick={scrollRight}
								className="absolute -right-10 top-[25%] rotate-180 border border-2 text-[32px] px-2 h-[200px] text-gray-600 bg-gray-100 active:bg-gray-200 rounded-md hidden md:block cursor-pointer"
							/>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</>
	);
}

export default ProductDetail;
