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
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setShowPasswordInfo(newPassword.length > 0);
  };

  const validation = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
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
        // Show remaining attempts if login failed
        if (response.data.attemptsLeft !== undefined) {
          toast.error(`Invalid credentials. ${response.data.attemptsLeft} attempts remaining.`);
        } else if (response.data.isLocked) {
          toast.error('Account is locked. Please try again later.');
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.success(response.data.message);
        const userData = response.data.userData;

        // Calculate days until password expiration
        const expirationDate = new Date(userData.passwordExpiresAt);
        const today = new Date();
        const daysLeft = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysLeft <= 7) {
          toast.warning(`Your password will expire in ${daysLeft} days. Please change it soon.`);
        }

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('passwordExpiresAt', userData.passwordExpiresAt);
        
        // Use window.location.href instead of navigate
        window.location.href = '/';
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
          </div>
          
          {showPasswordInfo && (
            <div className="password-info mt-2">
              <Link to="#" className="text-primary text-decoration-none">
                Important: Passwords expire after 30 days for security purposes.
              </Link>
            </div>
          )}

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
