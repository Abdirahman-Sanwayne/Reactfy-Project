import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<h1>404 page</h1>} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};
export default App;
