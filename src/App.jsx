import {
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/rootlayout/RootLayout";
import Cart from "./pages/cart/Cart";
import Products from "./components/products/Products";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Homepage from "./pages/homepage/Homepage";
import NoPage from "./pages/nopage/NoPage";
import Dashboard from "./pages/dashboard/Dashboard";
import CustomerService from "./pages/customerService/CustomerService";
import SignUp from "./pages/signIn_signUp/SignUp";
import Login from "./pages/signIn_signUp/Login";
import React, { useEffect, useState, createContext } from "react";
import { auth } from "./firebase";
import { localData } from "./data";

const MyContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [admin, setAdmin] = useState(false);

  // FETCHING FAKE DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        setProducts(localData);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // UPDATE USERNAME ON AUTH STATE CHANGE
  useEffect(() => {
    const updateUserName = (user) => {
      user ? setUserName(user.displayName) : setUserName(null);
    };
    const unsubscribeAuthStateChanged = auth.onAuthStateChanged(updateUserName);

    return () => unsubscribeAuthStateChanged();
  }, []);

  // PROTECTED ROUTE FOR USER
  const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("user");
    if (user) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
  };

  const env = import.meta.env;
  const adminEmail = env.VITE_REACT_APP_ADMIN_EMAIL;

  // PROTECTED ROUTE FOR ADMIN DASHBOARD
  const ProtectedRouteForAdmin = ({ children }) => {
    const admin = JSON.parse(localStorage.getItem("user"));

    // CHECK IF THE USER IS AN ADMIN
    if (admin.user.email === adminEmail) {
      return children;
    } else {
      return <Navigate to={"/login"} />;
    }
  };

  // ROUTES
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/customer_service" element={<CustomerService />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/*" element={<NoPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>,
    ),
  );

  return (
    // CONTEXT API PROVIDER
    <MyContext.Provider
      value={{
        userName,
        setUserName,
        admin,
        setAdmin,
        products,
        setProducts,
        loading,
        setLoading,
      }}
    >
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export { MyContext };
export default App;
