import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Logo from '../images/SPARK.png';
import './login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!email || !validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      validationErrors.password = 'Password is required.';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const result = await response.json();
          navigate('/success');
        } else {
          const errorData = await response.json();
          setErrors({ general: errorData.error });
        }
      } catch (error) {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className='Login-header'>
        <img src={Logo} alt="logo" />
      </div>
      <div className='login-container'>
        <div className="login-form">
          <h1 className='admin-login'>Admin Login</h1>
          <h4>For administrator use only</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit" className='login-button'>Login</button>
            {errors.general && <p className="error">{errors.general}</p>}
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          </form>
        </div>
        <div className='login-help'>
          <h3>How to Log In:</h3>
          <p>1. Enter your registered email address and password in the fields provided.</p>
          <p>2. Click the "Login" button to access the admin portal.</p>
          <p>3. If you forget your password, click on the "Forgot Password?" link to reset it.</p>
  
          <h3>Need Help?</h3>
          <p>If you encounter any issues logging in or need further assistance, please contact our support team at support@sparkcommunity.org or call 1-800-555-SPARK during business hours.</p>
        </div>
      </div>
    </>
  );  
};

export default LoginForm;
