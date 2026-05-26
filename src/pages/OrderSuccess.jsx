import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Check,
  ReceiptOutlined,
  ShoppingBagOutlined,
  LocalShippingOutlined,
  LocationOnOutlined,
  Inventory2Outlined
} from '@mui/icons-material';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state || !location.state.orderDetails) {
    return (
      <div className="page order-success-page" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2>No recent orders found</h2>
        <button className="primary-button" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          Go to Home
        </button>
      </div>
    );
  }

  const { items, totalAmount, shipping, orderId, date } = location.state.orderDetails;
  const total = totalAmount + shipping;

  return (
    <div className="page order-success-page">
      <div className="success-header">
        <div className="success-icon-wrapper">
          <div className="confetti-particles"></div>
          <div className="success-icon">
            <Check fontSize="large" />
          </div>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for your purchase.<br/>
          Your order has been placed and is confirmed.
        </p>
      </div>

      <div className="glass-card order-info-bar">
        <div className="info-block">
          <div className="info-icon">
            <ReceiptOutlined />
          </div>
          <div>
            <span className="info-label">Order ID</span>
            <strong className="info-value">{orderId}</strong>
          </div>
        </div>
        <div className="info-divider"></div>
        <div className="info-block">
          <div>
            <span className="info-label">Order Date</span>
            <strong className="info-value">{date}</strong>
          </div>
        </div>
        <div className="info-divider"></div>
        <div className="info-block">
          <div>
            <span className="info-label">Total Amount</span>
            <strong className="info-value total-amount-highlight">₹{total.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>

      <div className="next-steps-section">
        <h3>What happens next?</h3>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon confirmed">
              <ShoppingBagOutlined />
            </div>
            <div className="step-text">
              <h4>Order Confirmed</h4>
              <p>We've received your order and it's being processed.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-icon shipped">
              <LocalShippingOutlined />
            </div>
            <div className="step-text">
              <h4>Shipped</h4>
              <p>We'll notify you once your order is shipped.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-icon delivered">
              <LocationOnOutlined />
            </div>
            <div className="step-text">
              <h4>Delivered</h4>
              <p>Get ready! Your order will be delivered to your address.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="order-summary-section">
        <h3>Order Summary</h3>
        <div className="glass-card success-summary-card">
          <div className="summary-products">
            {items.map(item => (
              <div key={item.id} className="summary-product-item">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <h4>{item.name}</h4>
                  <span className="qty">Qty: {item.quantity}</span>
                  <span className="price">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="calc-row">
              <span>Subtotal</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-row">
              <span>Shipping</span>
              <span className="free-text">{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
            </div>
            <div className="calc-row">
              <span>Discount</span>
              <span>- ₹0</span>
            </div>
            <div className="summary-total-row" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--border)' }}>
              <span>Total</span>
              <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/" className="outline-button action-btn">
          <ShoppingBagOutlined fontSize="small" /> Continue Shopping
        </Link>
        <Link to="/order-details" state={{ orderDetails: location.state.orderDetails }} className="primary-button action-btn">
          <Inventory2Outlined fontSize="small" /> View My Orders
        </Link>
      </div>

      <p className="footer-note">
        You will receive an email confirmation shortly at <strong>sreeja@example.com</strong>
      </p>
    </div>
  );
};

export default OrderSuccess;
