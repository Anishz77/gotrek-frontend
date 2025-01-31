import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAllProducts } from "../../apis/Api";
import ProductCard from "../../components/ProductCard";
import Hero from "./Hero";
import '../../CSS/Homepage.css'; // Ensure you create this CSS file and add the necessary styles
import flashSaleImage from '../../Assets/i1.png'; // Import your image
import Footer from "../../components/Footer";

const Homepage = ({ productInformation, color }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data.products);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <>

            <div className="container mt-3">
                <div className="flash-sale-container">
                    <div className="flash-sale-image">
                        <img src={flashSaleImage} alt="Flash Sale" />
                    </div>
                    <div className="slider-container">
                        <h2>Flash Sale</h2>
                        <Slider {...settings}>
                            {products.map((singleProduct) => (
                                <div key={singleProduct.id} className="product-card-container">
                                    <ProductCard productInformation={singleProduct} color={'red'} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            <div>
                <Hero />
            </div>

            <>
                
            </>

            <div>
                <Footer />
            </div>
        </>
    );
};

export default Homepage;
