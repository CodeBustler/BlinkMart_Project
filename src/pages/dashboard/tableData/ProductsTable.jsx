// ROUTER
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../../App";

//---------------------------------------------------------------

function ProductsTable() {
	const { loading, numberWithCommas, electronics } = useContext(MyContext);

	//---------------------------------------------------------------

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
