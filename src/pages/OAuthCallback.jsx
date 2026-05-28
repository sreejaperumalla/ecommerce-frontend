import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLoginSuccess } from '../store/authSlice';
import Skeleton from '../components/Skeleton';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

  const token = searchParams.get('token');

  const name = searchParams.get('name');

  if (token && name) {

    localStorage.setItem("token", token);

    localStorage.setItem("name", name);

    dispatch(
      googleLoginSuccess({
        username: name,
        token
      })
    );

    navigate('/', { replace: true });

  } else {

    console.error('OAuth failed: Missing token or name');

    navigate('/login', { replace: true });

  }

}, [searchParams, navigate, dispatch]);

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '360px', textAlign: 'center' }}>
        <h2>Authenticating...</h2>
        <div style={{ marginTop: '28px', display: 'grid', gap: '14px' }}>
          <Skeleton width="100%" height="16px" borderRadius="12px" />
          <Skeleton width="100%" height="16px" borderRadius="12px" />
          <Skeleton width="90%" height="16px" borderRadius="12px" />
          <Skeleton width="100%" height="48px" borderRadius="14px" />
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
