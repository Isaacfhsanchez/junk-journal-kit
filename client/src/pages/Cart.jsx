import React from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { cart, updateQty, removeItem, clearCart, total } = useCart();

  return (
    <main className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.title} />
                <div className="cart-meta">
                  <strong>{item.title}</strong>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="qty-row">
                    <label>Qty</label>
                    <input type="number" min="1" value={item.quantity} onChange={(e) => updateQty(item.id, Number(e.target.value))} />
                    <button onClick={() => removeItem(item.id)} className="link-remove">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Total: <strong>${total.toFixed(2)}</strong></p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => alert('Checkout flow coming soon')}>Checkout</button>
              <button className="secondary" onClick={() => clearCart()}>Clear</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
