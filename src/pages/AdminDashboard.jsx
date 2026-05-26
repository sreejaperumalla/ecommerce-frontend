import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Add, EditOutlined, DeleteOutlined, Close, CheckCircleOutlined, Inventory2Outlined, ImageOutlined, LocalOfferOutlined, CurrencyRupee, ShoppingCartOutlined, MonetizationOnOutlined, WarningAmberOutlined, ReportProblemOutlined } from '@mui/icons-material';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const { isAdmin } = useSelector((state) => state.auth);

useEffect(() => {

  fetchProducts();
  fetchAnalytics();

}, []);
const fetchProducts = async () => {

  try {

    const response = await axios.get(
      "https://e-commerce-production-68a9.up.railway.app/products"
    );

    setProducts(response.data);

  } catch (error) {

    console.log(error);

  }

};
const fetchAnalytics = async () => {

  try {

    const response = await axios.get(
      "https://e-commerce-production-68a9.up.railway.app/admin/analytics"
    );

    setAnalytics(response.data);

  } catch (error) {

    console.log(error);

  }

};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock: '',
  });

  if (!isAdmin) {
    return (
      <div className="page align-center">
        <div className="glass-card">
          <h1 style={{ color: '#ef4444' }}>Access Denied</h1>
          <p>You must be logged in as an administrator to view this page.</p>
        </div>
      </div>
    );
  }

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', category: '', image: '', description: '' ,stock: ''});
    }
    setIsModalOpen(true);
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editingProduct) {

      await axios.put(

        `https://e-commerce-production-68a9.up.railway.app/products/${editingProduct.id}`,

        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }

      );

    } else {

      await axios.post(

        "https://e-commerce-production-68a9.up.railway.app/products",

        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }

      );

    }

    fetchProducts();

    setIsModalOpen(false);

  } catch (error) {

    console.log(error);

    alert("Failed to save product");

  }

};
  const analyticsCards = [
    {
      title: 'Total Products',
      value: analytics?.totalProducts ?? '—',
      subtitle: 'All products in store',
      icon: <Inventory2Outlined fontSize="small" />,
      variant: 'primary',
    },
    {
      title: 'Total Orders',
      value: analytics?.totalOrders ?? '—',
      subtitle: 'Completed orders',
      icon: <ShoppingCartOutlined fontSize="small" />,
      variant: 'accent',
    },
    {
      title: 'Revenue',
      value:
        analytics?.totalRevenue != null
          ? `₹${analytics.totalRevenue.toLocaleString('en-IN')}`
          : '—',
      subtitle: 'Total revenue earned',
      icon: <MonetizationOnOutlined fontSize="small" />,
      variant: 'success',
    },
    {
      title: 'Out Of Stock',
      value: analytics?.outOfStock ?? '—',
      subtitle: 'Products out of stock',
      icon: <ReportProblemOutlined fontSize="small" />,
      variant: 'danger',
    },
    {
      title: 'Low Stock',
      value: analytics?.lowStock ?? '—',
      subtitle: 'Products low in stock',
      icon: <WarningAmberOutlined fontSize="small" />,
      variant: 'warning',
    },
  ];

  return (
    <div className="page">
      <header className="section-heading admin-header dashboard-hero">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your premium product catalog. Add, edit, or remove items in real-time.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="primary-button add-btn">
          <Add /> Add New Product
        </button>
      </header>
      <div className="analytics-grid">
        {analyticsCards.map((card) => (
          <div key={card.title} className={`analytics-card analytics-card--${card.variant}`}>
            <div className="analytics-card-top">
              <span className="stats-icon">{card.icon}</span>
              <span className="analytics-label">{card.title}</span>
            </div>
            <div className="analytics-value">{card.value}</div>
            <p className="analytics-caption">{card.subtitle}</p>
          </div>
        ))}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <div className="glass-card interactive admin-card-inner">
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} />
              </div>
              <span className="eyebrow admin-category">{product.category}</span>
              <h3 className="admin-product-name">{product.name}</h3>
              <p className="admin-product-price">₹{Number(product.price).toLocaleString('en-IN')}</p>
              
              <div className="admin-actions">
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="primary-button edit-btn"
                >
                  <EditOutlined fontSize="small" /> Edit
                </button>
                <button 
                  onClick={async () => {

  try {

    await axios.delete(
      `https://e-commerce-production-68a9.up.railway.app/products/${product.id}`
    );

    fetchProducts();

  } catch (error) {

    console.log(error);

    alert("Failed to delete product");

  }

}}
                  className="primary-button delete-btn"
                >
                  <DeleteOutlined fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="close-btn">
                <Close />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="field-group">
                  <label>Product Name</label>
                  <div className="input-container">
                    <Inventory2Outlined className="input-icon" fontSize="small" />
                    <input 
                      className="input-field"
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                    />
                  </div>
                </div>
                <div className="field-group">
                  <label>Price (₹)</label>
                  <div className="input-container">
                    <CurrencyRupee className="input-icon" fontSize="small" />
                    <input 
                      type="number" className="input-field"
                      value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required
                    />
                  </div>
                </div>
              </div>
              <label>

  <span>Stock</span>

  <input
    className="input-field"
    name="stock"
    type="number"
    min="1"
    value={formData.stock}
    onChange={(e) =>
  setFormData({
    ...formData,
    stock: e.target.value
  })
}
    placeholder="10"
    required
  />

</label>
              <div className="form-row">
                <div className="field-group">
                  <label>Category</label>
                  <div className="input-container">
                    <LocalOfferOutlined className="input-icon" fontSize="small" />
                    <input 
                      className="input-field"
                      value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required
                    />
                  </div>
                </div>
                <div className="field-group">
                  <label>Image URL</label>
                  <div className="input-container">
                    <ImageOutlined className="input-icon" fontSize="small" />
                    <input 
                      className="input-field"
                      value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required
                    />
                  </div>
                </div>
              </div>

              <div className="field-group">
                <label>Description</label>
                <textarea 
                  className="input-field textarea-field"
                  value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required
                />
              </div>

              <button type="submit" className="primary-button full submit-btn">
                <CheckCircleOutlined /> {editingProduct ? 'Save Changes' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
