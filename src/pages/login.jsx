import React, { useState } from 'react';
import './CSS/Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    age: '',
    weight: '',
    height: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Signup-specific validations
    if (!isLogin) {
      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = 'Full Name is required';
      }

      // Confirm password validation
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Age validation
      const ageNum = Number(formData.age);
      if (formData.age === '') {
        newErrors.age = 'Age is required';
      } else if (isNaN(ageNum) || ageNum <= 0) {
        newErrors.age = 'Age must be a positive number';
      }

      // Country validation
      if (!formData.country.trim()) {
        newErrors.country = 'Country is required';
      }

      // Weight validation
      const weightNum = Number(formData.weight);
      if (formData.weight === '') {
        newErrors.weight = 'Weight is required';
      } else if (isNaN(weightNum) || weightNum <= 0) {
        newErrors.weight = 'Weight must be a positive number';
      }

      // Height validation
      const heightNum = Number(formData.height);
      if (formData.height === '') {
        newErrors.height = 'Height is required';
      } else if (isNaN(heightNum) || heightNum <= 0) {
        newErrors.height = 'Height must be a positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        // Login logic
        console.log('Login', { 
          email: formData.email, 
          password: formData.password 
        });
      } else {
        // Signup logic
        console.log('Signup', formData);
      }
    }
  };

  return (
    <div className="login">
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <p>Welcome to FitGenie AI</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input 
                    type="text" 
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                  {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input 
                    type="text" 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {errors.country && <span className="error">{errors.country}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input 
                    type="text" 
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                  {errors.weight && <span className="error">{errors.weight}</span>}
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input 
                    type="text" 
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                  {errors.height && <span className="error">{errors.height}</span>}
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <div className="auth-toggle">
            <p>
              {isLogin 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        </form>
      </div>
      </div>
      </div>
  );
};

export default Login;