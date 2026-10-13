import React from 'react';
import products from '../data/products.json';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Store() {
  const { addItem } = useCart();

  return (
    <div className="store-shell">
      <header className="store-header">
        <h2>Shop Kits</h2>
        <p>Original printable junk journal kits curated for DIY paper lovers.</p>
      </header>

      <section className="product-grid">
        {products.map((p) => (
          <article key={p.id} className="product-card">
            <img src={p.images[0]} alt={p.title} />
            <div className="product-body">
              <h3>{p.title}</h3>
              <p className="price">${p.price.toFixed(2)}</p>
              <p className="excerpt">{p.excerpt}</p>

              <div className="card-actions">
                <Link to={`/product/${p.id}`} className="link-button">View</Link>
                <button onClick={() => addItem({ ...p, quantity: 1 })}>Add to cart</button>
                <Link to={`/product/${p.id}`} className="secondary-link">Customize</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
