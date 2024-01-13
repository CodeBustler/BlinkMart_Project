import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import React, { useEffect, useState, createContext } from "react";
import { auth, fireDB } from "./firebase/firebase";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const MyContext = createContext();

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemInCart, setItemInCart] = useState("Add To Cart");
  const [admin, setAdmin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [cartAnimate, setCartAnimate] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    brand: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    price: "",
    actualPrice: "",
    rating: "",
    ratingCount: "",
    description: "",
    category: "",
    subCategory: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const toastSuccess = () => toast.success("Product Added To Database !");

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  //-------------------------------------------------------
  // UPDATE USERNAME ON AUTH STATE CHANGE
  useEffect(() => {
    const updateUserName = (user) => {
      user ? setUserName(user.displayName) : setUserName(null);
    };
    const unsubscribeAuthStateChanged = auth.onAuthStateChanged(updateUserName);

    return () => {
      unsubscribeAuthStateChanged();
      setAdmin(false);
    };
  }, []);

  //-------------------------------------------------------

  // ADD PRODUCT FUNCTION
  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.brand ||
      !product.img1 ||
      !product.img2 ||
      !product.img3 ||
      !product.img4 ||
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
    try {
      const docRef = await addDoc(collection(fireDB, "allProducts"), product);
      console.log("Product added to DB", docRef.id);
      toastSuccess();
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      handleReset();
      fetchProducts();
    }
  };

  // GET PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    const data = await getDocs(collection(fireDB, "allProducts"));
    const productData = [];
    data.forEach((doc) => {
      productData.push({ ...doc.data(), id: doc.id });
    });
    setLoading(false);
    setAllProducts(productData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //---------------------------------------------------------------------
  //  Number With Commans
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //---------------------------------------------------------------------

  const handleCartAnimate = () => {
    // Toggle the value based on the previous state
    setCartAnimate((prevCartAnimate) => !prevCartAnimate);

    // Schedule the second toggle after 1500 milliseconds
    setTimeout(() => {
      setCartAnimate((prevCartAnimate) => !prevCartAnimate);
    }, 1500);
  };

  //---------------------------------------------------------------------

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  console.log(allProducts);

  //---------------------------------------------------------------------

  // HANDLE RESET BUTTON
  const handleReset = () => {
    setProduct({
      title: "",
      brand: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
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

  //-------------------------------------------------------
  // FUNCTION TO FILTER
  const fitlerByCategory = (category) => {
    return allProducts.filter((products) => products.category === category);
  };

  const fitlerBySubCategory = (subCategory) => {
    return allProducts.filter(
      (products) => products.subCategory === subCategory,
    );
  };

  //-------------------------------------------------------

  return (
    // CONTEXT API PROVIDER
    <MyContext.Provider
      value={{
        userName,
        setUserName,
        admin,
        setAdmin,
        allProducts,
        setAllProducts,
        errorMsg,
        setErrorMsg,
        product,
        setProduct,
        addProduct,
        handleReset,
        loading,
        setLoading,
        numberWithCommas,
        scrollToTop,
        cartAnimate,
        setCartAnimate,
        handleCartAnimate,
        cartItems,
        itemInCart,
        setItemInCart,
      }}
    >
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export { MyContext };
export default App;
