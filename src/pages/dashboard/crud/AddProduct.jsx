import React, { useContext, useState } from "react";
import { MyContext } from "../../../App";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMdSad } from "react-icons/io";
import { toast } from "react-toastify";
import LinkHomePage from "../../../components/LinkHomePage";

function AddProduct() {
	const context = useContext(MyContext);
	const toastSuccess = () => toast.success("Product Added");
	const [product, setProduct] = useState({
		title: "",
		brand: "",
		image: "",
		price: "",
		actualPrice: "",
		rating: "",
		ratingCount: "",
		description: "",
	});

	console.log(product);

	const [errorMsg, setErrorMsg] = useState("");
	const { admin, loading } = context;

	// HANDLE SUBMIT BUTTON
	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			!product.title ||
			!product.brand ||
			!product.imageUrl ||
			!product.price ||
			!product.actualPrice ||
			!product.rating ||
			!product.ratingCount ||
			!product.description
		) {
			setErrorMsg("Please fill all fields");
			return;
		}
		toastSuccess();
		handleReset();
	};

	const handleReset = () => {
		setProduct({
			title: "",
			brand: "",
			imageUrl: "",
			price: "",
			actualPrice: "",
			rating: "",
			ratingCount: "",
			description: "",
		});

		setErrorMsg("");
	};
	return (
		<>
			<LinkHomePage />
			<div className="flex flex-col items-center ">
				<form className="flex flex-col md:border p-5 md:pt-4 md:px-8  md:mt-5 rounded-lg md:shadow-2xl gap-2 ">
					<h2 className="font-semibold text-2xl my-2 text-gray-600">
						Add Product
					</h2>
					<input
						type="text"
						placeholder="Title"
						className="border py-2 px-3 mt-1 rounded-lg  outline-blue-300"
						value={product.title}
						onChange={(event) =>
							setProduct((prev) => ({
								...prev,
								title: event.target.value,
							}))
						}
					/>
					<input
						type="text"
						placeholder="Brand name"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						value={product.brand}
						onChange={(event) =>
							setProduct((prev) => ({
								...prev,
								brand: event.target.value,
							}))
						}
					/>
					<input
						type="text"
						placeholder="ImageURL"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						value={product.imageUrl}
						onChange={(event) =>
							setProduct((prev) => ({
								...prev,
								imageUrl: event.target.value,
							}))
						}
					/>

					<input
						type="text"
						placeholder="Description"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						value={product.description}
						onChange={(event) =>
							setProduct((prev) => ({
								...prev,
								description: event.target.value,
							}))
						}
					/>
					<div className="flex gap-5 ">
						<input
							type="text"
							placeholder="Category"
							className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300 w-[50%]"
							value={product.rating}
							onChange={(event) =>
								setProduct((prev) => ({
									...prev,
									rating: event.target.value,
								}))
							}
						/>
						<input
							type="text"
							placeholder="Sub Category"
							className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300 w-[50%]"
							value={product.ratingCount}
							onChange={(event) =>
								setProduct((prev) => ({
									...prev,
									ratingCount: event.target.value,
								}))
							}
						/>
					</div>
					<div className="flex gap-5 ">
						<input
							type="number"
							placeholder="Price"
							className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300 w-[50%]"
							value={product.price}
							onChange={(event) =>
								setProduct((prev) => ({
									...prev,
									price: event.target.value,
								}))
							}
						/>
						<input
							type="number"
							placeholder="Actual price"
							className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300 w-[50%]"
							value={product.actualPrice}
							onChange={(event) =>
								setProduct((prev) => ({
									...prev,
									actualPrice: event.target.value,
								}))
							}
						/>
					</div>

					<div className="flex gap-5 ">
						<input
							type="number"
							placeholder="Out of 5"
							className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300 w-[50%]"
							value={product.rating}
							onChange={(event) =>
								setProduct((prev) => ({
									...prev,
									rating: event.target.value,
								}))
							}
						/>
						<input
							type="number"
							placeholder="Rating count"
							className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300 w-[50%]"
							value={product.ratingCount}
							onChange={(event) =>
								setProduct((prev) => ({
									...prev,
									ratingCount: event.target.value,
								}))
							}
						/>
					</div>
					<div className="flex justify-between gap-5 mt-6 flex-col md:flex-row ">
						<button
							className="bg-yellow-400 p-2 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400 md:w-[50%]"
							onClick={(e) => handleSubmit(e)}
						>
							Add Product
						</button>
						<button
							type="button"
							className="bg-gray-300 p-2  rounded-lg outline-blue-300 hover:bg-gray-400 active:bg-gray-300 md:w-[50%]"
							onClick={handleReset}
						>
							Reset
						</button>
					</div>
					{/* Error Message */}
					<span
						className={`text-red-500 font-semibold mt-2 flex items-center gap-2 ${
							errorMsg.length !== 0 ? "block" : "hidden"
						}`}
					>
						{errorMsg}
					</span>
				</form>
			</div>
		</>
	);
}

export default AddProduct;
