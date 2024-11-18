// import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Header-Footer/Navbar";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Logout from "./Components/Auth/Logout";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";
import Cards from "./Components/Products/Cards";
import Footer from "./Components/Header-Footer/Footer";
import GoogleAuth from "./Components/Auth/GAuth";
// import Upload from "./Components/Admin/Upload";
import AdminLogin from "./Components/Admin/AdminLogin";
import Upload from "./Components/Admin/Upload";

function App() {
  const FPATH = process.env.REACT_APP_PATH;
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={`${FPATH}`} element={<Cards />} />
          <Route path={`${FPATH}/login`} element={<Login />} />
          <Route path={`${FPATH}/register`} element={<Register />} />
          <Route path={`${FPATH}/logout`} element={<Logout />} />
          <Route path={`${FPATH}/cart`} element={<Cart />} />
          <Route path={`${FPATH}/orders`} element={<Orders />} />
          <Route path={`${FPATH}/gauth`} element={<GoogleAuth />} />
          <Route path={`${FPATH}/admin`} element={<AdminLogin />} />
          <Route path={`${FPATH}/admin/upload`} element={<Upload />} />
        </Routes>
      </Router>
      <hr className="m-0" />
      <Footer />
    </div>
  );
}

export default App;
