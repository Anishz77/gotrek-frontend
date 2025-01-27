import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../apis/Api'; // Ensure this function returns user data
import '../../CSS/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }

    if (password.length < 8) {
      setPasswordStrength('Password must be at least 8 characters');
      return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChar) strength++;

    if (strength === 4) {
      setPasswordStrength('Strong password');
      return true;
    } else if (strength >= 2) {
      setPasswordStrength('Moderate password - add more character types for stronger password');
      return true;
    } else {
      setPasswordStrength('Weak password - include uppercase, lowercase, numbers and special characters');
      return false;
    }
  };

  const validation = () => {
    let isValid = true;

    if (email === '' || email.includes('@') === false) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUserApi(data);

      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);

        // Ensure userData contains required fields
        const userData = response.data.userData; // This should include firstName, lastName, email, phone, etc.

        // Store user data and token in local storage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.token);
        window.location.reload();
        navigate('/');
      }
    } catch (error) {
      toast.error('An error occurred during login.');
      console.error('Login Error:', error.message);
    }
  };
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/");
    }
  })

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">We warmly welcome you to the Trailtrekker website.</p>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password (minimum 8 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              onKeyUp={(e) => checkPasswordStrength(e.target.value)}
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
            {passwordStrength && (
              <p className={`mt-1 ${
                passwordStrength.includes('Strong') ? 'text-success' : 
                passwordStrength.includes('Moderate') ? 'text-warning' : 'text-danger'
              }`}>
                {passwordStrength}
              </p>
            )}
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
          </div>
          <button onClick={handleLogin} className="btn btn-danger w-100">
            Login
          </button>
          <div className="mt-3">
            <Link to="/forgot_password" className="text-primary">
              Forgot your password?
            </Link>
          </div>
          <p className="mt-3">
            By clicking on "Login" you agree to our
            <a href="#!" className="text-primary"> Terms of Service</a> and
            <a href="#!" className="text-primary"> Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
