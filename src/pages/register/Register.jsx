import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../CSS/Register.css';
import { registerUserApi } from '../../apis/Api';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [passwordStrength, setPasswordStrength] = useState('');

  const navigate = useNavigate(); // useNavigate hook

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastname = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < 8) {
      return 'Too Short';
    }
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (strength === 4) return 'Strong';
    if (strength === 3) return 'Moderate';
    return 'Weak';
  };

  const validate = () => {
    var isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('Firstname is Required');
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Lastname is Required');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email is Required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is Required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is Required');
      isValid = false;
    }

    if (phone.trim() === '') {
      setPhoneError('Phone number is required');
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError('Password does not match');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
    };
    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate('/login'); // Navigate to login page
      }
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create an Account!</h1>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={handleFirstname}
            />
            {firstNameError && <p className="text-danger">{firstNameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter your last "
              value={lastName}
              onChange={handleLastname}
            />
            {lastNameError && <p className="text-danger">{lastNameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmail}
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhone}
            />
            {phoneError && <p className="text-danger">{phoneError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
            {password && !passwordError && (
              <p className={`text-${
                passwordStrength === 'Strong' 
                  ? 'success' 
                  : passwordStrength === 'Moderate' 
                    ? 'warning' 
                    : 'danger'
              }`}>
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Enter your confirm password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
            {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
          </div>
          <button onClick={handleSubmit} className="btn btn-danger w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
