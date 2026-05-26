import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocalMallOutlined } from '@mui/icons-material';
import { addToCart } from '../store/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(addToCart(product));
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
        <button
  onClick={handleAddToCart}
  disabled={product.stock === 0}
  className={
    product.stock === 0
      ? "disabled-btn"
      : "add-to-cart-btn"
  }
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }}
>
  <LocalMallOutlined fontSize="small" />

  {
    product.stock === 0
      ? "Out Of Stock"
      : "Add to Cart"
  }

</button>
      </div>
    </div>
  );
};

export default ProductCard;
