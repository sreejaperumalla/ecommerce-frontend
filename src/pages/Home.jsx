import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduxProducts = useSelector((state) => state.products.items);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulate network latency so that the premium skeleton loader remains clearly visible
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const response = await axios.get(
        "https://e-commerce-production-68a9.up.railway.app/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.warn("Railway API failed, falling back to local products:", error);
      setProducts(reduxProducts || []);
    } finally {
      setLoading(false);
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
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => <ProductCardSkeleton key={index} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Home;
