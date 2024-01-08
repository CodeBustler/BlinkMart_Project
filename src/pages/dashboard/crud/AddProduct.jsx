import React, { useContext, useState } from "react";
import { MyContext } from "../../../App";
import { Link } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMdSad } from "react-icons/io";
import LinkHomePage from "../../../components/LinkHomePage";

function AddProduct() {
	const context = useContext(MyContext);
	const {
		product,
		setProduct,
		addProduct,
		handleReset,
		admin,
		loading,
		errorMsg,
		setErrorMsg,
	} = context;

	console.log(product);
	//---------------------------------------------------------------------
	const categoryOptions = [
		{ value: "1", label: "Electronics & Devices" },
		{ value: "2", label: "Men's Fashion" },
		{ value: "3", label: "Women's Fashion" },
		{ value: "4", label: "Kid's Fashion" },
		{ value: "5", label: "Jewellery" },
		{ value: "6", label: "Books" },
	];

	const subCategoryOptions = {
		1: [
			{ value: "1.1", label: "Mobiles" },
			{ value: "1.2", label: "Laptops" },
			{ value: "1.3", label: "Tablets" },
			{ value: "1.4", label: "Smart Watches" },
		],
		2: [
			{ value: "2.1", label: "Shirts & T-Shirts" },
			{ value: "2.2", label: "Shoes & Sneakers" },
			{ value: "2.3", label: "Leather Jackets" },
		],
		3: [
			{ value: "3.1", label: "Dresses" },
			{ value: "3.2", label: "Top Western" },
			{ value: "3.3", label: "Footwear" },
		],
		4: [
			{ value: "4.1", label: "Kids Cloth" },
			{ value: "4.2", label: "Kids Footwear" },
		],
		5: [
			{ value: "5.1", label: "Gold" },
			{ value: "5.2", label: "Silver" },
			{ value: "5.3", label: "Platinum" },
		],
		6: [
			{ value: "6.1", label: "Comics" },
			{ value: "6.2", label: "Devotional" },
			{ value: "6.3", label: "Programming" },
		],
	};

	const handleCategoryChange = (event) => {
		const selectedCategory = event.target.value;
		setProduct((prev) => ({
			...prev,
			category: selectedCategory,
			subCategory: "", // Reset subCategory when category changes
		}));
	};

	const handleSubCategoryChange = (event) => {
		const selectedSubCategory = event.target.value;
		setProduct((prev) => ({
			...prev,
			subCategory: selectedSubCategory,
		}));
	};

	//---------------------------------------------------------------------

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
							{/*------------------------------------------------------------------*/}

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
								<div className="mt-5">
									<h2 className="font-semibold text-gray-600">
										Free delivery
									</h2>
									<div className="flex gap-5">
										<select
											className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 w-[100%] "
											value={product.delivery}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													delivery:
														event.target.value,
												}))
											}
										>
											<option value={true}>Yes</option>
											<option value={false}>No</option>
										</select>
									</div>
								</div>
							</div>

							{/*-------------------------------------------------------------------*/}

							{/*PRODUCT CATEGORY*/}
							<div className="flex flex-col">
								<h2 className="font-semibold text-gray-600">
									Product Category
								</h2>
								<div className="flex gap-5">
									<select
										className="border py-2 px-3 mt-2 rounded-lg outline-blue-300 w-[50%]"
										value={product.category}
										onChange={handleCategoryChange}
									>
										<option value="" defaultValue disabled>
											Category
										</option>
										{categoryOptions.map((option) => (
											<option
												key={option.value}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</select>

									<select
										className="border py-2 px-3 mt-2 rounded-lg outline-blue-300 w-[50%]"
										value={product.subCategory}
										onChange={handleSubCategoryChange}
										disabled={!product.category} // Disable if no category selected
									>
										<option value="" defaultValue disabled>
											Sub Category
										</option>
										{subCategoryOptions[product.category] &&
											subCategoryOptions[
												product.category
											].map((option) => (
												<option
													key={option.value}
													value={option.value}
												>
													{option.label}
												</option>
											))}
									</select>
								</div>
								<div className="mt-6">
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
												disabled
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

								{/*----------------------------------------------------------------*/}

								<div className="mt-7">
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
					<div className="flex  gap-5 mt-8 flex-col md:flex-row ">
						<button
							className="bg-yellow-400 p-2 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400 px-6  "
							onClick={addProduct}
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
