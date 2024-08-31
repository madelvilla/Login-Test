import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
    console.log('Submitting form...');
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
        const response = await fetch('http://127.0.0.1:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Login successful:', result);
          navigate('/success'); // Redirect to the success page
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData.error);
          setErrors({ general: errorData.error });
        }
      } catch (error) {
        console.error('Request failed:', error);
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-form">
      <h1>SPARK Admin Login</h1>
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
        <button type="submit">Login</button>
        {errors.general && <p className="error">{errors.general}</p>}
        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
      </form>
    </div>
  );
};

export default LoginForm;
