// src/pages/Checkout.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import Mastercard from '../../Assets/mastercard.png';
import Paypal from '../../Assets/paypal.png';
import Visacard from '../../Assets/visa.png';
import '../../CSS/Checkout.css';
import Footer from '../../components/Footer';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const getCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(`http://localhost:5000/api/user/get_cart/${user._id}`);
    if (!res.data.success) {
      return toast.error("Error fetching cart items.");
    }
    setCartItems(res.data.cart);
    let newTotal = 0;
    res.data.cart.forEach((item) => {
      newTotal += item.quantity * parseInt(item.product.productPrice);
    });
    localStorage.setItem("total", newTotal);
    localStorage.setItem("numberOfProduct", res.data.cart.length);
    setTotal(newTotal);
  };

  useEffect(() => {
    getCart();
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      return toast.error("Please select a payment method.");
    }

    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem("orderDate", currentDate);

    toast.success("Order has been placed!");
    navigate('/complete'); // Navigate to the Complete page
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Billing Details */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Billing Details</h2>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-1">
                {Object.keys(formValues).map((key) => (
                  <div key={key}>
                    <label htmlFor={key} className="block text-base font-medium text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      {['firstName', 'streetAddress', 'city', 'phoneNumber'].includes(key) && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type={key === 'emailAddress' ? 'email' : 'text'}
                      id={key}
                      value={formValues[key]}
                      onChange={handleFormChange}
                      className="block w-full py-2 px-4 mt-1 rounded-md bg-white border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                  <span className="ml-2 text-base font-medium text-gray-700">Save this information for faster checkout next time</span>
                </label>
              </div>
            </form>
          </div>
          {/* Order Summary */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Order Summary</h2> 
            {cartItems.map((item, index) => (
              <div className="order-summary-item flex items-center mb-4" key={index}>
                <img src={`http://localhost:5000/products/${item.product.productImage}`} alt="Product" className="custom-height" />
                <div>
                  <h3 className="text-base font-medium text-gray-800">{item.product.productName}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="ml-auto text-base font-medium text-gray-800">{item.product.productPrice}</div>
              </div>
            ))}
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm text-gray-800">Rs {total}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm text-gray-800">Free</p>
              </div>
              <div className="flex justify-between">
                <p className="text-base font-medium text-gray-800">Total</p>
                <p className="text-base font-medium text-gray-800">Rs {total}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment-method"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={handlePaymentMethodChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded-full"
                />
                <span className="ml-2 text-base font-medium text-gray-700">Bank</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment-method"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                  className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded-full"
                />
                <span className="ml-2 text-base font-medium text-gray-700">Cash on delivery</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment-method"
                  value="esewa"
                  checked={paymentMethod === 'esewa'}
                  onChange={handlePaymentMethodChange}
                  className="ml-4 w-5 h-5 text-blue-600 border-gray-300 rounded-full"
                />
                <span className="ml-2 text-base font-medium text-gray-700">eSewa</span>
              </label>
              <div className="flex mt-4 space-x-4">
                <img src={Mastercard} alt="Mastercard" className="custom-height" />
                <img src={Visacard} alt="Visacard" className="custom-height ml-4" />
                <img src={Paypal} alt="Paypal" className="custom-height ml-4" />
              </div>
              <div>
                <label htmlFor="coupon-code" className="block text-base font-medium text-gray-700">Coupon Code</label>
                <div className="flex mt-1">
                  <input
                    type="text"
                    id="coupon-code"
                    className="block w-full py-2 px-4 rounded-l-md bg-white border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                  />
                  <button type="button" className="mt-3 px-4 py-2 text-base font-medium text-white bg-red-600 rounded-r-md hover:bg-red-700">Apply Coupon</button>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full px-4 py-2 mt-4 text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
