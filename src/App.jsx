import {
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/customer_service" element={<CustomerService />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
      </Route>
      <Route path="/*" element={<NoPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
