import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import main from '../Assets/Hikie.webp';
import image1 from '../Assets/image1.webp';
import image2 from '../Assets/image2.webp';
import image3 from '../Assets/image3.webp';
import image4 from '../Assets/image4.webp';
import '../CSS/BuyNow.css';
import { getSingleProduct } from '../apis/Api';

const BuyNow = () => {
  const {id} = useParams();
  const [data, setData] = useState(main);
  const [quantity,setQuantity] = useState(0);
  const addToCart =async ()=>{
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response =await  axios.post("http://localhost:5000/api/user/add_to_cart",{
        userId:user._id,
        productId:id,
        quantity:quantity
      },{
      headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }}
      )
      console.log(response)
      if(!response.data.success){
        return toast.error("Error")
      }
      toast.success("Added to cart")
    } catch (error) {
      return toast.error("Error")
    }
  }

  const setProduct = async()=>{
    const data = await getSingleProduct(id);
    console.log(data.data);
    setData(data.data.product);
  }
  useEffect(()=>{
    setProduct();
  },[])

  return (
    <div className="buynow-container">
      <div className="breadcrumb">
        Account / Trekking / Moonly 35L Trekking Bag
      </div>
      <div className="product-section">
        <img src={`http://localhost:5000/products/${data.productImage}`} alt="Main Product" className="main-image" />
        <div className="details">
          <h1 className="title">{data.productName}</h1>
          <div className="rating">⭐⭐⭐⭐ (150 Reviews) | In Stock</div>
          <div className="price">{data.productPrice}</div>
          <p className="description">
            {data.productDescription}
          </p>
          <div className="options">
            <div>Colours:</div>
            <div className="color-options">
              <button className="color-option" style={{ backgroundColor: '#88C0D0' }}></button>
              <button className="color-option" style={{ backgroundColor: '#BF616A' }}></button>
            </div>

          </div>
          <div className="quantity">
            <span>Quantity:</span>
            <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} min="1" max="10" defaultValue="2" className="quantity-input" />
          </div>
          <button className="buy-button" onClick={addToCart}>Buy Now</button>
          <div className="additional-info">
            <div>Free Delivery</div>
            <div>Free 30 Days Delivery Returns. Details</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
