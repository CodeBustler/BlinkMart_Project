import React from "react";
import { Link } from "react-router-dom";

function ProductsTable() {
	return (
		<>
			<Link to="/addProduct" className="bg-green-500 py-2 px-5 rounded">
				Add Product
			</Link>
			<div>ProductsTable</div>
		</>
	);
}

export default ProductsTable;
