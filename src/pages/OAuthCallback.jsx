import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLoginSuccess } from '../store/authSlice';

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
      <h2>Authenticating...</h2>
    </div>
  );
};

export default OAuthCallback;
