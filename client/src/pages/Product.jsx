import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import { useCart } from '../context/CartContext.jsx';

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  if (!product) return <div style={{ padding: 20 }}>Product not found.</div>;

  const handleAdd = () => {
    addItem({ ...product, quantity: qty });
    navigate('/cart');
  };

  return (
    <main className="product-page">
      <div className="product-media">
        <img src={product.images[0]} alt={product.title} />
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>

        <div style={{ marginTop: 16 }}>
          <label>Quantity: </label>
          <input type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: 64, marginLeft: 8 }} />
        </div>

        <div className="actions" style={{ marginTop: 20 }}>
          <button onClick={handleAdd}>Add to cart</button>
          <Link to="#"><button className="secondary">Customize</button></Link>
        </div>

        <div style={{ marginTop: 24 }}>
          <strong>What's inside:</strong>
          <ul>
            {product.contents.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </div>
    </main>
  );
}
