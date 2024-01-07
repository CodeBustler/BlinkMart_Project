import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import React, { useEffect, useState, createContext } from "react";
import { auth } from "./firebase";

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
