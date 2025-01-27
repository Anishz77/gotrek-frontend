import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../CSS/Cart.css';
import Footer from '../../components/Footer';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

        const removeFromCart = async(id)=>{
            console.log(id);
            const res = await axios.post(`http://localhost:5000/api/user/remove_from_cart`,{
                userId:JSON.parse(localStorage.getItem("user"))._id,
                productId:id
            });
            if(res.data.success){
                getCart();
                return toast.success("product removed sucessfully from cart")
            }
            else{
                return toast.error("failed to remove product from cart")

            }
        }

    const getCart = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`http://localhost:5000/api/user/get_cart/${user._id}`);
        if (!res.data.success) {
            return toast.error("Error");
        }
        console.log(res.data.cart);
        setCartItems(res.data.cart);
        let newTotal =0;
        res.data.cart.forEach((item)=>{
            newTotal += item.quantity * parseInt(item.product.productPrice)
            localStorage.setItem("total",newTotal);
            localStorage.setItem("numberOfProduct",res.data.cart.length)
        })
        setTotal(newTotal);
    };

    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            <div className="container-cart">
                <div className="card dark">
                    <h1 className="dark">Your Cart</h1>

                    <div className="flex flex-col space-y-6">
                        {cartItems.map((item, index) => {
                            return (
                                <div className="item dark" key={index}>
                                    <div className="flex items-center space-x-4">
                                        <img src={`http://localhost:5000/products/${item.product.productImage}`} alt="Product Image" className="w-16 h-16 rounded-lg" />
                                        <div>
                                            <h2 className="dark">{item.product.productName} </h2>
                                            <p className="dark">{item.product.productPrice}</p>
                                        </div>
                                    </div>
                                    <button className="remove-btn dark" onClick={()=> removeFromCart(item.product._id)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            );
                        })}

                        <div className="total dark">
                            <h3 className="dark">Total:</h3>
                            <p className="dark">Rs {total}</p>
                        </div>
                        <Link to="/checkout">
                            <button className="checkout-btn dark">Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default Cart;
