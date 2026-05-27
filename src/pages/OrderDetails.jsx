import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  PersonOutlined,
  GridViewOutlined,
  ShoppingBagOutlined,
  LocationOnOutlined,
  FavoriteBorderOutlined,
  LogoutOutlined,
  ArrowBack,
  CheckCircle,
  LocalShippingOutlined,
  Inventory2Outlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  AccessTimeOutlined,
  HeadsetMicOutlined
} from '@mui/icons-material';
import './OrderDetails.css';

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If accessed without state, mock data or redirect
  const orderData = location.state?.orderDetails || {
    orderId: '#ORD123456789',
    date: '24 May 2025, 10:30 AM',
    items: [],
    totalAmount: 0,
    shipping: 0
  };

  const { items, totalAmount, shipping, orderId, date } = orderData;
  const total = totalAmount + shipping;

  return (
    <div className="page dashboard-page">
      <div className="dashboard-layout">
        
        {/* Sidebar */}
        <aside className="user-sidebar">
          <nav className="sidebar-nav">
            <Link to="#" className="sidebar-link">
              <PersonOutlined fontSize="small" /> My Account
            </Link>
            <Link to="#" className="sidebar-link">
              <GridViewOutlined fontSize="small" /> Dashboard
            </Link>
            <Link to="#" className="sidebar-link active">
              <ShoppingBagOutlined fontSize="small" /> My Orders
            </Link>
            <Link to="#" className="sidebar-link">
              <LocationOnOutlined fontSize="small" /> Addresses
            </Link>
            <Link to="#" className="sidebar-link">
              <FavoriteBorderOutlined fontSize="small" /> Wishlist
            </Link>
            <Link to="#" className="sidebar-link">
              <PersonOutlined fontSize="small" /> Profile Settings
            </Link>
            <button className="sidebar-link logout-link" onClick={() => navigate('/')}>
              <LogoutOutlined fontSize="small" /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          
          {/* Header */}
          <div className="order-details-header">
            <div className="header-left">
              <h1>Order Details</h1>
              <Link to="/" className="back-link">
                <ArrowBack fontSize="inherit" /> Back to Orders
              </Link>
            </div>
            <div className="header-right">
              <div className="order-id">Order ID: <strong>{orderId}</strong></div>
              <div className="order-date">Placed on {date}</div>
            </div>
          </div>

          {/* Status Banner & Horizontal Timeline */}
          <div className="glass-card status-card">
            <div className="status-banner">
              <div className="status-icon green-icon">
                <CheckCircle fontSize="medium" />
              </div>
              <div className="status-text">
                <h2>Order Confirmed</h2>
                <p>Your order has been confirmed.</p>
              </div>
            </div>

            <div className="horizontal-timeline">
              <div className="h-step active">
                <div className="h-step-icon"><CheckCircle fontSize="small" /></div>
                <div className="h-step-label">Order Confirmed</div>
                <div className="h-step-time">{date}</div>
              </div>
              <div className="h-line"></div>
              <div className="h-step">
                <div className="h-step-icon"><LocalShippingOutlined fontSize="small" /></div>
                <div className="h-step-label">Shipped</div>
                <div className="h-step-time">Pending</div>
              </div>
              <div className="h-line"></div>
              <div className="h-step">
                <div className="h-step-icon"><Inventory2Outlined fontSize="small" /></div>
                <div className="h-step-label">Out for Delivery</div>
                <div className="h-step-time">Pending</div>
              </div>
              <div className="h-line"></div>
              <div className="h-step">
                <div className="h-step-icon"><CheckCircleOutlined fontSize="small" /></div>
                <div className="h-step-label">Delivered</div>
                <div className="h-step-time">Pending</div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="details-grid">
            
            <div className="details-left">
              {/* Order Items */}
              <div className="glass-card detail-card">
                <h3 className="card-title">
                  <ShoppingBagOutlined fontSize="small" /> Order Items
                </h3>
                <div className="order-items-list">
                  {items.length > 0 ? items.map(item => (
                    <div key={item.id} className="order-item-row">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <span className="price">₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="qty">Qty: {item.quantity}</span>
                      </div>
                      <div className="item-total">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  )) : (
                    <p style={{color: 'var(--text-dim)', padding: '20px 0'}}>No items found for this order.</p>
                  )}
                </div>
                <div className="order-totals">
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
                  <div className="total-row">
                    <span>Total</span>
                    <span className="final-total">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="glass-card detail-card">
                <h3 className="card-title">
                  <AccessTimeOutlined fontSize="small" /> Order Timeline
                </h3>
                <div className="vertical-timeline">
                  <div className="v-step active">
                    <div className="v-step-indicator"></div>
                    <div className="v-step-content">
                      <div className="v-step-header">
                        <strong>Order Confirmed</strong>
                        <span className="v-time">{date}</span>
                      </div>
                      <p>Your order has been confirmed and is being processed.</p>
                    </div>
                  </div>
                  <div className="v-step">
                    <div className="v-step-indicator"></div>
                    <div className="v-step-content">
                      <div className="v-step-header">
                        <strong>Shipped</strong>
                        <span className="v-time pending">Pending</span>
                      </div>
                      <p>We'll notify you once your order is shipped.</p>
                    </div>
                  </div>
                  <div className="v-step">
                    <div className="v-step-indicator"></div>
                    <div className="v-step-content">
                      <div className="v-step-header">
                        <strong>Out for Delivery</strong>
                        <span className="v-time pending">Pending</span>
                      </div>
                      <p>Your order is out for delivery.</p>
                    </div>
                  </div>
                  <div className="v-step last">
                    <div className="v-step-indicator"></div>
                    <div className="v-step-content">
                      <div className="v-step-header">
                        <strong>Delivered</strong>
                        <span className="v-time pending">Pending</span>
                      </div>
                      <p>Your order will be delivered to your address.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-right">
              {/* Shipping Address */}
              <div className="glass-card detail-card">
                <h3 className="card-title">
                  <LocationOnOutlined fontSize="small" /> Shipping Address
                </h3>
                <div className="address-content">
                  <strong>Enter full name</strong>
                  <p>+91 98765 43210</p>
                  <p style={{marginTop: '12px'}}>Landmark</p>
                  <p>State</p>
                  <p>Country</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass-card detail-card">
                <h3 className="card-title">
                  <CreditCardOutlined fontSize="small" /> Payment Method
                </h3>
                <div className="payment-content">
                  <div className="payment-method-header">
                    <strong>Online Payment (UPI / Cards / Net Banking)</strong>
                    <span className="tag-paid">Paid</span>
                  </div>
                  <p>Paid via Razorpay</p>
                </div>
              </div>

              {/* Need Help */}
              <div className="glass-card detail-card help-card">
                <h3 className="card-title">
                  <HeadsetMicOutlined fontSize="small" /> Need Help?
                </h3>
                <p className="help-text">
                  If you have any questions about your order, please contact our support team.
                </p>
                <button className="outline-button help-btn">
                  Contact Support
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
