import React, { useEffect, useState } from 'react';
import { fetchFeaturedProducts } from '../utils/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts().then(setProducts);
  }, []);

  return (
    <div className="home-page">
      <h1>Featured Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;