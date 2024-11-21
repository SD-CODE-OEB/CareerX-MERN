import axios from "axios";
import React, { useState, createContext } from "react";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  // const FPATH = process.env.REACT_APP_PATH;
  const BPATH = process.env.REACT_APP_BACKEND_APP_PATH;
  const [user, setUser] = useState({
    name: "",
    email: "",
    pass: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [logged, setLogged] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${BPATH}/users/showUser`);
        setUsers(userResponse.data);

        const productsResponse = await axios.get(`${BPATH}/products/all`);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [BPATH]);
  const vars = {
    user,
    setUser,
    users,
    setUsers,
    orders,
    setOrders,
    cartItem,
    setCartItem,
    logged,
    setLogged,
    products,
    setProducts,
  };
  return (
    <AppContext.Provider value={vars}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
