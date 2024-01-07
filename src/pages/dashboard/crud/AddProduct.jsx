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
		imageUrl: "",
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
			!product.description ||
			!product.category ||
			!product.subCategory
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
			category: "",
			subCategory: "",
		});

		setErrorMsg("");
	};

	return (
		<>
			<LinkHomePage />
			<div className="flex flex-col items-center ">
				<form className="flex flex-col md:border px-4 pb-7 md:pt-3 md:px-7  md:mt-8 rounded-lg md:shadow-2xl gap-2 lg:w-[80%]">
					<h1 className="font-semibold text-2xl my-4 text-gray-600">
						Add Product
					</h1>
					{/*CONTAINER*/}
					<div className="container">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
							{/*PRODUCT DETAIL*/}
							<div>
								<h2 className="font-semibold text-gray-600">
									Product Detail
								</h2>
								<div className="flex flex-col">
									<input
										type="text"
										placeholder="Title"
										className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300"
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
										className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300"
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
										className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300"
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
										className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300"
										value={product.description}
										onChange={(event) =>
											setProduct((prev) => ({
												...prev,
												description: event.target.value,
											}))
										}
									/>
								</div>
								<div className="mt-8">
									<h2 className="font-semibold text-gray-600">
										Free delivery
									</h2>
									<div className="flex gap-5">
										<select
											className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 w-[100%] "
											value={product.rating}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													rating: event.target.value,
												}))
											}
										>
											<option value="true">Yes</option>
											<option value="false">No</option>
										</select>
									</div>
								</div>
							</div>
							{/*PRODUCT CATEGORY*/}
							<div className="flex flex-col">
								<h2 className="font-semibold text-gray-600">
									Product Category
								</h2>
								<div>
									<select
										className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 w-[100%] "
										value={product.category}
										onChange={(event) =>
											setProduct((prev) => ({
												...prev,
												category: event.target.value,
											}))
										}
									>
										<option value="" defaultValue hidden>
											Category
										</option>
										<option value="electronics_and_devices">
											Electronics & Devices
										</option>
										<option value="mens_fashion">
											Men's Fashion
										</option>
										<option value="womens_fashion">
											Women's Fashion
										</option>
										<option value="kids_fashion">
											Kid's Fashion
										</option>
										<option value="jewellery">
											Jewelley
										</option>
										<option value="books">Books</option>
									</select>

									<select
										className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 w-[100%]"
										value={product.subCategory}
										onChange={(event) =>
											setProduct((prev) => ({
												...prev,
												subCategory: event.target.value,
											}))
										}
									>
										<option value="" defaultValue hidden>
											Sub Category
										</option>
										<option value="electronics_and_devices">
											Electronics & Devices
										</option>
										<option value="mens_fashion">
											Men's Fashion
										</option>
										<option value="womens_fashion">
											Women's Fashion
										</option>
										<option value="kids_fashion">
											Kid's Fashion
										</option>
										<option value="jewellery">
											Jewelley
										</option>
										<option value="books">Books</option>
									</select>
								</div>
								<div className="mt-8">
									<h2 className="font-semibold text-gray-600">
										Product Rating
									</h2>
									<div className="flex gap-5">
										<select
											className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 w-[100%] "
											value={product.rating}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													rating: event.target.value,
												}))
											}
										>
											<option
												value=""
												defaultValue
												hidden
											>
												Select Rating
											</option>
											<option value="1">1 Star</option>
											<option value="2">2 Stars</option>
											<option value="3">3 Stars</option>
											<option value="4">4 Stars</option>
											<option value="5">5 Stars</option>
										</select>

										<input
											type="number"
											placeholder="Rating count"
											className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%] "
											value={product.ratingCount}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													ratingCount:
														event.target.value,
												}))
											}
										/>
									</div>
								</div>
								<div className="mt-8">
									<h2 className="font-semibold text-gray-600">
										Product Price
									</h2>
									<div className="flex gap-5">
										<input
											type="number"
											placeholder="Price"
											className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
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
											className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
											value={product.actualPrice}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													actualPrice:
														event.target.value,
												}))
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex  gap-5 mt-6 flex-col md:flex-row ">
						<button
							className="bg-yellow-400 p-2 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400 px-6 "
							onClick={(e) => handleSubmit(e)}
						>
							Add Product
						</button>
						<button
							type="button"
							className="bg-gray-300 p-2  rounded-lg outline-blue-300 hover:bg-gray-400 active:bg-gray-300 px-10 "
							onClick={handleReset}
						>
							Reset
						</button>
						{/* Error Message */}
						<span
							className={`text-red-500 font-semibold mt-2 flex items-center gap-2 md:ml-10 ${
								errorMsg.length !== 0 ? "block" : "hidden"
							}`}
						>
							{errorMsg.length > 0 && (
								<IoMdSad className="text-2xl animate-bounce" />
							)}
							{errorMsg}
						</span>
					</div>
				</form>
			</div>
		</>
	);
}

export default AddProduct;
