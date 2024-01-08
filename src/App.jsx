import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import React, { useEffect, useState, createContext } from "react";
import { auth, fireDB } from "./firebase";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const MyContext = createContext();

function App() {
  const [fakeProducts, setFakeProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [product, setProduct] = useState({
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
    delivery: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const toastSuccess = () => toast.success("Product Added");

  //-------------------------------------------------------

  // FETCHING FAKE DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setFakeProducts(result);
      } catch (error) {
        setFakeProducts(localData);
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

  //-------------------------------------------------------

  // ADD PRODUCT FUNCTION
  const addProduct = async (e) => {
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
      !product.subCategory ||
      !product.delivery
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
    const data = await getDocs(collection(fireDB, "products"));
    const productData = [];
    data.forEach((doc) => {
      productData.push({ ...doc.data(), id: doc.id });
    });
    setProducts(productData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);
  //---------------------------------------------------------------------

  // HANDLE RESET BUTTON
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
      delivery: "",
    });

    setErrorMsg("");
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
        products,
        setProducts,
        fakeProducts,
        errorMsg,
        setErrorMsg,
        addProduct,
        handleReset,
        setFakeProducts,
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
