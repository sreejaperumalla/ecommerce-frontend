import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {

  fetchProducts();

}, []);

const fetchProducts = async () => {

  try {

    const response = await axios.get(
      "https://e-commerce-production-68a9.up.railway.app/products"
    );

    console.log(response.data);

    setProducts(response.data);

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div className="page">
      <header className="section-heading align-center home-header">
        <h1>Curated <span>Tech & Style</span> Collection</h1>
        <p>
          From high-performance laptops and earbuds to the latest in footwear and decor. 
          Discover premium essentials designed for your modern lifestyle.
        </p>
      </header>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
