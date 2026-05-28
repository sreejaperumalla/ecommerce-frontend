import React from 'react';
import './Skeleton.css';

const Skeleton = ({ className = '', width, height, borderRadius, style }) => {
  const customStyle = {
    width: width || '100%',
    height: height || '100%',
    borderRadius: borderRadius || '4px',
    ...style,
  };
  return <div className={`skeleton ${className}`} style={customStyle} />;
};

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card skeleton-card">
      <div className="product-image-container">
        <Skeleton className="skeleton-image" borderRadius="18px" />
      </div>
      <div className="product-info">
        <Skeleton className="skeleton-category" width="40%" height="14px" borderRadius="4px" style={{ marginBottom: '8px' }} />
        <Skeleton className="skeleton-title" width="80%" height="24px" borderRadius="6px" style={{ marginBottom: '12px' }} />
        <Skeleton className="skeleton-price" width="50%" height="28px" borderRadius="6px" style={{ marginBottom: '8px' }} />
      </div>
      <div className="product-footer" style={{ marginTop: '20px' }}>
        <Skeleton className="skeleton-button" width="100%" height="44px" borderRadius="12px" />
      </div>
    </div>
  );
};

export const AnalyticsCardSkeleton = () => {
  return (
    <div className="analytics-card skeleton-analytics-card">
      <div className="analytics-card-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <Skeleton className="skeleton-icon" width="42px" height="42px" borderRadius="14px" />
        <Skeleton className="skeleton-label" width="60%" height="18px" borderRadius="4px" />
      </div>
      <Skeleton className="skeleton-value" width="50%" height="36px" borderRadius="8px" style={{ margin: '8px 0' }} />
      <Skeleton className="skeleton-caption" width="80%" height="14px" borderRadius="4px" style={{ marginTop: '10px' }} />
    </div>
  );
};

export const AdminProductCardSkeleton = () => {
  return (
    <div className="glass-card admin-card-inner skeleton-admin-card">
      <div className="product-img-wrapper">
        <Skeleton className="skeleton-image" borderRadius="16px" />
      </div>
      <Skeleton className="skeleton-category" width="30%" height="12px" borderRadius="4px" style={{ marginBottom: '8px', display: 'block' }} />
      <Skeleton className="skeleton-title" width="70%" height="20px" borderRadius="6px" style={{ marginBottom: '12px', display: 'block' }} />
      <Skeleton className="skeleton-price" width="45%" height="24px" borderRadius="6px" style={{ marginBottom: '20px', display: 'block' }} />
      <div className="admin-actions" style={{ display: 'flex', gap: '12px' }}>
        <Skeleton className="skeleton-btn" width="75%" height="38px" borderRadius="8px" />
        <Skeleton className="skeleton-btn" width="25%" height="38px" borderRadius="8px" />
      </div>
    </div>
  );
};

export default Skeleton;
