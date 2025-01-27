import React from 'react';
import '../CSS/Footer.css';
import googlePlay from '../Assets/google-play.png';
import appStore from '../Assets/app-store.png';
import qrCode from '../Assets/qr-code.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>TrailTrekker</h4>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <p>Kathmandu, Nepal</p>
          <p>trailtrek@gmail.com</p>
          <p>+0800-98889-9919</p>
        </div>
        <div className="footer-section">
          <h4>Account</h4>
          <p>My Account</p>
          <p>Login / Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </div>
        <div className="footer-section">
          <h4>Quick Link</h4>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>
        <div className="footer-section">
          <h4>Download App</h4>
          <p>Save $3 with App New User Only</p>
          <div className="app-links">
            <img src={qrCode} alt="QR Code" />
            <div className="app-stores">
              <img src={googlePlay} alt="Google Play" />
              <img src={appStore} alt="App Store" />
            </div>
          </div>
          <div className="social-links">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Copyright gotrek 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
