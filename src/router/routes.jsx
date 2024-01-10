import { useEffect } from "react";
// COMPONENTS & PAGES
import Cart from "../pages/cart/Cart";
import Products from "../components/products/Products";
import ProductDetail from "../pages/productDetail/ProductDetail";
import Homepage from "../pages/homepage/Homepage";
import NoPage from "../pages/nopage/NoPage";
import Dashboard from "../pages/dashboard/Dashboard";
import CustomerService from "../pages/customerService/CustomerService";
import SignUp from "../pages/signIn_signUp/SignUp";
import Login from "../pages/signIn_signUp/Login";
import AddProduct from "../pages/dashboard/crud/AddProduct";
// ROUTER
import RootLayout from "./RootLayout";
import {
	Navigate,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

// ---------------------------------------------------------------

// PROTECTED ROUTE FOR USER
const ProtectedRoute = ({ children }) => {
	const user = localStorage.getItem("user");
	if (user) {
		return children;
	} else {
		return <Navigate to={"/login"} />;
	}
};

// PROTECTED ROUTE FOR ADMIN DASHBOARD
const env = import.meta.env;
const adminEmail = env.VITE_REACT_APP_ADMIN_EMAIL;

const ProtectedRouteForAdmin = ({ children }) => {
	const userData = JSON.parse(localStorage.getItem("user"));

	if (userData && userData.user && userData.user.email === adminEmail) {
		return children;
	} else {
		return <Navigate to={"/login"} />;
	}
};

// ---------------------------------------------------------------

// ROUTES
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<RootLayout />}>
				<Route index element={<Homepage />} />
				<Route
					path="/cart"
					element={
						<ProtectedRoute>
							<Cart />
						</ProtectedRoute>
					}
				/>

				<Route path="/products/:category" element={<Products />} />
				<Route path="/customer_service" element={<CustomerService />} />
				<Route path="/productDetail/:id" element={<ProductDetail />} />
			</Route>
			<Route path="/*" element={<NoPage />} />
			<Route path="/addProduct" element={<AddProduct />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRouteForAdmin>
						<Dashboard />
					</ProtectedRouteForAdmin>
				}
			/>
			<Route path="/signup" element={<SignUp />} />
			<Route path="/login" element={<Login />} />
		</Route>,
	),
);

// EXPORTS
export { router };
