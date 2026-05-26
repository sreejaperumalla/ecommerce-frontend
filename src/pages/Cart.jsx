import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowForward, Remove, Add, ShoppingBagOutlined, DeleteOutlined } from '@mui/icons-material';

import { removeFromCart, updateQuantity } from '../store/cartSlice';
import './Cart.css';

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipping = items.length ? 0 : 0;

  if (items.length === 0) {
    return (
      <div className="page empty-cart-page">
        <div className="glass-card empty-cart">
          <div className="empty-icon">
            <ShoppingBagOutlined fontSize="large" />
          </div>
          <h1>Your cart is empty</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '32px' }}>
            Add a few premium picks from the storefront and they will appear here.
          </p>
          <Link to="/" className="primary-button">
            Start Shopping <ArrowForward fontSize="small" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <header className="section-heading align-left">
        <h1>Shopping Cart</h1>
        <p>Update product quantities or delete products from the cart before checkout.</p>
      </header>

      <div className="cart-layout">
        <section className="cart-items">
          {items.map((item) => (
            <article key={item.id} className="cart-row">
              <img src={item.image} alt={item.name} />

              <div className="cart-row-info">
                <span>{item.category || 'Premium'}</span>
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString('en-IN')}</p>
              </div>

              <div className="quantity-control" aria-label={`${item.name} quantity`}>
                <button
                  onClick={() => {
                    if (item.quantity === 1) {
                      dispatch(removeFromCart(item.id));
                    } else {
                      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                    }
                  }}
                  aria-label="Decrease quantity"
                >
                  <Remove fontSize="small" />
                </button>
                <strong>{item.quantity}</strong>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  aria-label="Increase quantity"
                >
                  <Add fontSize="small" />
                </button>
              </div>

              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{ background: 'transparent', color: '#ef4444', padding: '8px', borderRadius: '10px' }}
                aria-label={`Remove ${item.name}`}
              >
                <DeleteOutlined />
              </button>
            </article>
          ))}
        </section>

        <div className="glass-card summary-card">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>Subtotal</span>
            <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <strong style={{ color: 'var(--accent)' }}>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{(totalAmount + shipping).toLocaleString('en-IN')}</strong>
          </div>
          <button 
            className="primary-button full" 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <ArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
