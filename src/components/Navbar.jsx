
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCartOutlined, PersonOutlined, Logout, AdminPanelSettings } from '@mui/icons-material';
import { logout } from '../store/authSlice';
import './Navbar.css';

const Navbar = () => {
  const { items } = useSelector((state) => state.cart);
  const { user, isAdmin, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = items.length;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span>Q</span>STORE
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link active">Explore</Link>
        {isAdmin && (
          <Link to="/admin/dashboard" className="nav-link" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AdminPanelSettings fontSize="small" /> Admin Dashboard
          </Link>
        )}
      </div>

      <div className="nav-actions">
        <Link to="/cart" className="cart-icon-btn">
          <ShoppingCartOutlined />
          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </Link>

        {isAuthenticated ? (
          <div className="user-profile">
            <span>{user}</span>
            <button 
              onClick={() => { dispatch(logout()); navigate('/login'); }}
              className="logout-btn"
            >
              <Logout fontSize="small" />
            </button>
          </div>
        ) : (
          <Link to="/login" className="auth-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PersonOutlined fontSize="small" /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
