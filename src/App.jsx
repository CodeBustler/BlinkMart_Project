import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
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
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { createContext } from "react";
import { localData } from "./data";

const MyContext = createContext();

function App() {
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);

  // UPDATE USERNAME
  useEffect(() => {
    const updateUserName = auth.onAuthStateChanged((user) => {
      if (user) {
        // Update UserName
        setUserName(user.displayName);

        // Validate Admin Accoun
        user.email === "admin@blinkmart.com" ? setAdmin(true) : setAdmin(false);
      } else {
        setUserName(null);
        console.log("User not logged in");
      }
    });

    return () => updateUserName();
  }, []);

  // ROUTES
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <Homepage
                admin={admin}
                adminName={userName}
                localData={localData}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard admin={admin} />} />
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
    <MyContext.Provider value={{ userName, setUserName, admin }}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export { MyContext };
export default App;
