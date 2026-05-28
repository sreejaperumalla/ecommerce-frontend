import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocalMallOutlined, Add, DeleteOutlined } from '@mui/icons-material';
import { addToCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  const quantity = existingCartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(addToCart(product));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleIncrease = () => {
    dispatch(addToCart(product));
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category || 'Premium'}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>

      {
  product.stock > 0 &&
  product.stock <= 5 && (
    <p className="low-stock">
      Only {product.stock} left
    </p>
  )
}

{
  product.stock === 0 && (
    <p className="out-stock">
      Out Of Stock
    </p>
  )
}
</div>
      <div className="product-footer">
        {product.stock === 0 ? (
          <button className="disabled-btn" disabled>
            <LocalMallOutlined fontSize="small" />
            Out Of Stock
          </button>
        ) : existingCartItem ? (
          <div className="cart-mini-control">
            <button
              aria-label="Remove item"
              className="cart-icon-btn"
              onClick={handleRemove}
            >
              <DeleteOutlined fontSize="small" />
            </button>
            <button
              aria-label="Decrease quantity"
              className="cart-icon-btn"
              onClick={handleDecrease}
            >
              -
            </button>
            <div className="cart-qty-chip">{quantity}</div>
            <button
              aria-label="Increase quantity"
              className="cart-icon-btn cart-add-btn"
              onClick={handleIncrease}
            >
              <Add fontSize="small" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            <LocalMallOutlined fontSize="small" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
