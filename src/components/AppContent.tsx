import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import ListPage from "./ListPage";
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import ForgotPassword from "./ForgotPassword";
import Cart from "./Cart";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

function AppContent() {
  const [products, setProducts] = useState<Product[]>([]); // Explicitly type products as Product[]
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const handleSearch = (query: SetStateAction<string>) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/products"
          element={<ListPage products={filteredProducts} />}
        />
        <Route
          path="/search"
          element={<ListPage products={filteredProducts} />}
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppContent;
