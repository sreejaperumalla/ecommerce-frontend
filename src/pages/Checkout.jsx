import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  LocationOnOutlined,
  CreditCardOutlined,
  ShoppingBagOutlined,
  LockOutlined,
  LocalShippingOutlined,
  HeadsetMicOutlined,
  WalletOutlined,
  VerifiedUserOutlined
} from '@mui/icons-material';
import { clearCart } from '../store/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const shipping = items.length ? 0 : 0;
  const total = totalAmount + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const requiredFields = ['fullName', 'phone', 'address1', 'city', 'state', 'pincode'];
    const isFormValid = requiredFields.every(field => formData[field].trim() !== '');

    if (!isFormValid) {
      alert('Please fill in all mandatory fields to place your order.');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

  try {

    const response = await axios.post(

      "https://e-commerce-production-68a9.up.railway.app/orders",

      {
        products: items,
        totalAmount: total,
        paymentMethod: paymentMethod
      }

    );

    const orderId = response.data.orderId;

    const date = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toUpperCase();

    const orderDetails = {
      items,
      totalAmount,
      shipping,
      orderId,
      date
    };

    dispatch(clearCart());

    navigate('/order-success', {
      state: { orderDetails }
    });

  } catch (error) {

    console.log(error);

    alert("Failed to place order");

  }

};
  if (items.length === 0) {
    return (
      <div className="page checkout-page">
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Your cart is empty</h2>
          <button className="primary-button" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order by providing your details and choosing a payment method.</p>
      </header>

      <div className="checkout-progress">
        <div className="progress-step active">
          <div className="step-circle">1</div>
          <span>Address</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">2</div>
          <span>Payment</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-circle">3</div>
          <span>Review & Place Order</span>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-left">
          {/* Shipping Address */}
          <section className="glass-card checkout-section">
            <h2 className="section-title">
              <LocationOnOutlined className="section-icon" /> Shipping Address
            </h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <span className="input-icon user-icon"></span>
                  <input type="text" name="fullName" placeholder="Perumalla Sreeja" value={formData.fullName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <span className="input-icon phone-icon"></span>
                  <input type="text" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Address Line 1</label>
                <div className="input-with-icon">
                  <span className="input-icon home-icon"></span>
                  <input type="text" name="address1" placeholder="Hitech City, Hyderabad" value={formData.address1} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Address Line 2 (Optional)</label>
                <div className="input-with-icon">
                  <span className="input-icon building-icon"></span>
                  <input type="text" name="address2" placeholder="Apartment, suite, unit, etc." value={formData.address2} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>City</label>
                <div className="input-with-icon">
                  <span className="input-icon city-icon"></span>
                  <input type="text" name="city" placeholder="Hyderabad" value={formData.city} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>State</label>
                <div className="input-with-icon">
                  <span className="input-icon map-icon"></span>
                  <select name="state" value={formData.state} onChange={handleInputChange}>
                    <option value="">Select State</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <div className="input-with-icon">
                  <span className="input-icon pin-icon"></span>
                  <input type="text" name="pincode" placeholder="500081" value={formData.pincode} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="glass-card checkout-section">
            <h2 className="section-title">
              <CreditCardOutlined className="section-icon" /> Payment Method
            </h2>
            <div className="payment-methods">
              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')}
                />
                <div className="payment-option-content">
                  <div className="payment-icon">
                    <WalletOutlined />
                  </div>
                  <div className="payment-info">
                    <strong>Cash on Delivery (COD)</strong>
                    <p>Pay when your order is delivered to your doorstep.</p>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="online" 
                  checked={paymentMethod === 'online'} 
                  onChange={() => setPaymentMethod('online')}
                />
                <div className="payment-option-content">
                  <div className="payment-icon">
                    <CreditCardOutlined />
                  </div>
                  <div className="payment-info">
                    <strong>Online Payment (UPI / Cards / Net Banking)</strong>
                    <p>Pay securely using Razorpay.</p>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </div>

        <div className="checkout-right">
          <section className="glass-card order-summary-card">
            <h2 className="section-title">
              <ShoppingBagOutlined className="section-icon" /> Order Summary
            </h2>
            <p className="items-count">{items.length} {items.length === 1 ? 'Item' : 'Items'} in Cart</p>
            
            <div className="summary-items">
              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-info">
                    <h4>{item.name}</h4>
                    <span className="item-price">₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                  <div className="summary-item-total">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-calculations">
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
            </div>

            <div className="summary-total-row">
              <span>Total</span>
              <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div className="benefits-list">
              <div className="benefit-item">
                <VerifiedUserOutlined className="benefit-icon" />
                <div className="benefit-text">
                  <strong>Secure Checkout</strong>
                  <span>Your information is 100% safe</span>
                </div>
              </div>
              <div className="benefit-item">
                <LocalShippingOutlined className="benefit-icon" />
                <div className="benefit-text">
                  <strong>Free Shipping</strong>
                  <span>On all orders</span>
                </div>
              </div>
              <div className="benefit-item">
                <HeadsetMicOutlined className="benefit-icon" />
                <div className="benefit-text">
                  <strong>24/7 Support</strong>
                  <span>We're here to help you</span>
                </div>
              </div>
            </div>

            <button className="primary-button place-order-btn" onClick={handlePlaceOrder}>
              <LockOutlined fontSize="small" /> Place Order
            </button>
            <p className="terms-text">
              <LockOutlined fontSize="inherit" style={{marginRight: '4px', verticalAlign: 'middle'}}/> 
              By placing the order, you agree to our <strong>Terms & Conditions</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
