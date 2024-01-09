import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import React, { useEffect, useState, createContext } from "react";
import { auth, fireDB } from "./firebase";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const MyContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [scrollLeft, setScrollLeft] = useState(0);
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
  //-------------------------------------------------------
  // UPDATE USERNAME ON AUTH STATE CHANGE
  useEffect(() => {
    const updateUserName = (user) => {
      user ? setUserName(user.displayName) : setUserName(null);
    };
    const unsubscribeAuthStateChanged = auth.onAuthStateChanged(updateUserName);

    return () => unsubscribeAuthStateChanged();
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
      const docRef = await addDoc(collection(fireDB, "products"), product);
      console.log("Document written with ID: ", docRef.id);
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
    const data = await getDocs(collection(fireDB, "products"));
    const productData = [];
    data.forEach((doc) => {
      productData.push({ ...doc.data(), id: doc.id });
    });
    setLoading(false);
    setProducts(productData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);
  //---------------------------------------------------------------------
  //  Number With Commans
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
    return products.filter((products) => products.category === category);
  };

  const fitlerBySubCategory = (subCategory) => {
    return products.filter((products) => products.subCategory === subCategory);
  };

  const electronicAndDevices = fitlerByCategory("1");
  const mobiles = fitlerBySubCategory("1.1");
  mobiles.reverse();
  const laptops = fitlerBySubCategory("1.2");
  const tablets = fitlerBySubCategory("1.3");
  const smartWatches = fitlerBySubCategory("1.4");
  const electronics = [mobiles, laptops, tablets, smartWatches];
  //-------------------------------------------------------

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
        errorMsg,
        setErrorMsg,
        product,
        setProduct,
        addProduct,
        handleReset,
        loading,
        setLoading,
        electronics,
        numberWithCommas,
      }}
    >
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export { MyContext };
export default App;
